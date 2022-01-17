const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true
        },
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Inventory'
        },

    },
    {
        timestamps: true
    }
);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;