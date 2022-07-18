const express = require('express')
const { post } = require('../controllers/users')
const { schemaValidator } = require('../middlewares/validator')
const { user } = require('../schemas/user')

const router = express.Router()

router.post('/register', schemaValidator(user), post)

module.exports = router
