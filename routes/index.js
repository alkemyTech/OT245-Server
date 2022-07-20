const express = require('express')
const { get } = require('../controllers/index')
const activities = require('./activities')
const auth = require('./auth')
const categories = require('./categories')
const organizations = require('./organizations')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.use('/activities', activities)
router.use('/auth', auth)
router.use('/categories', categories)
router.use('/organization', organizations)

module.exports = router
