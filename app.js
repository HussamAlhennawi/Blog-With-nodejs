const express = require('express')
let app = express()

const dbConnection = require('./helpers/dbConnection')

const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');
// let ejs = require('ejs');

const checkUser = require("./middlewares/checkUserMiddleware");

const blogRoutes = require('./routes/blogRoutes')
const basicRoutes = require('./routes/basicRoutes')
const authRoutes = require('./routes/authRoutes')

app.set('view engine','ejs');
app.set('views', __dirname + '/views');

dbConnection.connect(app)

// middleware for static files
app.use(express.static('public'));

// middleware to parse request body from Form
app.use(express.urlencoded({ extended:true }))

// middleware to parse request body from json format
app.use(express.json())

// middleware to catch DELETE & PUT methods from HTML form
app.use(methodOverride('_method'))

// middleware to parse request cookies
app.use(cookieParser())

// to set user for locals
app.use('*', checkUser)

// Blogs Routes
app.use('/blogs', blogRoutes)

// Basic Routes
app.use(basicRoutes)

// Auth Routes
app.use('/auth', authRoutes)

// 404 middleware
app.use((req, res) => {
    res.render('404', {title: '404'})
})
