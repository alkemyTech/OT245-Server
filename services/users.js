const bcrypt = require('bcrypt')
const { ErrorObject } = require('../helpers/error')
const { User } = require('../database/models')

exports.registUser = async (body) => {
  try {
    const existantUser = await User.findOne({ where: { email: body.email } })
    if (existantUser) {
      throw new ErrorObject('Email already in use', 404)
    }
    const hashedPassword = await bcrypt.hash(body.password, 10)
    body.password = hashedPassword
    body.roleId = 1
    const newUser = await User.create(body)
    if (!newUser) {
      throw new ErrorObject('User registration failed', 404)
    }
    return newUser
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
