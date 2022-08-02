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

exports.updateMember = async (req) => {
  try {
    const { id } = req.params
    const { name, image } = req.body
    const member = await Member.findByPk(id)
    if (member) {
      await Member.update({
        name,
        image,
      }, { where: { id } })
    }
    if (!member) {
      throw new ErrorObject('Member not found', 404)
    }
    return member
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.deleteMember = async (id) => {
  try {
    const member = await Member.findByPk(id)
    if (!member) {
      throw new ErrorObject('Member not found', 400)
    }
    await member.destroy()
    return member
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getMembers = async () => {
  try {
    const members = await Member.findAll()
    return members
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
