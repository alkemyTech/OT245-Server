const express = require('express')
const { get, getCategoryById, put } = require('../controllers/categories')

const router = express.Router()

router.get('/', get)
router.get('/:id', getCategoryById)
router.put('/:id', put)

module.exports = router
