const mongoose = require('mongoose');

const movieGenreSchema = new mongoose.Schema({
    movieGenreID: {
        type: Number,
        required: true
    },
    movieGenreName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('MovieGenre', movieGenreSchema);