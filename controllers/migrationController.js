const migrationModel = require('./../models/migrationModel')

module.exports = {
  dropTable: async (req, res, next) => {
    try {
      const tableName = req.body.name
      const doesDropTable = await migrationModel.dropTable(tableName)
      res.send({ doesDropTable })
    } catch (error) {
      next(error)
    }
  },
  createTableUsers: async (req, res, next) => {
    try {
      const createTableUsers = await migrationModel.createTableUsers()
      res.send({ createTableUsers })
    } catch (error) {
      next(error)
    }
  }
}
