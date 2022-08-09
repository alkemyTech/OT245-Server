const path = require('path')

exports.configSwagger = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Backend Proyecto ONG - Somos Más',
      description: 'Api de la aceleración de Alkemy',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Server Local',
      },
    ],
  },
  apis: [`${path.join(__dirname, '../controllers/*.js')}`],
}
