const express = require('express')

const router = express.Router()

const db = require('../models');
const course = require('../models/course');
const courses = require('../models/seed');

router.get('/', (req, res) => {
	db.Course.find({}, { creations: true, _id: false })
        .then(courses => {

	    	const flatList = []
	    	for (let course of courses) {
	        	flatList.push(...course.creations)
	    	}
	    	res.json(flatList)
		}
	)
});

router.get('/new/:courseId', (req, res) => {
    res.send('You\'ve reached the new route. You\'ll be making a new creation for course ' + req.params.courseId)
})

router.post('/create/:courseId', (req, res) => {
    db.Course.findByIdAndUpdate(
        req.params.courseId,
        { $push: { creations: req.body } },
        { new: true }
    )
        .then(course => res.json(course))
});

router.get('/:id', (req, res) => {
    db.Course.findOne(
        { 'creations._id': req.params.id },
        { 'creations.$': true, _id: false }
    )
        .then(course => {

            res.json(course.creations[0])
        })
});

router.delete('/:id', (req, res) => {
    db.Course.findOneAndUpdate(
        { 'creations._id': req.params.id },
        { $pull: { creations: { _id: req.params.id } } },
        { new: true }
    )
        .then(course => res.json(course))
});

module.exports = router
