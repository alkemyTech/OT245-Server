const express = require('express')
const { get } = require('../controllers/index')
const auth = require('./auth')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.use('/auth', auth)

module.exports = router
