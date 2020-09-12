const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roleSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Role', roleSchema);
