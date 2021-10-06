const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Show = require('../models/show');

router.post('/', async (req, res) => {
    const search = req.body.search.toString();
    const movies = await Movie.find({ name: { $regex: search, $options: 'i' }});
    const shows = await Show.find({ name: { $regex: search, $options: 'i' }});
    res.render('search', { search, movies, shows });
})

module.exports = router;
