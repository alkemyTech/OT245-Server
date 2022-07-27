const express = require('express')
const {
  get, getById, destroy, put,
} = require('../controllers/slides')

const router = express.Router()

router.get('/', get)
router.get('/:id', getById)
router.delete('/:id', destroy)
router.put('/:id', put)

module.exports = router
