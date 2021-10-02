const express = require('express');
const router = express.Router();
const Show = require('../models/show');
const Review = require('../models/review');
const User = require('../models/user');
const { isLoggedIn, isAdmin, isReviewAuthor } = require('../middleware');
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    const allShows = await Show.find();
    res.render('shows/shows', { allShows });
})

router.get('/new', isLoggedIn, isAdmin, (req, res) => {
    res.render('shows/new');
})

router.get('/new/:search', isLoggedIn, isAdmin, async (req, res) => {
    const { search } = req.params;
    const results = await fetch(`http://api.tvmaze.com/search/shows?q=${search}`);
    const json = await results.json();
    res.json(json);
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    //syntax to 'populate across multiple levels'
    //(mongoose doc terminology)
    const show = await Show.findById(id).populate({
        path: 'reviews',
        populate: { path: 'author' }
    });
    res.render('shows/show', { show });
})

router.post('/:id/rent', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id);
    const user = await User.findById(req.user._id);
    show.inventory--;
    show.renters.push(user);
    user.showRentals.push(show);
    await show.save();
    await user.save();

    req.flash('success', `Rented ${show.name}`);
    res.redirect(`/shows/${show._id}`);
})

router.post('/:id/return', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id);
    const user = await User.findById(req.user._id);

    const userIdx = show.renters.indexOf(user._id);
    if (userIdx !== -1) {
        show.inventory++;
        show.renters.splice(userIdx, 1);
        user.showRentals.splice(user.showRentals.indexOf(show), 1);

        await show.save();
        await user.save();

        req.flash('success', `Returned ${show.name}`);
    }

    res.redirect(`/shows/${show._id}`);
})

router.get('/:id/edit', isLoggedIn, isAdmin, async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id);
    res.render('shows/edit', { show });
})

router.post('/:id/review', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id);
    const review = new Review(req.body);
    review.author = req.user._id;
    show.reviews.push(review);
    await review.save();
    await show.save();
    req.flash('success', 'Created review');
    res.redirect(`/shows/${show._id}`);
})

router.delete('/:id/review/:reviewId', isLoggedIn, isReviewAuthor, async (req, res) => {
    const { id, reviewId } = req.params;
    const show = await Show.findByIdAndUpdate(id, {$pull: { reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Deleted review');
    res.redirect(`/shows/${show._id}`);
})

router.patch('/:id', isLoggedIn, isAdmin, async (req, res) => {
    const { id } = req.params;
    const showUpdate = req.body;
    showUpdate.genres = req.body.genres.split(',');
    const show = await Show.findByIdAndUpdate(id, showUpdate);
    req.flash('success', 'Updated show');
    res.redirect(`/shows/${show._id}`);
})

router.delete('/:id', isLoggedIn, isAdmin, async (req, res) => {
    await Show.findByIdAndDelete(req.params.id);
    req.flash('success', 'Deleted show');
    res.redirect('/shows');
})

module.exports = router;
