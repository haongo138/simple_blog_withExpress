const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  gender: String,
  detail: String,
  avatar: String
});
const User = new mongoose.model('User', userSchema, 'users');
module.exports = User;