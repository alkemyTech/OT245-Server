const { Organization } = require('../database/models')
const { ErrorObject } = require('../helpers/error')

module.exports.slides = {
  organizationId: {
    exists: {
      errorMessage: 'organizationId cannot be null',
      options: { checkFalsy: true },
    },
    custom: {
      options: async (organizationId) => {
        const organization = await Organization.findByPk(organizationId)
        if (!organization) {
          throw new ErrorObject('Organization not found', 404)
        }
        return organizationId
      },
    },
  },
}
