const express = require('express');
const router = express.Router();

const marked = require('marked');

const config = require('../../config.js');

router.patch('/', (req, res) => {
    config.about.greeting = req.body.greeting;
    config.about.image = req.body.image;
    config.about.bio = req.body.bio;
    config.about.main = marked(req.body.mainMD);

    res.render('../views/redirect.ejs', {
        redirectURL: '/cms'
    });
});

module.exports = router;
