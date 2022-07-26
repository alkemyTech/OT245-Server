const express = require('express')
const { destroy, put, list } = require('../controllers/users')
const { verifyAdmin } = require('../middlewares/admin')
const { validateToken } = require('../middlewares/validateUser')

const router = express.Router()
// list all users
router.get('/', validateToken, verifyAdmin, list)

router.delete('/:id', destroy)
router.put('/:id', put)

module.exports = router
