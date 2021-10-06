const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res, next) => {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    try {
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
        });
        req.flash('success', 'Welcome to GYMH');
        //strip /review from route since there is no get for .../review
        if (req.session.returnURL && req.session.returnURL.indexOf('/review') > 0) {
            req.session.returnURL = req.session.returnURL.slice(0, -7);
        }
        res.redirect(req.session.returnURL || '/');
    }
    catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login' }), async (req, res) => {
    req.flash('success', 'Welcome back to GYMH');
    //strip /review from route since there is no get for .../review
    if (req.session.returnURL && req.session.returnURL.indexOf('/review') > 0) {
        req.session.returnURL = req.session.returnURL.slice(0, -7);
    }
    res.redirect(req.session.returnURL || '/');
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged out. See you next time');
    res.redirect('/');
});

router.get('/user', async (req, res) => {
    const user = await User.findById(req.user.id).populate('movieRentals').populate('showRentals');
    console.log(user);
    res.render('users/user', { user });
})

module.exports = router;
