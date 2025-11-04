const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  followersCount: { type: Number, default: 0 },
  badges: { type: [String], default: [] } // e.g. ['Silver Creator']
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
