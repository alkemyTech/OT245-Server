const express = require('express')
const { post, put } = require('../controllers/activities')
const { schemaValidator } = require('../middlewares/validator')
const { activity } = require('../schemas/activities')
const { verifyAdmin } = require('../middlewares/admin')

const router = express.Router()

router.post('/', verifyAdmin, schemaValidator(activity), post)
router.put('/:id', verifyAdmin, put)

module.exports = router
