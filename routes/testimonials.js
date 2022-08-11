const { Router } = require('express')
const { destroy, getAll } = require('../controllers/testimonials')
const { verifyAdmin } = require('../middlewares/admin')
const { validateToken } = require('../middlewares/validateUser')
const { postTestimonial } = require('../schemas/testimonials')
const { post, put } = require('../controllers/testimonials')
const { schemaValidator } = require('../middlewares/validator')

const router = Router()
router.get('/', getAll)
router.post('/', [validateToken, verifyAdmin, schemaValidator(postTestimonial)], post)
router.delete('/:id', [validateToken, verifyAdmin], destroy)
router.put('/:id', [validateToken, verifyAdmin], put)

module.exports = router
