const express = require('express');
const app = express();

const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const config = require('./config');
const PORT = config.PORT || 3000;

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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

// ------------- ROUTES -------------
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

const posts_routes = require('./routes/posts-routes.js');
app.use('/api', () => { 
    app.use('/posts', posts_routes);
});
