const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    rating: Number
})

module.exports = mongoose.model('Review', reviewSchema);
