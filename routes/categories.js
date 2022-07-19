const express = require('express')
const { get, getId } = require('../controllers/categories')

const router = express.Router()

router.get('/', get)
router.get('/:id', getId)

module.exports = router
