const express = require('express')
const { get } = require('../controllers/index')
const auth = require('./auth')
const categories = require('./categories')
const news = require('./news')

const router = express.Router()

router.get('/', get)
router.use('/news', news)
router.use('/auth', auth)
router.use('/categories', categories)

module.exports = router
