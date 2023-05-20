const Blog = require("../models/blog");

const modifyBlogMiddleware = async (req, res, next) => {

    let blog =await Blog.findById(req.params['id']).populate('user')

    if (blog) {
        if (res.locals.user.id === blog.user.id) {
            next()
        } else {
            res.render('403', {title: '403'})
        }
    } else {
        res.render('404', {title: '404'})
    }
}


module.exports = modifyBlogMiddleware
