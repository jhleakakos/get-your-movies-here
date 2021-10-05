const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Show = require('../models/show');

router.post('/', async (req, res) => {
    const search = req.body.search;
    const movies = await Movie.find({ name: search.toString() });
    const shows = await Show.find({ name: search.toString() });
    console.log(movies);
    console.log(shows);
    res.render('search', { search, movies, shows });
})

module.exports = router;
