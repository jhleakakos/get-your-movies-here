const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Review = require('../models/review');

router.get('/', async (req, res) => {
    const allMovies = await Movie.find();
    res.render('movies/movies', { allMovies });
})

router.get('/new', (req, res) => {
    res.render('movies/new');
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate('reviews');
    res.render('movies/movie', { movie });
})

router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    res.render('movies/edit', { movie });
})

router.post('/:id/review', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    const review = new Review(req.body);
    movie.reviews.push(review);
    await review.save();
    await movie.save();
    res.redirect(`/movies/${movie._id}`);
})

router.delete('/:id/review/:reviewId', async (req, res) => {
    const { id, reviewId } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, {$pull: { reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/movies/${movie._id}`);
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const movieUpdate = req.body;
    movieUpdate.genres = req.body.genres.split(',');
    const movie = await Movie.findByIdAndUpdate(id, movieUpdate);
    req.flash('success', 'Successfully updated movie');
    res.redirect(`/movies/${movie._id}`);
})

router.delete('/:id', async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted movie');
    res.redirect('/movies');
})


module.exports = router;
