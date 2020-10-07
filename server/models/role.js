const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')
const roleSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

roleSchema.pre('deleteOne', { document: true, query: false }, function (next) {
  // User.deleteOne({_id: this.users[0]})
  User.deleteMany({ _id: { $in: [this.users] } })
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

module.exports = mongoose.model('Role', roleSchema);
