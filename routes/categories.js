const express = require('express')
const {
  get,
  getCategoryById,
  put,
  destroy,
} = require('../controllers/categories')

const router = express.Router()

router.get('/', get)
router.get('/:id', getCategoryById)
router.put('/:id', put)
router.delete('/:id', destroy)

module.exports = router
