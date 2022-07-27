const express = require('express')
const { get } = require('../controllers/slides')

const router = express.Router()

router.get('/', get)

module.exports = router
