const bcrypt = require('bcrypt')

module.exports = {
  comparePassword: async (reqPassword, hashPassword) => {
    return new Promise((resolve, reject) => {
      try {
        const isMatch = bcrypt.compare(reqPassword, hashPassword)
        resolve(isMatch)
      } catch (error) {
        console.log(error.message)
        reject(createError.InternalServerError())
      }
    })
  }
}
