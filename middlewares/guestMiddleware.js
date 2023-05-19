const requireGuest = (req, res, next) => {
    res.locals.user
        ? res.redirect('back')
        : next()
}

module.exports = requireGuest
