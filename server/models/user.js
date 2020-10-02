const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
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
    roleType: {
      default: 'user',
      type: String,
    },
    roleId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
      },
    ],
    ratings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Rating',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
