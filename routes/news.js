const express = require('express')
const {
  post,
  getById,
  put,
  destroy,
} = require('../controllers/news')
const { schemaValidator } = require('../middlewares/validator')
const { news } = require('../schemas/news')
const { verifyAdmin } = require('../middlewares/admin')
const { validateToken } = require('../middlewares/validateUser')

const router = express.Router()

router.post('/', validateToken, verifyAdmin, schemaValidator(news), post)
router.get('/:id', getById)
router.put('/:id', validateToken, verifyAdmin, put)
router.delete('/:id', validateToken, verifyAdmin, destroy)

module.exports = router
