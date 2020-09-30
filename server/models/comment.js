const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        reviewer: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: [{
            type: Schema.Types.ObjectId,
            ref: 'Rating'
        },
        ],
        subcomments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);