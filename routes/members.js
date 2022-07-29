const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { postMember } = require('../schemas/members')
const { validateToken } = require('../middlewares/validateUser')
const { post, destroy } = require('../controllers/members')

const router = express.Router()

router.post('/', [validateToken, schemaValidator(postMember)], post)
router.delete('/:id', validateToken, destroy)

module.exports = router
