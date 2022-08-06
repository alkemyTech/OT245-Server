const express = require('express')
const { verifyAdmin } = require('../middlewares/admin')
const { validateToken } = require('../middlewares/validateUser')
const { schemaValidator } = require('../middlewares/validator')
const { comment } = require('../schemas/comments')
const { get, post } = require('../controllers/comments')

const router = express.Router()

router.get('/', [validateToken, verifyAdmin], get)
router.post('/', validateToken, schemaValidator(comment), post)

module.exports = router
