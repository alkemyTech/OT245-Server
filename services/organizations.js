const { ErrorObject } = require('../helpers/error')
const { Organization } = require('../database/models')

exports.getOrganization = async () => {
  try {
    const getOrganizations = await Organization.findAll({
      attributes: ['name', 'image', 'phone', 'address'],
    })
    if (!getOrganizations) {
      throw new ErrorObject('No information found', 404)
    }
    return getOrganizations
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
