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

router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id);
    res.render('shows/edit', { show });
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const showUpdate = req.body;
    showUpdate.genres = req.body.genres.split(',');
    const show = await Show.findByIdAndUpdate(id, showUpdate);
    res.redirect(`/shows/${show._id}`);
})

module.exports = router;