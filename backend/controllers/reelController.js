const Reel = require('../models/Reel');
const Product = require('../models/Product');
const Credit = require('../models/Credit');
const Award = require('../models/Award');
const User = require('../models/User');

// GET /reel/feed
exports.getFeed = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(20, Number(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const reels = await Reel.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('creatorId', 'name followersCount badges')
      .populate('linkedProductIds');

    // Format for frontend
    const data = reels.map(r => ({
      id: r._id,
      videoUrl: r.videoUrl,
      imageUrl: r.imageUrl || '',
      caption: r.caption || '',
      linkedProductIds: r.linkedProductIds.map(p => p._id),
      products: r.linkedProductIds, // populated product objects
      creatorName: r.creatorId ? r.creatorId.name : 'Unknown',
      creatorId: r.creatorId ? r.creatorId._id : null,
      isPodcastStyle: false,
      views: r.views,
      date: r.createdAt
    }));

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /reel/upload
exports.uploadReel = async (req, res) => {
  try {
    const { creatorId, videoUrl, imageUrl, caption, linkedProductIds = [] } = req.body;
    if (!creatorId || !videoUrl) return res.status(400).json({ message: 'creatorId & videoUrl required' });

    const reel = await Reel.create({
      creatorId,
      videoUrl,
      imageUrl,
      caption,
      linkedProductIds
    });

    res.json({ success: true, reel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /reel/:id/view
exports.incrementView = async (req, res) => {
  try {
    const reelId = req.params.id;
    const reel = await Reel.findById(reelId);
    if (!reel) return res.status(404).json({ message: 'reel not found' });

    reel.views += 1;
    await reel.save();

    // Update credits for creator: +50 credits for every 1000 total views across all their reels
    const creatorId = reel.creatorId;
    // sum views across reels of creator
    const allReelsViewsAgg = await Reel.aggregate([
      { $match: { creatorId: creatorId } },
      { $group: { _id: '$creatorId', totalViews: { $sum: '$views' } } }
    ]);
    const totalViews = (allReelsViewsAgg[0] && allReelsViewsAgg[0].totalViews) || 0;
    const creditsFromViews = Math.floor(totalViews / 1000) * 50;

    let credit = await Credit.findOne({ userId: creatorId });
    if (!credit) credit = await Credit.create({ userId: creatorId });

    // ensure earned reflects slab, update available by delta
    if (credit.earned < creditsFromViews) {
      const delta = creditsFromViews - credit.earned;
      credit.earned = creditsFromViews;
      credit.available += delta;
      await credit.save();
    }

    res.json({ success: true, views: reel.views, totalViews, credits: credit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
