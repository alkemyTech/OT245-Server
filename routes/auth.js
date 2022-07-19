const express = require('express')
const { post } = require('../controllers/users')
const { schemaValidator } = require('../middlewares/validator')
const { register } = require('../schemas/user')

const router = express.Router()

router.post('/register', schemaValidator(register), post)

module.exports = router
