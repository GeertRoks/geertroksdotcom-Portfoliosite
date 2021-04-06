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
        default: 'https://source.unsplash.com/random'
    },
    snippet: {
        type: String
    },
    author: {
        type: String
    }
}, { timestamps: true });

postSchema.pre('save', function(next) {
    if(this.snippet == null) {
        this.snippet = this.content.substr(0, 100);
    }
    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
