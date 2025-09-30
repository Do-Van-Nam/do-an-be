const express = require('express')
const router = express.Router()
const {LoginController} = require('../app/controllers/LoginController.js')

router.post('/', LoginController)

module.exports = router