const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnURL = req.originalUrl;
        req.flash('error', 'Please sign in');
        return res.redirect('/login');
    }
    next();
};

module.exports.isAdmin = (req, res, next) => {
    if (!(req.user.role === 'admin')) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect('/');
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        //strip /review from route since there is no get for .../review
        req.session.returnURL = req.originalUrl;
        if (req.session.returnURL.indexOf('/review') > 0) {
            req.session.returnURL = req.session.returnURL.slice(0, req.session.returnURL.indexOf('/review'));
        }
        return res.redirect(req.session.returnURL || '/');
    }
    next();
};

