const express = require('express')
const { get, getById, destroy } = require('../controllers/slides')

const router = express.Router()

router.get('/', get)
router.get('/:id', getById)
router.delete('/:id', destroy)

module.exports = router
