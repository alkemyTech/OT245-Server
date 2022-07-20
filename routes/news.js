const express = require('express')
const { post } = require('../controllers/news')
const { schemaValidator } = require('../middlewares/newValidator')
const { news } = require('../schemas/news')

const router = express.Router()

router.post('/', schemaValidator(news), post)

module.exports = router
