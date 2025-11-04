const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  earned: { type: Number, default: 0 },
  used: { type: Number, default: 0 },
  available: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Credit', creditSchema);
