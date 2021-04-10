const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: { 
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
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
    },
    highlight: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

projectSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        });
    }
    console.log(this.slug);
    next();
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
