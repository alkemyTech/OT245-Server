const express = require('express')
const { get } = require('../controllers/index')
const activities = require('./activities')
const auth = require('./auth')
const categories = require('./categories')
const news = require('./news')

const router = express.Router()

router.get('/', get)
<<<<<<< HEAD
router.use('/activities', activities)
=======



router.use('/activities', activities)

>>>>>>> be33d2462a8a14087621960bacc998b473522b10
router.use('/auth', auth)
router.use('/categories', categories)
router.use('/news', news)

router.use('/news', news)

module.exports = router
