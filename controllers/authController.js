require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");


let ErrorsHandler = (err) => {
    let errorsMessages = {};
    if (err.name === 'ValidationError') {
        Object.keys(err.errors).forEach(errorKey => {
            errorsMessages[errorKey] = err.errors[errorKey].message
        });
    } else if (err.code === 11000) {
        Object.keys(err.keyValue).forEach(errorKey => {
            errorsMessages[errorKey] = `This ${errorKey} is used, Please try another one`
        });
    }
    return errorsMessages;
}

let generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_MAX_AGE} )
}

const signupForm = (req, res) => res.render('auth/signup', { title: 'Signup' })

const signup = async (req, res) => {

    let { email, password } = req.body

    try {
        let user = await User.create({ email, password })
        let token = generateToken(user.id)
        res.cookie('jwt', token, { maxAge: process.env.TOKEN_MAX_AGE * 1000, httpOnly: true })
        res.redirect(201, '/blogs')
    } catch (err) {
        let errors = ErrorsHandler(err);
        res.status(422).json(errors)
    }

}

const loginForm = (req, res) => res.render('auth/login', {title: 'Login'})

const login = async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email }).exec()

    if (user && await bcrypt.compare(password, user.password)) {
        const token = generateToken(user.id)
        res.cookie('jwt', token, {maxAge: process.env.TOKEN_MAX_AGE * 1000, httpOnly: true })
        res.redirect(200, '/blogs')
    } else {
        let errors = { credentials: 'Wrong credentials' }
        res.status(422).json(errors)
    }

}

const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 })
    res.redirect('/auth/login')
}

module.exports = {
    signupForm, signup, loginForm, login, logout
}


