const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    tmdbID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    genres: [{
        type: String,
    }],
    poster: {
        type: String,
        required: true
    },
    overview: {
        type: String,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

module.exports = mongoose.model('Movie', movieSchema);
