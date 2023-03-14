require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

const db = require('./models');

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

app.get('/', function (req, res) {
    res.send('Golf Courses')
});

app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
