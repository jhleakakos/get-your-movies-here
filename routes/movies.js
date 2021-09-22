const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Review = require('../models/review');
const MovieGenre = require('../models/movieGenre');
const { isLoggedIn, isAdmin, isReviewAuthor } = require('../middleware');
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    const allMovies = await Movie.find();
    res.render('movies/movies', { allMovies });
})

router.get('/new', isLoggedIn, isAdmin, (req, res) => {
    res.render('movies/new');
})

router.get('/new/:search', isLoggedIn, isAdmin, async (req, res) => {
    const { search } = req.params;
    const results = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${search}`);
    const json = await results.json();

    for (let item of json.results) {
        item.genreNames = [];
        for (let id of item.genre_ids) {
            item.genreNames.push(await MovieGenre.findOne({ movieGenreID: id }, 'movieGenreName'));
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


module.exports = router;
