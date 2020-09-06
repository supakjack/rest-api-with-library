const knex = require('./../helpers/init_knex')
const createError = require('http-errors')

module.exports = {
  dropTable: async (nameTable) => {
    return new Promise((resolve, reject) => {
      try {
        const doseDroptable = knex.schema.dropTableIfExists(nameTable)
        resolve(doseDroptable)
      } catch (error) {
        console.log(error.message)
        reject(createError.InternalServerError())
      }
    })
  },
  insert: async (table) => {
    return new Promise((resolve, reject) => {
      try {
        const doseInsert = knex(table.name).insert(table.insertData)
        resolve(doseInsert)
      } catch (error) {
        console.log(error.message)
        reject(createError.InternalServerError())
      }
    })
  },
  select: async (table) => {
    return new Promise((resolve, reject) => {
      try {
        const doseSelect = knex.select(table.filter).from(table.name)
        resolve(doseSelect)
      } catch (error) {
        console.log(error.message)
        reject(createError.InternalServerError())
      }
    })
  },
  update: async (table) => {
    return new Promise((resolve, reject) => {
      try {
        const doseUpdate = knex(table.name)
          .where(table.condition)
          .update(table.updateData)
        resolve(doseUpdate)
      } catch (error) {
        console.log(error.message)
        reject(createError.InternalServerError())
      }
    })
  },
  delete: async (table) => {
    return new Promise((resolve, reject) => {
      try {
        const doseDelete = knex(table.name).where(table.condition).del()
        resolve(doseDelete)
      } catch (error) {
        console.log(error.message)
        reject(createError.InternalServerError())
      }
    })
  }
}
