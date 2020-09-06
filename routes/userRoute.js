const express = require('express')
const router = express.Router()
const userController = require('./../controllers/userController')

router.post('/add', userController.add)
router.post('/select', userController.select)
router.post('/update', userController.update)
router.post('/remove', userController.remove)

module.exports = router
