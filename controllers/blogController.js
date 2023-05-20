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
    let { title, body } = req.body
    const blog = new Blog({ title ,body });
    blog.save()
        .then((result) => res.redirect('/blogs'))
        .catch((err) => {
            let errors = ErrorsHandler(err);
            res.locals.errors = errors
            let oldValues = {}
            oldValues.title = title
            oldValues.body = body
            res.render('./blogs/create', {title: 'New Blog', errors, oldValues})
            // res.status(422).redirect('back')
            console.log(errors)
        })
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
// Blog.findByIdAndUpdate(req.params['id'], {
//     title, body
// })
//     .then((result) => {
//         res.redirect('/blogs/' + result.id)
//     })
//     .catch((err) => {
//         let errors = ErrorsHandler(err);
//         res.locals.errors = errors
//         let oldValues = {}
//         oldValues.title = title;
//         oldValues.body = body
//         res.render('./blogs/edit', {title: 'Edit Blog', errors, oldValues})
//         console.log(err)
//     })
