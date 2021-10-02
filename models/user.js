const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const Movie = require('./movie');
const Show = require('./show');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'customer'
    },
    movieRentals: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    showRentals: [{
        type: Schema.Types.ObjectId,
        ref: 'Show'
    }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
