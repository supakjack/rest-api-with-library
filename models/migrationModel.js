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
  createTableUsers: async () => {
    return new Promise((resolve, reject) => {
      try {
        const doseCreatetableUsers = knex.schema.createTable(
          'users',
          (table) => {
            table.increments('id')
            table.string('username')
            table.string('email')
            table.string('password')
          }
        )
        resolve(doseCreatetableUsers)
      } catch (error) {
        console.log(error.message)
        reject(createError.InternalServerError())
      }
    })
  }
}
