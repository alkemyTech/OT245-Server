const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { postMember } = require('../schemas/members')
const { validateToken } = require('../middlewares/validateUser')
const { post } = require('../controllers/members')

const router = express.Router()

router.post('/', [validateToken, schemaValidator(postMember)], post)

module.exports = router
