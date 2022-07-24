const express = require('express')
const { post, put } = require('../controllers/news')
const { schemaValidator } = require('../middlewares/validator')
const { news } = require('../schemas/news')

const router = express.Router()

router.post('/', schemaValidator(news), post)
router.put('/:id', put)

module.exports = router
