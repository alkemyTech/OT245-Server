const express = require('express')
const {
  get, getById, destroy, put, post,
} = require('../controllers/slides')
const { validateFiles } = require('../middlewares/validateFiles')
const { schemaValidator } = require('../middlewares/validator')
const { slides } = require('../schemas/slides')
const { verifyAdmin } = require('../middlewares/admin')

const router = express.Router()

router.get('/', get)
router.get('/:id', getById)
router.delete('/:id', verifyAdmin, destroy)
router.put('/:id', verifyAdmin, put)
router.post('/', [verifyAdmin, validateFiles, schemaValidator(slides)], post)

module.exports = router
