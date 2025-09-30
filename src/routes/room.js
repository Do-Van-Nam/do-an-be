const express = require('express')
const router = express.Router()
const {deleteRoomByBuildingId,deleteRoomOnOneFloor, getRoomsByBuildingId,getRoomById, updateRoom, deleteRoom, createRoom,quickCreateRooms } = require('../app/controllers/RoomController')
const {managerAuthMiddleware} = require('../app/middlewares/managerAuthMiddleware')

// router.get('/:id', getRoomById)
router.get('/:buildingId', getRoomsByBuildingId)
router.put('/:id', updateRoom)
router.post('/', createRoom)
router.post('/quickCreate',managerAuthMiddleware, quickCreateRooms)
router.delete('/:buildingId/:floor',managerAuthMiddleware, deleteRoomOnOneFloor)
router.delete('/:buildingId',managerAuthMiddleware, deleteRoomByBuildingId)
// router.delete('/:id', deleteRoom)

module.exports = router