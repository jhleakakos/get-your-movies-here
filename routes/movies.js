const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Show = require('../models/show');
const Review = require('../models/review');
const MovieGenre = require('../models/movieGenre');
const User = require('../models/user');
const { isLoggedIn, isAdmin, isReviewAuthor } = require('../middleware');
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    const allMovies = await Movie.find();
    res.render('movies/movies', { allMovies });
})

router.get('/new', isLoggedIn, isAdmin, (req, res) => {
    res.render('movies/new');
})

router.post('/new', isLoggedIn, isAdmin, async (req, res) => {
    const body = req.body;
    const genreList = req.body.genres.split(',');

    const newMovie = new Movie({
        tmdbID: body.tmdbID,
        name: body.name,
        genres: genreList,
        poster: body.poster,
        overview: body.overview,
        inventory: body.inventory
    })

    await newMovie.save();
    const movie = await Movie.findOne({ tmdbID: body.tmdbID });
    req.flash('success', `Successfully added ${movie.name}`);
    
    res.redirect(`/movies/${movie._id}`);
})

router.get('/new/:search', isLoggedIn, isAdmin, async (req, res) => {
    const { search } = req.params;
    const results = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${search}`);
    const json = await results.json();

    let movie;
    for (let i = json.results.length - 1; i >= 0; i--) {
        movie = await Movie.findOne({ tmdbID: json.results[i].id });
        if (movie) {
            json.results.splice(i, 1);
            continue;
        }

        json.results[i].genreNames = [];
        for (let id of json.results[i].genre_ids) {
            json.results[i].genreNames.push(await MovieGenre.findOne({ movieGenreID: id }, 'movieGenreName'));
        }
    }

    res.json(json);
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    //syntax to 'populate across multiple levels'
    //(mongoose doc terminology)
    const movie = await Movie.findById(id).populate({
        path: 'reviews',
        populate: { path: 'author' }
    });
    res.render('movies/movie', { movie });
})

router.patch('/:id/rent', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    const user = await User.findById(req.user._id);

    if (movie.inventory > 0 && !(movie.renters.includes(req.user._id))) {
        movie.inventory--;
        movie.renters.push(user);
        user.movieRentals.push(movie);

        await movie.save();
        await user.save();

        req.flash('success', `Rented ${movie.name}`);
    }
    
    res.redirect(`/movies/${movie._id}`);
})

router.patch('/:id/return', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    const user = await User.findById(req.user._id);

    const userIdx = movie.renters.indexOf(user._id);
    if (movie.inventory < 5 && userIdx !== -1) {
        movie.inventory++;
        movie.renters.splice(userIdx, 1);
        user.movieRentals.splice(user.movieRentals.indexOf(movie), 1);

        await movie.save();
        await user.save();
        
        req.flash('success', `Returned ${movie.name}`); 
    }

    res.redirect(`/movies/${movie._id}`);
})

router.get('/:id/edit', isLoggedIn, isAdmin, async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    res.render('movies/edit', { movie });
})

router.post('/:id/review', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    const review = new Review(req.body);
    review.author = req.user._id;
    movie.reviews.push(review);
    await review.save();
    await movie.save();
    req.flash('success', 'Created review');
    res.redirect(`/movies/${movie._id}`);
})

router.delete('/:id/review/:reviewId', isLoggedIn, isReviewAuthor, async (req, res) => {
    const { id, reviewId } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, {$pull: { reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Deleted review');
    res.redirect(`/movies/${movie._id}`);
})

router.patch('/:id', isLoggedIn, isAdmin, async (req, res) => {
    const { id } = req.params;
    const movieUpdate = req.body;
    movieUpdate.genres = req.body.genres.split(',');
    const movie = await Movie.findByIdAndUpdate(id, movieUpdate);
    req.flash('success', 'Updated movie');
    res.redirect(`/movies/${movie._id}`);
})

router.delete('/:id', isLoggedIn, isAdmin, async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    req.flash('success', 'Deleted movie');
    res.redirect('/movies');
})

router.get('/genre/:genre', async (req, res) => {
    let { genre } = req.params;
    genre = genre.toString();
    const movies = await Movie.find({ genres: genre });
    const shows = genre === 'Science Fiction' ? await Show.find({ genres: 'Science-Fiction' }) : await Show.find({ genres: genre });
    res.render('search', { search: genre, movies, shows });
})

module.exports = router;
