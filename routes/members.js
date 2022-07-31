const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { postMember } = require('../schemas/members')
const { validateToken } = require('../middlewares/validateUser')
const {
  post, put, destroy, get,
} = require('../controllers/members')
const { verifyAdmin } = require('../middlewares/admin')

const router = express.Router()

router.post('/', [validateToken, schemaValidator(postMember)], post)
router.put('/:id', [validateToken], put)
router.delete('/:id', validateToken, destroy)
router.get('/', [validateToken, verifyAdmin], get)

module.exports = router
