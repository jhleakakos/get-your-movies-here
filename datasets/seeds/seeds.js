const mongoose = require('mongoose');
const Show = require('../../models/show');
const Movie = require('../../models/movie');
const showData = require('./seed_shows');
const movieData = require('./seeds_movies.json');

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

const seedMovies = () => {
    // await seedMovies.deleteMany();
    for (let movie of movieData) {
        const genreList = [];
        for (let genre of movie.genre_ids) {
            genreList.push(genre);
        }
        const newMovie = new Movie({
            tmdbID: movie.id,
            name: movie.original_title,
            genres: genreList,
            poster: 'need to look at tmdb build logic',
            overview: movie.overview
        })
        // await newMovie.save();
        console.log(newMovie);
    }
}

// seedShows().then(() => mongoose.connection.close());
seedMovies();