const { ErrorObject } = require('../helpers/error')
const { Organization } = require('../database/models')

exports.getOrganizations = async () => {
  try {
    const getOrganizations = await Organization.findAll({
      attributes: ['name', 'image', 'phone', 'address', 'facebook', 'instagram', 'linkedin'],
    })
    if (!getOrganizations) {
      throw new ErrorObject('No information found', 404)
    }
    return getOrganizations
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateOrganization = async (id, body) => {
  try {
    const organization = await Organization.findByPk(id)
    if (!organization) {
      throw new ErrorObject('Organization not found', 404)
    }
    const updatedOrganization = await organization.update(body)
    return updatedOrganization
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
