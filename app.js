const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
let app = express()

const methodOverride = require('method-override');
// let ejs = require('ejs');

const blogRoutes = require('./routes/blogRoutes')
const basicRoutes = require('./routes/basicRoutes')


app.set('view engine','ejs');
app.set('views', __dirname + '/views');


mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('DB Connected');
        app.listen(8000, () => console.log('Server Working'));
    })
    .catch((err) => console.log(err))

// middleware for static files
app.use(express.static('public'));

// middleware to parse request body
app.use(express.urlencoded({ extended:true }))

// middleware to catch DELETE & PUT methods from HTML form
app.use(methodOverride('_method'))



// Blogs Routes
app.use('/blogs', blogRoutes)

// Basic Routes
app.use(basicRoutes)

// 404 middleware
app.use((req, res) => {
    res.render('404', {title: '404'})
})
