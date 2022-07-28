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

exports.updateOrganization = async (req) => {
  try {
    const { id } = req.params
    const {
      name, image, address, email, phone, welcomeText, aboutUsText,
    } = req.body
    await Organization.update({
      name,
      image,
      address,
      email,
      phone,
      welcomeText,
      aboutUsText,
    }, { where: { id } })
    const updatedOrganization = await Organization.findByPk(id)
    if (!updatedOrganization) {
      throw new ErrorObject('Not found', 404)
    }
    return updatedOrganization
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
