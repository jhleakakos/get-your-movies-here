const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    try {
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.flash('success', 'Welcome to GYMH');
        res.redirect('/');
    }
    catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
});

module.exports = router;
