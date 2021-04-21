const express = require('express');
const router = express.Router();

const Project = require('../models/project-model.js');

const fs = require('fs');
const images = fs.readdirSync(__dirname + '/../public/images');

router.get('/', (req, res) => {
    res.render('cms/index.ejs', { layout: 'layouts/cms-layout' });
});

router.get('/projects', (req, res) => {
    Project.find()
        .then(projects => {
            res.render('cms/projects.ejs', { 
                layout: 'layouts/cms-layout',
                projects: projects
            });
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.get('/projects/new', (req, res) => {
    res.render('cms/project.ejs', {
        layout: 'layouts/cms-layout',
        project: new Project(),
        type: "new",
        images: images
    });
});

router.get('/projects/:slug', (req, res) => {
    Project.findOne({ slug: req.params.slug })
        .then(project => {
            res.render('cms/project.ejs', {
                layout: 'layouts/cms-layout',
                project: project,
                type: "edit",
                images: images
            });
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.get('/about', (req, res) => {
    const about = {};
    res.render('cms/about.ejs', {
        layout: 'layouts/cms-layout',
        about: about
    });
});

module.exports = router;
