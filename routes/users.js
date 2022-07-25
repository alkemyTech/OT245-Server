const express = require('express')
const {
  destroy,
  put,
} = require('../controllers/users')

const router = express.Router()

router.delete('/:id', destroy)
router.put('/:id', put)

module.exports = router
