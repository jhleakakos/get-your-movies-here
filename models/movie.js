const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

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
    }],
    inventory: {
        type: Number,
        min: 0,
        required: true
    }
})

movieSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews }});
    }
});

module.exports = mongoose.model('Movie', movieSchema);
