const express = require('express')
const { get } = require('../controllers/index')

const organizations = require('./organizations')
const categories = require('./categories')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.use('/categories', categories)
router.use('/organization', organizations)

module.exports = router
