const express = require('express')
const router = express.Router()

const db = require('../models')
const course = require('../models/course')
const courses = require('../models/seed')

router.get('/', function (req, res) {
    db.Course.find({})
        .then(courses => {
            res.render('courseIndex', {
                courses: courses
            })
        })
})

router.get('/new', (req, res) => {
    res.render('newCourse')
})

router.post('/', (req, res) => {
    db.Course.create(req.body)
        .then(course => res.json(course))
})

router.get('/:id', function (req, res) {
    db.Course.findById(req.params.id)
        .then(course => {
            res.render('courseDetails', {
                course: course
            })
        })
        .catch(() => res.send('404 Error: Page Not Found'))
})

router.get('/:id/edit', (req, res) => {
    // console.log('from');
    db.Course.findById(req.params.id)
        .then(course => {
            // console.log(course, 'in here');
            res.render('editForm', {
                course: course
        })
    })
})

router.put('/:id', (req, res) => {
    db.Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(course => res.json(course))
})

router.delete('/:id', (req, res) => {
    db.Course.findByIdAndRemove(req.params.id)
        .then(course => res.send('You\'ve deleted course ' + course._id))
})

module.exports = router
