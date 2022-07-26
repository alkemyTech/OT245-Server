const express = require('express')
const { get } = require('../controllers/index')
const activities = require('./activities')
const auth = require('./auth')
const categories = require('./categories')
const organizations = require('./organizations')
const users = require('./users')
const news = require('./news')
const slides = require('./slides')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.use('/activities', activities)
router.use('/auth', auth)
router.use('/categories', categories)
router.use('/organization', organizations)
router.use('/users', users)
router.use('/news', news)
router.use('/slides', slides)

module.exports = router
