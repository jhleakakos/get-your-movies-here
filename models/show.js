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

const Show = mongoose.model('Show', showSchema);
module.exports = Show;