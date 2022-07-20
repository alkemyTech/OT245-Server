const express = require('express')
const { get, post, getCategoryById, put } = require('../controllers/categories')
const { schemaValidator } = require('../middlewares/validator')
const { category } = require('../schemas/categories')


const router = express.Router()

router.get('/', get)
router.get('/:id', getCategoryById)
router.post('/', schemaValidator(category), post)
router.put('/:id', put)

module.exports = router
