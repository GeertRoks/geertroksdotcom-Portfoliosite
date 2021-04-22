const express = require('express');
const app = express();

const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override');

const config = require('./config');
const PORT = config.PORT || 3000;

const Project = require('./models/project-model.js');

// ------------- CONNECT TO MONGODB -------------
// -------- AND START THE EXPRESS SERVER --------
const dbURI ='mongodb://mongo:27017/PersonalWebsite';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((result) => { app.listen(PORT, () => { console.log("Server is listening at port " + PORT) }) })
    .catch((err) => console.log(err));
// app.listen(PORT, () => { console.log("Server is listening at port " + PORT) });

// ------------- MIDDLEWARES -------------
app.use(express.urlencoded({  extended: false })); //read forms from HTTP POST
app.use(fileUpload()); //middleware for easy uploading of files
app.use(cors());
app.use(methodOverride('_method'));

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
    Project.find()
        .sort({ date: 'desc' })
        .then(projects => {
            res.render('index', {
                projects: projects,
            });
        });
});

app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/projects', (req, res) => {
    Project.find()
        .sort({ date: 'desc' })
        .then( projects => {
            res.render('projects', {
                projects: projects
            });
        });
});
app.get('/projects/:slug', (req, res) => {
    Project.findOne({ slug: req.params.slug })
        .then(project => {
            res.render('project', {
                project: project
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
const projects_routes = require('./routes/api/projects-routes.js');
app.use('/api/projects', projects_routes);
