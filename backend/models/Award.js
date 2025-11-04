const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  awardType: { type: String, enum: ['Silver Creator','Gold Creator'], required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: false });

awardSchema.index({ userId: 1, awardType: 1 }, { unique: true });

module.exports = mongoose.model('Award', awardSchema);
