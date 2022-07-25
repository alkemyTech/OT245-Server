const { Router } = require('express')
const { get, put } = require('../controllers/organizations')
const { schemaValidator } = require('../middlewares/validator')
const { organization } = require('../schemas/organizations')

const router = Router()

router.get('/public', get)
router.put('/public/:id', schemaValidator(organization), put)

module.exports = router
