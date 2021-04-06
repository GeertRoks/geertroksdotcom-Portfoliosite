const express = require('express');
const router = express.Router();

const Post = require('../models/post-model.js');


router.get('/', (req, res) => {
    // get all posts
    Post.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

router.get('/:id', (req, res) => {
    // get post by id

});

router.post('/', (req, res) => {
    // create new post
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        snippet: req.body.snippet,
        author: req.body.author
    });

    post.save()
        .then(result => {
            res.status(201).send(result);
        })
        .catch(err => {
            res.status(400).send("Something went wrong. Post not saved: " + err);
        });
});

router.patch('/:id', (req, res) => {
    // update post by id

});

router.delete('/:id', (req, res) => {
    // delete post by id

});

module.exports = router;
