const express = require('express')
const {
  get,
  getCategoryById,
  put,
  post,
} = require('../controllers/categories')
const { schemaValidator } = require('../middlewares/validator')
const { category } = require('../schemas/categories')

const router = express.Router()

router.get('/', get)
router.get('/:id', getCategoryById)
router.post('/', schemaValidator(category), post)
router.put('/:id', put)
router.delete('/:id', destroy)

module.exports = router
