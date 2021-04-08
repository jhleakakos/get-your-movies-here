const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    tmdbID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    genres: [{
        type: Number,
        required: true
    }],
    poster: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Movie', movieSchema);