const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Show = require('./models/show');
const ejsMate = require('ejs-mate');

app.listen(3000, () => console.log('express listening on port 3000'));
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost:27017/getyourmovieshere', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('mongodb connection open on port 27017'))
    .catch(e => console.log(e));


app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/shows', async (req, res) => {
    const allShows = await Show.find({});
    res.render('tv_shows/tv_shows', { allShows });
})

app.get('/shows/new', (req, res) => {
    res.send('render form for new shows')
})

app.get('/shows/:id', async (req, res) => {
    const { id } = req.params;
    const show = await Show.findById(id);
    res.render('tv_shows/show', { show });
})

app.get('/shows/:id/edit', (req, res) => {
    res.send('form to edit tv show');
})
