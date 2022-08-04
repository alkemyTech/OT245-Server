const express = require('express')
const {
  get, getById, destroy, put, post,
} = require('../controllers/slides')
const { validateFiles } = require('../middlewares/validateFiles')
const { schemaValidator } = require('../middlewares/validator')
const { slides } = require('../schemas/slides')

const router = express.Router()

router.get('/', get)
router.get('/:id', getById)
router.delete('/:id', destroy)
router.put('/:id', put)
router.post('/', [validateFiles, schemaValidator(slides)], post)

module.exports = router
