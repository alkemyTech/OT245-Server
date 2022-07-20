const express = require('express')
const { get, post } = require('../controllers/categories')
const { schemaValidator } = require('../middlewares/validator')
const { category } = require('../schemas/categories')

const router = express.Router()

router.get('/', get)
router.post('/', schemaValidator(category), post)
module.exports = router
