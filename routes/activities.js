const express = require('express')
const { post } = require('../controllers/activities')
const { schemaValidator } = require('../middlewares/validator')
const { activity } = require('../schemas/activities')

const router = express.Router()

router.post('/', schemaValidator(activity), post)

module.exports = router
