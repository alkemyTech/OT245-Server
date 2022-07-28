const { Router } = require('express')
const { destroy } = require('../controllers/testimonials')
const { verifyAdmin } = require('../middlewares/admin')
const { validateToken } = require('../middlewares/validateUser')
const { postTestimonial } = require('../schemas/testimonials')
const { post } = require('../controllers/testimonials')
const { schemaValidator } = require('../middlewares/validator')

const router = Router()
router.post('/', [validateToken, verifyAdmin, schemaValidator(postTestimonial)], post)
router.delete('/:id', [validateToken, verifyAdmin], destroy)

module.exports = router
