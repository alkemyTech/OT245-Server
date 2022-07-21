const jwt = require('jsonwebtoken')

const generateToken = (user) => new Promise((resolve, reject) => {
  jwt.sign({ user }, process.env.SECRETORPRIVATEKEY, (err, token) => {
    if (err) {
      reject(err)
    } else {
      resolve(token)
    }
  })
})

const decodeToken = (token) => {
  try {
    const { user } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
    return user
  } catch (error) {
    return error
  }
}

module.exports = {
  generateToken,
  decodeToken,
}
