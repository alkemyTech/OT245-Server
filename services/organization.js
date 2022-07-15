const { ErrorObject } = require('../helpers/error')
const { Organization } = require('../database/models/organization')

exports.getOrganization = async () => {
  try {
    const getOrganization = await Organization.findAll({
      attributes: ['name', 'image', 'phone', 'address'],
    })
    if (!getOrganization) {
      throw new ErrorObject('No information found', 404)
    }
    return getOrganization
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
