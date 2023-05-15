const Blog = require("../models/blog");


const index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('./blogs/index', {
                title: 'Blogs',
                blogs: result
            })
        })
        .catch((err) => console.log(err))
}

const create = (req, res) => {
    res.render('./blogs/create', {title: 'New Blog'});
}

const store = (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        text: req.body.text
    });
    blog.save()
        .then((result) => res.redirect('/blogs'))
        .catch((err) => console.log(err))
}

const show = (req, res) => {
    Blog.findById(req.params['id'])
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

const update = (req, res) => {
    Blog.findByIdAndUpdate(req.params['id'], {
        title: req.body.title,
        text: req.body.text
    })
        .then((result) => {
            res.redirect('/blogs/' + result.id)
        })
        .catch((err) => console.log(err))
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
