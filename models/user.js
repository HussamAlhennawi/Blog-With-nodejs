const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'The email field is required'],
        unique: true, /* here we can't use
                         [true, 'This email is used, Please try another one']
                         because the error type return from mongo in not (ValidatorError)
                         it is (MongoServerError: E11000 duplicate key error collection) */

        lowercase: true, // to convert it to lowercase before it stored in DB
        validate: [isEmail, 'Please enter a valid email']
        // or we can define our validator rules using regex and the val will be the input value
        // validate: [(val) => {  }, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'The password field is required'],
        minLength: [8, 'The password field must be at least 8 characters']
    }
},
    {
        timestamps: true
    })

// mongoose (pre & post) Hooks or middleware
// https://mongoosejs.com/docs/middleware.html

// fire function after document saved in DB we use post() & 'save' event
userSchema.post('save', (doc, next) => {
    console.log('New User Saved')
    next()
})

// fire function before document saved in DB we use pre() & 'save' event
userSchema.pre('save', async function (next) { /* we use regular function not arrow, so we can use this which refers
                                                                to the user object from authController.signup
                                                                let user = await User.create({ email, password }) */

    // console.log('New User will be Saved', this) // this -> will not contain __V because it is not saved yet in DB
    let salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


const User = mongoose.model('User', userSchema);

module.exports = User;
