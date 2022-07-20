const express = require('express')
const { post, login } = require('../controllers/users')
const { schemaValidator } = require('../middlewares/validator')
const { register, userLogin } = require('../schemas/users')

const router = express.Router()

router.post('/register', schemaValidator(register), post)
router.post('/login', schemaValidator(userLogin), login)

module.exports = router
