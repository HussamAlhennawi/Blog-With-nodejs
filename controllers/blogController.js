const Blog = require("../models/blog");

let ErrorsHandler = (err) => {
    let errorsMessages = {};
    if (err.name === 'ValidationError') {
        Object.keys(err.errors).forEach(errorKey => {
            errorsMessages[errorKey] = err.errors[errorKey].message
        });
    }
    return errorsMessages;
}

const index = async (req, res) => {
    let blogs = await Blog.find().populate('user').sort({ createdAt: -1 })
    res.render('./blogs/index', { title: 'Blogs', blogs })
}

const create = (req, res) => {
    res.render('./blogs/create', {title: 'New Blog'});
}

const store = async (req, res) => {
    let { title, body } = req.body

    try {
        let blog = await Blog.create({ title ,body, user: res.locals.user })
        res.redirect('/blogs')
    } catch (err) {
        let errors = ErrorsHandler(err);
        res.locals.errors = errors
        let oldValues = {}
        oldValues.title = title
        oldValues.body = body
        res.render('./blogs/create', {title: 'New Blog', errors, oldValues})
    }
}

const show = (req, res) => {

    Blog.findById(req.params['id']).populate('user')
        .then((result) => {
            res.render('./blogs/show', {
                title: 'Blog',
                blog: result
            })
        })
        .catch((err) => {
            console.log(err)
            res.render('404', {title: '404'})
        })
}

const edit = (req, res) => {
    Blog.findById(req.params['id'])
        .then((result) => {
            res.render('./blogs/edit', {
                title: 'Edit Blog',
                blog: result
            })
        })
        .catch((err) => console.log(err))
}

const update = async (req, res) => {
    let { title, body } = req.body

    let blog =await Blog.findById(req.params['id'])
    if (blog) {
        try {
            blog.title = title;
            blog.body = body;
            await blog.save();
            res.redirect('/blogs/' + blog.id)
        } catch (err) {
            let errors = ErrorsHandler(err);
            res.locals.errors = errors
            let oldValues = {title, body}
            res.render('./blogs/edit', {title: 'Edit Blog', errors, oldValues, blog})
        }
    }
}

const destroy = (req, res) => {
    Blog.findByIdAndDelete(req.params['id'])
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => console.log(err))
}

module.exports = {
    index, create, store, show, edit, update, destroy
}
