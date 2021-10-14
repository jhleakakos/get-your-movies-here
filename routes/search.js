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

router.get('/genre/:genre', async (req, res) => {
    let { genre } = req.params;
    genre = genre.toString();
    const movies = genre === 'Science-Fiction' ? await Movie.find({ genres: 'Science Fiction' }) : await Movie.find({ genres: genre });
    const shows = genre === 'Science Fiction' ? await Show.find({ genres: 'Science-Fiction' }) : await Show.find({ genres: genre });
    res.render('search', { search: genre, movies, shows });
})

module.exports = router;
