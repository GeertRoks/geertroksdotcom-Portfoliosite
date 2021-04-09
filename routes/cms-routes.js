const express = require('express');
const router = express.Router();

const Project = require('../models/project-model.js');

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
        project: new Project()
    });
});

router.get('/projects/:id', (req, res) => {
    Project.findById(req.params.id)
        .then(project => {
            res.render('cms/project.ejs', {
                layout: 'layouts/cms-layout',
                project: project
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
