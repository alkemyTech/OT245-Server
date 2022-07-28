const { ErrorObject } = require('../helpers/error')
const { Member } = require('../database/models')

exports.postMember = async (body) => {
  try {
    const { name } = body
    const existentMember = await Member.findOne({ where: { name } })
    if (existentMember) {
      throw new ErrorObject('Member already exists', 400)
    }
    const member = await Member.create(body)
    return member
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
