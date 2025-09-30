const express = require('express')
const router = express.Router()
const {SignupController} = require('../app/controllers/SignupController.js')

router.post('/', SignupController)

module.exports = router