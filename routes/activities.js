const express = require('express')
const { post, put } = require('../controllers/activities')
const { schemaValidator } = require('../middlewares/validator')
const { activity } = require('../schemas/activities')
const { verifyAdmin } = require('../middlewares/admin')
const { validateToken } = require('../middlewares/validateUser')

const router = express.Router()

router.post('/', validateToken, verifyAdmin, schemaValidator(activity), post)
router.put('/:id', validateToken, verifyAdmin, put)

module.exports = router
