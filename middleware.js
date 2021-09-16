module.exports.isLoggedIn = (req, res, next) => {
    console.log(`req.user: ${req.user}`);
    console.log(`res.locals.user: ${res.locals.user}`);
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please sign in');
        return res.redirect('/login');
    }
    next();
};
