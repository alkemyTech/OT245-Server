const express = require('express')
const { get } = require('../controllers/index')
const organizations = require('./organizations')

const router = express.Router()

router.use('/organization', organizations)

// example of a route with index controller get function
router.get('/', get)

module.exports = router
