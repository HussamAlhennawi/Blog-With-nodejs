const jwt = require('jsonwebtoken')
const User = require("../models/user");
require('dotenv').config()

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)
            try {
                const user = await User.findById(decodedToken.id)
                if (user) {
                    res.locals.user = user;
                } else {
                    res.cookie('jwt', '', { maxAge: 0 });
                    res.locals.user = null;
                }
                next();
            } catch (err) {
                console.log(err)
            }
        } catch (err) {
            res.cookie('jwt', '', { maxAge: 0 });
            res.locals.user = null;
            next();
        }
    } else {
        res.locals.user = null;
        next();
    }
}


module.exports = checkUser
