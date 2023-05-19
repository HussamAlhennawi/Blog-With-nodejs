const requireAuth = (req, res, next) => {
    res.locals.user
        ? next()
        : res.redirect('/auth/login')
}

module.exports = requireAuth
