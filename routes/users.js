const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    try {
        const registeredUser = await User.register(user, password);
        req.flash('success', 'Welcome to GYMH');
        res.redirect('/');
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
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged out. See you next time');
    res.redirect('/');
});

module.exports = router;
