const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { register, userLogin } = require('../schemas/users')
const {
  post,
  login,
  getUserByToken,
} = require('../controllers/users')

const router = express.Router()

router.post('/register', schemaValidator(register), post)
router.post('/login', schemaValidator(userLogin), login)
router.get('/me', getUserByToken)

module.exports = router
