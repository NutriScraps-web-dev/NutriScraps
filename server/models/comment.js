const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

function autoPopulateSubs(next) {
  this.populate('subcomments').populate('reviewer');
  next();
}

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
    ]
  },
  { timestamps: true }
);


commentSchema
  .pre('findOne', autoPopulateSubs)
  .pre('find', autoPopulateSubs);


// commentSchema.pre('deleteOne', { document: true, query: true }, function (next) {
//   User.updateMany(
//     { comments: { $in: [this._id] } },
//     { $pull: { comments: { $in: [this._id] } } }
//   )
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
// });

module.exports = mongoose.model('Comment', commentSchema);
