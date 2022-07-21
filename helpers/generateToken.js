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

module.exports = {
  generateToken,
}
