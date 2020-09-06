const express = require('express')
const router = express.Router()
const gobalController = require('./../controllers/gobalController')

router.post('/add', gobalController.add)
router.post('/select', gobalController.select)
router.post('/update', gobalController.update)

module.exports = router
