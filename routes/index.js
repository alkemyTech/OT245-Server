const express = require('express')
const { get } = require('../controllers/index')
const activities = require('./activities')
const auth = require('./auth')
const categories = require('./categories')
const news = require('./news')

const router = express.Router()

router.get('/', get)



router.use('/activities', activities)

router.use('/auth', auth)
router.use('/categories', categories)

router.use('/news', news)

module.exports = router
