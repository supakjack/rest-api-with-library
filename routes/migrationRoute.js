const express = require('express')
const router = express.Router()
const migrationController = require('../controllers/migrationController')

router.post('/clear', migrationController.dropTable)
router.get('/createUser', migrationController.createTableUsers)

module.exports = router
