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
const { verifyAdmin } = require('../middlewares/admin')
const { validateToken } = require('../middlewares/validateUser')

const router = express.Router()

router.get('/', get)
router.get('/:id', getCategoryById)
router.post('/', validateToken, verifyAdmin, schemaValidator(category), post)
router.put('/:id', validateToken, verifyAdmin, put)
router.delete('/:id', validateToken, verifyAdmin, destroy)

module.exports = router
