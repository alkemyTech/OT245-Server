const express = require('express')
const { get } = require('../controllers/categories')

const router = express.Router()

router.get('/categories', get)

module.exports = router
