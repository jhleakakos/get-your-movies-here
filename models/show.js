const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');
const User = require('./user');

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
    }],
    inventory: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    renters: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

showSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews }});
    }
});

module.exports = mongoose.model('Show', showSchema);
