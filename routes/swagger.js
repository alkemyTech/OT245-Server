const router = require('express').Router()
const { serve, setup } = require('swagger-ui-express')
const { configSwagger } = require('../config/config.swagger')
const swaggerJSDocs = require('swagger-jsdoc')(configSwagger) // eslint-disable-line

router.use('/', serve)
router.get('/', setup(swaggerJSDocs))

module.exports = router
