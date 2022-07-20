const express = require('express')
const { post, createLogin } = require('../controllers/users')
const { schemaValidator } = require('../middlewares/validator')
const { register, login } = require('../schemas/users')

const router = express.Router()

router.post('/register', schemaValidator(register), post)
router.post('/login', schemaValidator(login), createLogin)

module.exports = router
