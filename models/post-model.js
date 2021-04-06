const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { 
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'http://site.com/placeholder.png'
    }
    snippet: {
        type: String
    },
    author: {
        type: String
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
