const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { contactRegister } = require('../schemas/contacts')
const { post } = require('../controllers/contacts')

const router = express.Router()

router.post('/', schemaValidator(contactRegister), post)

module.exports = router
