const express = require('express')
const router = express.Router()

const db = require('../models')
const review = require('../models/review')
const reviews = require('../models/seed')

router.get('/', function (req, res) {
    db.Review.find({})
        .then(reviews => {
            res.render('reviewsIndex', {
                reviews: reviews
            })
        })
})

router.get('/new', (req, res) => {
    res.send('You\'ve hit the new route!')
})

router.post('/', (req, res) => {
    db.Review.create(req.body)
        .then(review => res.json(review))
})

router.get('/:id', function (req, res) {
    db.Review.findById(req.params.id)
        .then(review => {
            res.render('reviewsDetails', {
                review: review
            })
        })
        .catch(() => res.send('404 Error: Page Not Found'))
})

router.get('/:id/edit', (req, res) => {
    // console.log('from');
    db.Review.findById(req.params.id)
        .then(course => {
            // console.log(course, 'in here');
            res.render('editReviewsForm', {
                review: review
        })
    })
})

router.put('/:id', (req, res) => {
    db.Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(review => res.json(review))
})

router.delete('/:id', (req, res) => {
    db.Review.findByIdAndRemove(req.params.id)
        .then(review => res.send('You\'ve deleted review ' + review._id))
})

module.exports = router