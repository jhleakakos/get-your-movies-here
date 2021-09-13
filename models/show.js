const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showSchema = new Schema({
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
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

module.exports = mongoose.model('Show', showSchema);
