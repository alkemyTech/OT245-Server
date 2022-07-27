const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { contactRegister } = require('../schemas/contacts')
const { post, get } = require('../controllers/contacts')
const { validateToken } = require('../middlewares/validateUser')
const { verifyAdmin } = require('../middlewares/admin')

const router = express.Router()

router.post('/', schemaValidator(contactRegister), post)
router.get('/', [validateToken, verifyAdmin], get)

module.exports = router
