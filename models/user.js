const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  loginAttempts: { type: Number, default: 0 },
  blockedUntil: { type: Date, default: null } 
});

module.exports = mongoose.model('User', userSchema);
