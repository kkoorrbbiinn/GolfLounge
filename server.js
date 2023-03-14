require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require('method-override');


const db = require('./models');

const coursesCtrl = require('./controllers/courses');
const courses = require('./models/seed');
const creationCtrl = require('./controllers/creations')

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
app.use('/creations', creationCtrl)




app.get('/', function (req, res) {
    db.Course.find({ description: true })
        .then(courses => {
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
            console.log(`Removed ${removedCourses.deletedCount} tweets`)
            
            db.Course.insertMany(db.seedCourses)
                .then(addedCourses => {
                    console.log(`Added ${addedCourses.length} courses to be played`)
                    res.json(addedCourses)
                })
        })
});

app.get('/about', function (req, res) {
    res.send('You\'ve hit the about route')
});

app.use('/courses', coursesCtrl)

app.get('*', function (req, res) {
    res.send('404 Error: Page Not Found')
});
