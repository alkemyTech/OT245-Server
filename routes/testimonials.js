const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { validateToken } = require('../middlewares/validateUser')
const { verifyAdmin } = require('../middlewares/admin')
const { postTestimonial } = require('../schemas/testimonials')
const { post } = require('../controllers/testimonials')

const router = express.Router()

router.post('/', [validateToken, verifyAdmin, schemaValidator(postTestimonial)], post)

module.exports = router
