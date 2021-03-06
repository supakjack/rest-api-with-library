const {
  userInsertDataSchema,
  userSelectDataSchema,
  userUpdateDataSchema,
  userDeleteDataSchema
} = require('./../helpers/validation_schema')
const gobalModel = require('../models/gobalModel')
const bcrypt = require('bcrypt')

module.exports = {
  add: async (req, res, next) => {
    try {
      const userInsertData = await userInsertDataSchema.validateAsync(req.body)
      const salt = await bcrypt.genSalt(10)
      console.log(userInsertData.table.insertData[0].password)
      const hashPassword = await bcrypt.hash(userInsertData.table.insertData[0].password, salt)
      console.log(hashPassword)
      userInsertData.table.insertData[0].password = hashPassword 
      const doesInsert = await gobalModel.insert(userInsertData.table)
      res.status(201).send({ doesInsert })
    } catch (error) {
      next(error)
    }
  },
  select: async (req, res, next) => {
    try {
      const userSelectData = await userSelectDataSchema.validateAsync(req.body)
      const doesSelect = await gobalModel.select(userSelectData.table)
      res.status(200).send({ doesSelect })
    } catch (error) {
      next(error)
    }
  },
  update: async (req, res, next) => {
    try {
      const userUpdatetData = await userUpdateDataSchema.validateAsync(req.body)
      const doesUpdate = await gobalModel.update(userUpdatetData.table)
      res.status(200).send({ doesUpdate })
    } catch (error) {
      next(error)
    }
  },
  remove: async (req, res, next) => {
    try {
      const userDeleteData = await userDeleteDataSchema.validateAsync(req.body)
      const doesDelete = await gobalModel.delete(userDeleteData.table)
      res.status(204).send({ doesDelete })
    } catch (error) {
      next(error)
    }
  }
}
