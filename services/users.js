const bcrypt = require('bcrypt')
const { ErrorObject } = require('../helpers/error')
const { User } = require('../database/models')

exports.createUser = async (body) => {
  try {
    const existantUser = await this.getUserByEmail(body.email)
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

exports.getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } })
    return user
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getPassword = (myPlaintextPassword, hash) => {
  try {
    return bcrypt.compareSync(myPlaintextPassword, hash)
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.createLogin = async (email, password) => {
  try {
    const user = await this.getUserByEmail(email)
    if (user) {
      const hash = user.password
      const login = this.getPassword(password, hash)
      if (login) {
        return user
      }
    }
    return null
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id)
    if (user) {
      User.destroy({ where: { id: user.id } })
    } else {
      throw new ErrorObject('UserId deleted failed', 404)
    }
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
