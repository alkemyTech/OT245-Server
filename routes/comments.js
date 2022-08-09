const express = require('express')
const { verifyAdmin } = require('../middlewares/admin')
const { validateToken } = require('../middlewares/validateUser')
const { schemaValidator } = require('../middlewares/validator')
const { comment } = require('../schemas/comments')
const { get, post, put } = require('../controllers/comments')
const { commentOwnership } = require('../middlewares/commentOwnership')

const router = express.Router()

router.get('/', [validateToken, verifyAdmin], get)
router.post('/', validateToken, schemaValidator(comment), post)
router.put('/:id', [validateToken, commentOwnership], put)

module.exports = router
