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

const router = express.Router()

router.post('/', verifyAdmin, schemaValidator(news), post)
router.get('/:id', getById)
router.put('/:id', verifyAdmin, put)
router.delete('/:id', verifyAdmin, destroy)

module.exports = router
