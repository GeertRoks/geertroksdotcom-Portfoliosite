const express = require('express');
const app = express();

const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const datefns = require('date-fns');

const config = require('./config');
const PORT = config.PORT || 3000;

const Posts = require('./models/post-model.js');

// ------------- CONNECT TO MONGODB -------------
// -------- AND START THE EXPRESS SERVER --------
const dbURI ='mongodb://mongo:27017/PersonalWebsite';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then((result) => { app.listen(PORT, () => { console.log("Server is listening at port " + PORT) }) })
    .catch((err) => console.log(err));
// app.listen(PORT, () => { console.log("Server is listening at port " + PORT) });

// ------------- MIDDLEWARES -------------
app.use(express.json()); //receive json from HTTP POST
app.use(fileUpload()); //middleware for easy uploading of files
app.use(cors());

app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

// ------------- ROUTES -------------
// ************* Views *************
// Main
app.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.render('index', {
                posts: posts,
                datefns: datefns
            });
        });
});

app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/projects', (req, res) => {
    res.render('projects');
})
app.get('/project/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            res.render('project', {
                post: post
            });
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

// CMS
const cms_routes = require('./routes/cms-routes.js');
app.use('/cms', cms_routes);

// ************* API *************
const posts_routes = require('./routes/posts-routes.js');
app.use('/api/posts', posts_routes);
