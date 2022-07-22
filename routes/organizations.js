const { Router } = require('express')
const express = require('express')
const { get, post } = require('../controllers/organizations')
const { schemaValidator } = require('../middlewares/validator')
const { organization } = require('../schemas/organizations')

const router = express.Router()

router.get('/public', get)
router.post('/public', schemaValidator(organization), post)

module.exports = router
