const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const methodOverride = require('method-override');

const ejs = require('ejs');
const ejsMate = require('ejs-mate');

const mongoose = require('mongoose');
const Show = require('./models/show');
const Movie = require('./models/movie');

app.listen(3000, () => console.log('express listening on port 3000'));
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

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

const movieController = require('./routes/movies');
const showController = require('./routes/shows');
app.use('/movies', movieController);
app.use('/shows', showController);