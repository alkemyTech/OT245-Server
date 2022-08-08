const express = require('express')
const { verifyAdmin } = require('../middlewares/admin')
const { validateToken } = require('../middlewares/validateUser')
const { get, destroy } = require('../controllers/comments')
const { commentOwnership } = require('../middlewares/commentOwnership')

const router = express.Router()

router.get('/', [validateToken, verifyAdmin], get)
router.delete('/:id', [validateToken, commentOwnership], destroy)

module.exports = router
