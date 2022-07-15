const express = require('express')
const { get } = require('../controllers/index')
const organizationRouter = require('./organization')

const router = express.Router()

router.use('/organization', organizationRouter)

// example of a route with index controller get function
router.get('/', get)

module.exports = router
