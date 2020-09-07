const joi = require('@hapi/joi')

const userInsertDataSchema = joi.object({
  table: {
    name: joi.string().required(),
    insertData: joi.array().required()
  }
})

const userSelectDataSchema = joi.object({
  table: {
    name: joi.string().required(),
    filter: joi.array(),
    condition: joi.array()
  }
})

const userUpdateDataSchema = joi.object({
  table: {
    name: joi.string().required(),
    filter: joi.array(),
    condition: joi.object(),
    updateData: joi.object()
  }
})

const userDeleteDataSchema = joi.object({
  table: {
    name: joi.string().required(),
    condition: joi.object()
  }
})

const userDataSchema = joi.object({
  username: joi.string().required(),
  password: joi.string()
})

module.exports = {
  userInsertDataSchema,
  userSelectDataSchema,
  userUpdateDataSchema,
  userDeleteDataSchema,
  userDataSchema
}
