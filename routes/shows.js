const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
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

router.post('/new', isLoggedIn, isAdmin, async (req, res) => {
    console.log('im here');
    const body = req.body;
    const genreList = req.body.genres.split(',');

    const newShow = new Show({
        tvmazeID: body.tvmazeID,
        name: body.name,
        genres: genreList,
        poster: body.poster,
        summary: body.summary,
        inventory: body.inventory
    })

    await newShow.save();
    const show = await Show.findOne({ tvmazeID: body.tvmazeID });
    req.flash('success', `Successfully added ${show.name}`);

    res.redirect(`/shows/${show._id}`);
})

router.get('/new/:search', isLoggedIn, isAdmin, async (req, res) => {
    const { search } = req.params;
    const results = await fetch(`http://api.tvmaze.com/search/shows?q=${search}`);
    const json = await results.json();

    let show;
    for (let i = json.length - 1; i >= 0; i--) {
        show = await Show.findOne({ tvmazeID: json[i].show.id });
        if (show) {
            json.splice(i, 1);
            continue
        }
    }

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

router.patch('/:id/rent', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id);
    const user = await User.findById(req.user._id);

    if (show.inventory > 0 && !(show.renters.includes(req.user._id))) {
        show.inventory--;
        show.renters.push(user);
        user.showRentals.push(show);

        await show.save();
        await user.save();

        req.flash('success', `Rented ${show.name}`);
    }

    res.redirect(`/shows/${show._id}`);
})

router.patch('/:id/return', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id);
    const user = await User.findById(req.user._id);

    const userIdx = show.renters.indexOf(user._id);
    if (show.inventory < 5 && userIdx !== -1) {
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

router.get('/genre/:genre', async (req, res) => {
    let { genre } = req.params;
    genre = genre.toString();
    const movies = genre === 'Science-Fiction' ? await Movie.find({ genres: 'Science Fiction' }) : await Movie.find({ genres: genre });
    const shows = await Show.find({ genres: genre });
    res.render('search', { search: genre, movies, shows });
})

module.exports = router;
