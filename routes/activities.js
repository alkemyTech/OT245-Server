const express = require('express')
const { post, put } = require('../controllers/activities')
const { schemaValidator } = require('../middlewares/validator')
const { activity } = require('../schemas/activities')

const router = express.Router()

router.post('/', schemaValidator(activity), post)
router.put('/:id', put)

module.exports = router
