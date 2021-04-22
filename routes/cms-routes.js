const express = require('express');
const router = express.Router();

const Project = require('../models/project-model.js');

const path = require('path');
const fs = require('fs');
let images = fs.readdirSync(__dirname + '/../public/images');

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

router.post('/images/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    const image = req.files.image;
    console.log(image);

    if (image != null && (image.mimetype == 'image/jpeg' || image.mimetype == 'image/png')) {
        image.mv(path.join(__dirname, '/../public/images/', image.name))
            .then((file) => {
                images = fs.readdirSync(__dirname + '/../public/images');
                res.status(201).send(file);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err);
            });
    } else {
        res.status(400).send("No .jpg or .png image submited");
    }
});

module.exports = router;
