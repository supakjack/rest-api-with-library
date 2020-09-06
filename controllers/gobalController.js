const gobalModel = require('../models/gobalModel')
module.exports = {
  add: async (req, res, next) => {
    try {
      const table = req.body.table
      const doesInsert = await gobalModel.insert(table)
      res.send({ doesInsert })
    } catch (error) {
      next(error)
    }
  },
  select: async (req, res, next) => {
    try {
      const table = req.body.table
      const doesSelect = await gobalModel.select(table)
      res.send({ doesSelect })
    } catch (error) {
      next(error)
    }
  },
  update: async (req, res, next) => {
    try {
      const table = req.body.table
      const doesUpdate = await gobalModel.update(table)
      res.send({ doesUpdate })
    } catch (error) {
      next(error)
    }
  }
}
