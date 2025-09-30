const express = require('express')
const router = express.Router()
const {updateOneGuest,deleteOneGuest, getGuestByAccId,getGuestById, updateGuest, deleteGuest, createGuest } = require('../app/controllers/GuestController')
const {managerAuthMiddleware} = require('../app/middlewares/managerAuthMiddleware')
const {authMiddleware} = require('../app/middlewares/authMiddleware')

// router.get('/:id', getGuestById)
router.get('/:accId',getGuestByAccId)
router.post('/:accId', createGuest)
router.put('/guestid/:id', updateGuest)
router.put('/updateOneGuest/:accId', updateOneGuest)
router.delete('/deleteOneGuest/:accId', deleteOneGuest)
router.delete('/deleteguest/:id', deleteGuest)

module.exports = router