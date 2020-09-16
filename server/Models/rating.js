const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
    {
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        dislikes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        receipeID: {
            type: Schema.Types.ObjectId,
            ref: 'Receipe'
        },
        commentID:{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        },
    },
);

module.exports = mongoose.model('Rating', ratingSchema);