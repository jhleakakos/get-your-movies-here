const mongoose = require('mongoose');
const MovieGenre = require('../../models/movieGenre');
const movieGenreData = require('../data/movie_genres');

mongoose.connect('mongodb://localhost:27017/getyourmovieshere', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('seeds connection open'))
    .catch(e => console.log(e));

const seedMovieGenres = async () => {
    await MovieGenre.deleteMany();
    for (let genre of movieGenreData) {
        const newMovieGenre = new MovieGenre({
            movieGenreID: genre.id,
            movieGenreName: genre.name
        })
        await newMovieGenre.save();
    }
}

seedMovieGenres().then(() => mongoose.connection.close());
