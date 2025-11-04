const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
  followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  followedId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

followerSchema.index({ followerId: 1, followedId: 1 }, { unique: true });

module.exports = mongoose.model('Follower', followerSchema);
