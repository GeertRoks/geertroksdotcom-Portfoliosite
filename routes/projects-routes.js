const express = require('express');
const router = express.Router();

const Project = require('../models/project-model.js');


router.get('/', (req, res) => {
    // get all projects
    Project.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.get('/:slug', (req, res) => {
    // get specific project by slug
    Project.findOne({ slug: req.params.slug })
        .then(project => {
            res.send(project);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.post('/',  async (req, res) => {
    // create new project
    let project = new Project({
        title: req.body.title,
        contentMD: req.body.contentMD,
        image: req.body.image,
        snippet: req.body.snippet,
        author: req.body.author
    });
    try {
        project = await project.save();
        res.redirect(`/cms/projects`);
    } catch(err) {
        console.log(err);
        res.render('cms/project.ejs', {
            layout: 'layouts/cms-layout.ejs',
            project: project
        });
    }
});

router.patch('/:slug', (req, res) => {
    // update specific project by slug

});

router.delete('/:slug', (req, res) => {
    // delete specific project by slug
    Project.findOneAndDelete({ slug: req.params.slug })
        .then(result => {
            res.redirect('/cms/projects');
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

module.exports = router;
