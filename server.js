const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const config = require('./config');
const PORT = config.PORT || 3000;

// ------------- CONNECT TO MONGODB -------------
// -------- AND START THE EXPRESS SERVER --------
const dbURI ='mongodb://mongo:27017/PersonalWebsite';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then((result) => { app.listen(PORT, () => { console.log("Server is listening at port " + PORT) }) })
    .catch((err) => console.log(err));

// ------------- MIDDLEWARES -------------
app.use(express.json()); //receive json from HTTP POST
app.use(fileUpload()); //middleware for easy uploading of files
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('public', path.join(__dirname, 'public'));

// ------------- ROUTES -------------
app.get('/', (req, res) => {
    res.render('index');
});
app.use(express.static('public'));
