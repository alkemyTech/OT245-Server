const express = require('express')
const { verifyAdmin } = require('../middlewares/admin')
const { validateToken } = require('../middlewares/validateUser')
const { get } = require('../controllers/comments')

const router = express.Router()

router.get('/', [validateToken, verifyAdmin], get)

module.exports = router
