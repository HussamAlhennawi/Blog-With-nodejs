const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'The title field is required'],
        maxLength: [30, 'The title can\'t be mor than 30 characters']
    },
        body: {
        type: String,
        required: [true, 'The body field is required'],
        minLength: [100, 'The body must be at least 100 characters']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},
    {
        timestamps: true
    });

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;

