const mongoose = require('mongoose');
const slugify = require('slugify');
const marked = require('marked');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: { 
        type: String,
        required: true
    },
    contentMD: {
        type: String,
        required: true
    },
    contentHTML: {
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
    if (this.contentMD) {
        this.contentHTML = marked(this.contentMD);
    }
    next();
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
