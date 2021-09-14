const express = require('express');
const router = express.Router();
const Show = require('../models/show');
const Review = require('../models/review');

router.get('/', async (req, res) => {
    const allShows = await Show.find();
    res.render('shows/shows', { allShows });
})

router.get('/new', (req, res) => {
    res.render('shows/new');
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id).populate('reviews');
    res.render('shows/show', { show });
})

router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id);
    res.render('shows/edit', { show });
})

router.post('/:id/review', async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id);
    const review = new Review(req.body);
    show.reviews.push(review);
    await review.save();
    await show.save();
    res.redirect(`/shows/${show._id}`);
})

router.delete('/:id/review/:reviewId', async (req, res) => {
    const { id, reviewId } = req.params;
    const show = await Show.findByIdAndUpdate(id, {$pull: { reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/shows/${show._id}`);
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const showUpdate = req.body;
    showUpdate.genres = req.body.genres.split(',');
    const show = await Show.findByIdAndUpdate(id, showUpdate);
    res.redirect(`/shows/${show._id}`);
})

router.delete('/:id', async (req, res) => {
    await Show.findByIdAndDelete(req.params.id);
    res.redirect('/shows');
})

module.exports = router;
