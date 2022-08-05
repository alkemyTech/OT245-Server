const express = require('express')
const {
  post,
  getById,
  put,
  destroy,
  get,
} = require('../controllers/news')
const { schemaValidator } = require('../middlewares/validator')
const { validateToken } = require('../middlewares/validateUser')
const { news } = require('../schemas/news')

const router = express.Router()

router.post('/', schemaValidator(news), post)
router.get('/:id', getById)
router.put('/:id', put)
router.delete('/:id', destroy)
router.get('/', validateToken, get)

module.exports = router
