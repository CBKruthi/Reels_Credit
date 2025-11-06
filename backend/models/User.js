const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'creator'], default: 'user' },
  followersCount: { type: Number, default: 0 },
  badges: { type: [String], default: [] } // e.g. ['Silver Creator']
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
