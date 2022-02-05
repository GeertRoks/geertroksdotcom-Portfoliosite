const express = require('express');
const router = express.Router();

const Project = require('../../models/project-model.js');


router.get('/', (req, res) => {
    // get all projects
    Project.find()
        .sort({date: 'descending'})
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
        date: new Date(req.body.year, req.body.month),
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
            project: project,
            type: "new"
        });
    }
});

router.patch('/:slug', (req, res) => {
    // update specific project by slug
    const changes = req.body;
    changes.date = new Date(changes.year, changes.month);
    delete changes.year;
    delete changes.month;
    Project.findOneAndUpdate({ slug: req.params.slug }, changes)
        .then(result => {
            res.redirect('/cms/projects');
        })
        .catch(err => {
            res.status(500).send(err);
            console.log(err);
        });

});

router.delete('/:slug', (req, res) => {
    // delete specific project by slug
    Project.deleteOne({ slug: req.params.slug })
        .then(result => {
            if (result.deletedCount) {
                res.status(200).send();
            } else {
                res.status(404).send();
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

module.exports = router;
