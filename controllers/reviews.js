const express = require('express')

const router = express.Router()

const db = require('../models');
const course = require('../models/course');
const courses = require('../models/seed');

router.get('/', (req, res) => {
    db.Course.find({}, { reviews: true, _id: false })
        .then(courses => {

            const flatList = []
            for (let course of courses) {
                flatList.push(...course.reviews)
            }
            res.render('reviews/reviewIndex.ejs', {
                apps: flatList
            })
        })
});

router.get('/new/:courseId', (req, res) => {
    db.Course.findById(req.params.courseId)
        .then(course => {
            res.render('reviews/newReviewForm', { course: course })
        })
        .catch(() => res.render('404'))
})

router.post('/create/:courseId', (req, res) => {
    db.Course.findByIdAndUpdate(
        req.params.courseId,
        { $push: { reviews: req.body } },
        { new: true }
    )
        .then(() => res.redirect('/reviews/reviewIndex'))
});

router.get('/:id', (req, res) => {
    db.Course.findOne(
        { 'reviews._id': req.params.id },
        { 'reviews.$': true, _id: false }
    )
        .then(course => {
            res.render('/reviews/reviewDetails', {
                app: course.reviews[0]
            })
        })
        .catch(() => res.render('404'))
});

router.delete('/:id', (req, res) => {
    db.Course.findOneAndUpdate(
        { 'reviews._id': req.params.id },
        { $pull: { reviews: { _id: req.params.id } } },
        { new: true }
    )
        .then(() => res.redirect('/reviews'))
});

module.exports = router