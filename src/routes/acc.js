const express = require('express')
const router  = express.Router()
const {getAccById,updateAccountField,getAccs,createAcc,updateAcc,deleteAcc,checkAuth} = require('../app/controllers/AccountController')
const {managerAuthMiddleware} = require('../app/middlewares/managerAuthMiddleware')
const {authMiddleware} = require('../app/middlewares/authMiddleware')
 
router.get('/check-auth',authMiddleware, checkAuth)
router.get('/id/:accId',getAccById )
router.get('/getAllAcc',authMiddleware,getAccs)
router.post('/',createAcc)
router.put('/updateField/:accId',updateAccountField)
router.put('/id/:id',managerAuthMiddleware,updateAcc)
router.delete('/:id',managerAuthMiddleware,deleteAcc)

module.exports = router