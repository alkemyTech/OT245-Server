const express = require('express')
const { get } = require('../controllers/index')
const activities = require('./activities')
const auth = require('./auth')
const categories = require('./categories')
const news = require('./news')

const router = express.Router()

router.get('/', get)
<<<<<<< HEAD

=======
router.use('/activities', activities)
>>>>>>> b94ccc3c36d120a9556cb7e64e9ecc76aad0398c
router.use('/auth', auth)
router.use('/categories', categories)
router.use('/news', news)

module.exports = router
