const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    recommend: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 1
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Review', reviewSchema);
