const express = require('express');
const router = express.Router();
const Show = require('../models/show');

router.get('/', async (req, res) => {
    const allShows = await Show.find();
    res.render('shows/shows', { allShows });
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id);
    res.render('shows/show', { show });
})

module.exports = router;