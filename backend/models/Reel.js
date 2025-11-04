const mongoose = require('mongoose');

const reelSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoUrl: { type: String, required: true },
  imageUrl: String,
  caption: String,
  linkedProductIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Reel', reelSchema);
