const express = require("express");
const morgan = require("morgan"); 
const mongoose = require('mongoose');
const appLocals = require('./app.locals'); 

const courseRoutes = require('./routes/courseRoutes');

// express app
const app = express();
app.locals = appLocals;

const port = process.env.PORT || 3000;

// connect to mongodb
const dbURI = "mongodb+srv://server-db-user:2CK8e06aQDjyvJCp@cluster0.gz81r.mongodb.net/NodeServer?retryWrites=true&w=majority"; 
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to db');
        app.listen(port, () => console.log(`Started Listening on Port ${port}`));
    })
    .catch((err) => console.log(err)); 

// register view engine
app.set('view engine', 'ejs'); 

// middleware & static files
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev')); 

// index page
app.get('/', (req, res) => res.render('index'));

// routes
app.use('/courses', courseRoutes);

// 404 Page
app.use((req, res) => res.status(404).render('404', {title: '404'}));