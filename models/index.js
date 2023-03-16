require('dotenv').config()
const mongoose = require('mongoose');
const mongodbUri = process.env.MONGODBURI;

(async function () {
    await mongoose.connect(mongodbUri);
    console.log('Mongoose is connected to', mongodbUri);
})().catch(err => console.log('MongoDB connection error:\n' + err))

module.exports = {
    Course: require('./course'),
    seedCourses: require('./seed')
}
