const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    tvmazeID: {
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
    },
    summary: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Show', showSchema);