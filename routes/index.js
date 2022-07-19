const express = require('express')
const { get } = require('../controllers/index')
const activities = require('./activities')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.use('/activities', activities)

module.exports = router
