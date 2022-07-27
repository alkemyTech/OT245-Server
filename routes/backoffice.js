const { Router } = require('express')
const { get } = require('../controllers/contacts')
const { validateToken } = require('../middlewares/validateUser')
const { verifyAdmin } = require('../middlewares/admin')

const router = Router()

router.get('/contacts', [validateToken, verifyAdmin], get)

module.exports = router
