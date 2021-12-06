const mongoose = require('mongoose');
const Movie = require('../../models/movie');
const MovieGenre = require('../../models/movieGenre');
const movieData = require('../data/movies.json');
const movieGenreData = require('../data/movie_genres');

mongoose.connect('mongodb://localhost:27017/getyourmovieshere', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('seeds connection open'))
    .catch(e => console.log(e));

const seedMovies = async () => {
    await Movie.deleteMany();
    for (let movie of movieData) {
        const genreList = [];
        for (let genre of movie.genre_ids) {
            const { movieGenreName } = await MovieGenre.findOne({ movieGenreID: genre });
            genreList.push(movieGenreName);
        }

        //these two are used to bulid the image url
        //uncomment the photo size you need
        const baseUrl = 'https://image.tmdb.org/t/p/';
        // const size = 'w92';
        // const size = 'w154';
        // const size = 'w185';
        // const size = 'w342';
        const size = 'w500';
        // const size = 'w780';
        // const size = 'original';

        const newMovie = new Movie({
            tmdbID: movie.id,
            name: movie.original_title,
            genres: genreList,
            poster: movie.poster_path ? baseUrl.concat(size, movie.poster_path) : null,
            overview: movie.overview,
            inventory: Math.floor(Math.random() * 6)
        })
        await newMovie.save();
    }
}

seedMovies().then(() => mongoose.connection.close());
