const gobalModel = require('../models/gobalModel')
const authModel = require('./../models/authModel')
const { userDataSchema } = require('./../helpers/validation_schema')
const createError = require('http-errors')
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} = require('./../helpers/jwt_helper')
const client = require('./../helpers/init_redis')

module.exports = {
  login: async (req, res, next) => {
    try {
      const userData = await userDataSchema.validateAsync(req.body)
      const doesLogin = await gobalModel.select({
        name: 'users',
        filter: ['id', 'username', 'password'],
        condition: [{ username: userData.username }]
      })
      const userId = doesLogin[0].id.toString()
      const userHashPassword = doesLogin[0].password.toString()
      const isMatch = await authModel.comparePassword(
        userData.password,
        userHashPassword
      )
      if (!isMatch)
        throw createError.Unauthorized('Username/password not valid')

      const accessToken = await signAccessToken(userId)
      const refreshToken = await signRefreshToken(userId)

      res.status(200).send({ accessToken, refreshToken })
    } catch (error) {
      next(error)
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)

      const accessToken = await signAccessToken(userId)
      const refToken = await signRefreshToken(userId)

      res.send({ accessToken, refreshToken: refToken })
    } catch (error) {
      next(error)
    }
  },
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)
      client.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message)
          throw createError.InternalServerError()
        }
        console.log(val)
        res.sendStatus(204)
      })
    } catch (error) {
      next(error)
    }
  }
}
