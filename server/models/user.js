const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('./role');
const Recipe = require('./recipe');
const Rating = require('./rating');
const Comment = require('./comment');

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
        ref: 'recipes',
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

// userSchema.pre('deleteOne', { document: false, query: true }, function (next) {
//   Comment.deleteMany({ reviewer: this._conditions._id })
//     .exec()
//     .then((res) => {
//       next();
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
//   next();
// });

userSchema.pre('deleteOne', { document: true, query: false }, function (next) {
  console.log("----------invoked-----------")
  Comment.deleteMany({ _id: { $in: [this.comments] } }).exec();
  // uncomment at the end
  // Recipe.deleteMany({ _id: { $in: [this.posts] } }).exec();
  // Rating.deleteMany({ _id: { $in: [this.ratings] } }).exec();
  Role.updateOne(
    { users: { $in: [this._id] } },
    { $pull: { users: { $in: [this._id] } } }
  )
    .exec()
    .then((res) => {
      next();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
});

module.exports = mongoose.model('User', userSchema);
