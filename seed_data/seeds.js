const mongoose = require('mongoose');
const Show = require('../models/show');
const Movie = require('../models/movie');
const MovieGenre = require('../models/movieGenre');
const showData = require('./seed_shows');
const movieData = require('./seed_movies.json');
const movieGenreData = require('./movie_genres.json');
const movieGenre = require('../models/movieGenre');

// mongoose.connect('mongodb://localhost:27017/getyourmovieshere', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// })
//     .then(() => console.log('seeds connection open'))
//     .catch(e => console.log(e));

const seedShows = async () => {
    await Show.deleteMany();
    for (let show of showData) {
        const newShow = new Show({
            tvmazeID: show.show.id,
            name: show.show.name,
            genres: show.show.genres,
            //logic is if image is null, then return null
            //else if medium is not null, then return medium
            //else if original is not null, return original
            //else return null
            poster: (show.show.image === null ? null :
                (show.show.image.medium !== null ? show.show.image.medium :
                    (show.show.image.original !== null ?
                        show.show.image.original : null))),
            summary: show.show.summary || 'needs a description'
        });
        await newShow.save();
        // console.log(newShow);
    }
}

const seedMovieGenres = async () => {
    await MovieGenre.deleteMany();
    for (let genre of movieGenreData) {
        const newMovieGenre = new MovieGenre({
            movieGenreID: genre.id,
            movieGenreName: genre.name
        })
        await newMovieGenre.save();
        // console.log(newMovieGenre);
    }
}

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
            poster: baseUrl.concat(size, movie.poster_path),
            overview: movie.overview
        })
        await newMovie.save();
        // console.log(newMovie);
    }
}

// seedShows().then(() => mongoose.connection.close());
// seedMovieGenres().then(() => mongoose.connection.close());
// seedMovies().then(() => mongoose.connection.close());