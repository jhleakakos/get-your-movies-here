const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', async (req, res) => {
    const allMovies = await Movie.find();
    res.render('movies/movies', { allMovies });
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    res.render('movies/movie', { movie });
})

module.exports = router;