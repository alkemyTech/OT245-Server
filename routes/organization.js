const express = require('express')
const { get } = require('../controllers/organization')

const router = express.Router()

router.get('/public', get)

module.exports = router
