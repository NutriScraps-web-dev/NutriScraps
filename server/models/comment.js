const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Rating',
      },
    ],
    subcomments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

commentSchema.pre('deleteOne', { document: false, query: true }, function (
  next
) {
  User.updateOne(
    { comments: { $in: [this._conditions._id] } },
    { $pull: { comments: { $in: [this._conditions._id] } } }
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
//{ query: true, document: false }, fn).

module.exports = mongoose.model('Comment', commentSchema);
