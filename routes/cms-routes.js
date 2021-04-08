const express = require('express');
const router = express.Router();

const Posts = require('../models/post-model.js');

router.get('/', (req, res) => {
    res.render('cms/index.ejs', { layout: 'layouts/cms-layout' });
});

router.get('/projects', (req, res) => {
    Posts.find()
        .then(posts => {
            res.render('cms/projects.ejs', { 
                layout: 'layouts/cms-layout',
                posts: posts
            });
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.get('/projects/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            res.render('cms/project.ejs', {
                layout: 'layouts/cms-layout',
                post: post
            });
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.get('/about', (req, res) => {
    res.render('cms/about.ejs', { layout: 'layouts/cms-layout' });
});

module.exports = router;
