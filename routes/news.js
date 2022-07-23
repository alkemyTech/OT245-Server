const express = require('express')
const { post, getById } = require('../controllers/news')
const { schemaValidator } = require('../middlewares/validator')
const { news } = require('../schemas/news')

const router = express.Router()

router.post('/', schemaValidator(news), post)
router.get('/:id', getById)

module.exports = router
