const User = require('../models/User');
const Follower = require('../models/Follower');
const Credit = require('../models/Credit');
const Award = require('../models/Award');
const Reel = require('../models/Reel');

// POST /user/follow/:id  body: { followerId }
exports.followUser = async (req, res) => {
  try {
    const followedId = req.params.id; // the user being followed/unfollowed
    const { followerId } = req.body;
    if (!followerId) return res.status(400).json({ message: 'followerId required in body' });
    if (followerId === followedId) return res.status(400).json({ message: 'cannot follow yourself' });

    const existing = await Follower.findOne({ followerId, followedId });
    if (existing) {
      // unfollow
      await existing.deleteOne();
      await User.findByIdAndUpdate(followedId, { $inc: { followersCount: -1 } });

      // update credits slab
      await updateCreditsAndAwardsForUser(followedId);

      return res.json({ success: true, action: 'unfollowed' });
    }

    // create follow
    await Follower.create({ followerId, followedId });
    await User.findByIdAndUpdate(followedId, { $inc: { followersCount: 1 } });

    // update credits & awards
    await updateCreditsAndAwardsForUser(followedId);

    return res.json({ success: true, action: 'followed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /user/dashboard/:id
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ message: 'user not found' });

    const credit = await Credit.findOne({ userId }) || { earned:0, used:0, available:0 };
    const awards = await Award.find({ userId });
    const reels = await Reel.find({ creatorId: userId });
    const totalViews = reels.reduce((s,r) => s + (r.views || 0), 0);

    res.json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, followersCount: user.followersCount, badges: user.badges || [] },
        credits: { earned: credit.earned || 0, used: credit.used || 0, available: credit.available || 0 },
        awards: awards.map(a => ({ awardType: a.awardType, date: a.date })),
        analytics: { totalReels: reels.length, totalViews }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /user/redeem/:id  body: { use }  - use credits (reduces available and increases used)
exports.redeemCredits = async (req, res) => {
  try {
    const userId = req.params.id;
    const use = Number(req.body.use) || 0;
    if (use <= 0) return res.status(400).json({ message: 'use must be > 0' });

    const credit = await Credit.findOne({ userId });
    if (!credit || credit.available < use) return res.status(400).json({ message: 'not enough credits' });

    credit.available -= use;
    credit.used += use;
    await credit.save();

    // convert credits to currency using env rate if needed - frontend will apply discount
    const rate = Number(process.env.CREDIT_CONVERSION_RATE || 1);
    const discountValue = use * rate;

    res.json({ success: true, used, discountValue, credits: credit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// helper: updates credits based on followers slabs and awards
async function updateCreditsAndAwardsForUser(userId) {
  // update credits: +10 credits per 100 followers (slab)
  const user = await User.findById(userId);
  if (!user) return;

  const slabCredits = Math.floor((user.followersCount || 0) / 100) * 10;
  let credit = await Credit.findOne({ userId });
  if (!credit) credit = await Credit.create({ userId, earned: 0, used: 0, available: 0 });

  if (credit.earned < slabCredits) {
    const delta = slabCredits - credit.earned;
    credit.earned = slabCredits;
    credit.available += delta; // add new earned credits to available
    await credit.save();
  }

  // awards
  if (user.followersCount >= 100000) {
    await Award.updateOne({ userId, awardType: 'Gold Creator' }, { $setOnInsert: { date: new Date() } }, { upsert: true });
    if (!user.badges.includes('Gold Creator')) {
      user.badges = Array.from(new Set([...(user.badges || []), 'Gold Creator']));
      await user.save();
    }
  } else if (user.followersCount >= 10000) {
    await Award.updateOne({ userId, awardType: 'Silver Creator' }, { $setOnInsert: { date: new Date() } }, { upsert: true });
    if (!user.badges.includes('Silver Creator')) {
      user.badges = Array.from(new Set([...(user.badges || []), 'Silver Creator']));
      await user.save();
    }
  }
}
