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

router.get('/:id', (req, res) => {
    // get specific project by id
    Project.findById()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.post('/',  async (req, res) => {
    // create new project
    let project = new Project({
        title: req.body.title,
        content: req.body.content,
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

router.patch('/:id', (req, res) => {
    // update specific project by id

});

router.delete('/:id', (req, res) => {
    // delete specific project by id

});

module.exports = router;
