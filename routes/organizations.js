const { Router } = require('express')
const { get, put } = require('../controllers/organizations')
const { verifyAdmin } = require('../middlewares/admin')
const { validateToken } = require('../middlewares/validateUser')
const { schemaValidator } = require('../middlewares/validator')
const { organization } = require('../schemas/organizations')

const router = Router()

router.get('/public', get)
router.put('/public/:id', validateToken, verifyAdmin, schemaValidator(organization), put)

module.exports = router
