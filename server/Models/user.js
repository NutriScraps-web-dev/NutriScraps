const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
    default: 'I Love Cooking',
  },
  profilePic: {
    type: String,
    required: false,
    default: 'I would rather not have Profile Picture',
  },
  role: {
    type: String,
    default: 'user',
    ref: 'Role',
  },
});

module.exports = mongoose.model('User', userSchema);
