const express = require('express')
const { get, getCategoryById } = require('../controllers/categories')

const router = express.Router()

router.get('/', get)
router.get('/:id', getCategoryById)

module.exports = router
