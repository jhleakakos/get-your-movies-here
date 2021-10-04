const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const methodOverride = require('method-override');

const ejs = require('ejs');
const ejsMate = require('ejs-mate');

const session = require('express-session');
const flash = require('connect-flash');

const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');

const mongoose = require('mongoose');
//const Show = require('./models/show');
//const Movie = require('./models/movie');
//const User = require('./models/user');

app.listen(3000, () => console.log('express listening on port 3000'));
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: true
    }
}));
app.use(flash());

//passport session middleware must come after express session middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//this middleware must come after passport middleware
//in order to set the user property
app.use(async (req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    next();
});

mongoose.connect('mongodb://localhost:27017/getyourmovieshere', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('mongodb connection open on port 27017'))
    .catch(e => console.log(e));


app.get('/', (req, res) => {
//    res.render('index');
    res.redirect('/movies');
})

app.get('/about', (req, res) => {
    res.render('about');
})

const movieController = require('./routes/movies');
const showController = require('./routes/shows');
const userController = require('./routes/users');
app.use('/movies', movieController);
app.use('/shows', showController);
app.use('/', userController);
