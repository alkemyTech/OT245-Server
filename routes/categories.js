const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { category } = require('../schemas/categories')
const {
  get,
  getCategoryById,
  put,
  post,
  destroy,
} = require('../controllers/categories')

const router = express.Router()

router.get('/', get)
router.get('/:id', getCategoryById)
router.post('/', schemaValidator(category), post)
router.put('/:id', put)
router.delete('/:id', destroy)

module.exports = router
