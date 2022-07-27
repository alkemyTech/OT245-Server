const { Router } = require('express')
const { destroy } = require('../controllers/testimonials')
const { verifyAdmin } = require('../middlewares/admin')
const { validateToken } = require('../middlewares/validateUser')

const router = Router()

router.delete('/:id', [validateToken, verifyAdmin], destroy)

module.exports = router
