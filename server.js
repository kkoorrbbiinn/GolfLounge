require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require('method-override');


const db = require('./models');

const coursesCtrl = require('./controllers/courses');
const reviewsCtrl = require('./controllers/reviews');
const course = require('./models/course');


const app = express();

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'))
app.use(connectLiveReload());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));





app.get('/', function (req, res) {
    db.Course.find({isFeatured: true})
        .then(courses => {
            console.log(courses);
            res.render('home', {
                courses: courses
            })
        })
});

app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});

app.get('/seed', function (req, res) {
    
    db.Course.deleteMany({})
        .then(removedCourses => {
            // console.log(`Removed ${removedCourses.deletedCount} tweets`)
            
            db.Course.insertMany(db.seedCourses)
                .then(addedCourses => {
                    // console.log(`Added ${addedCourses.length} courses to be played`)
                    res.json(addedCourses)
                })
        })
});

app.get('/about', function (req, res) {
    res.render('about')
});

app.use('/courses', coursesCtrl);
app.use('/reviews', reviewsCtrl);

app.get('*', function (req, res) {
    res.render('404')
});
