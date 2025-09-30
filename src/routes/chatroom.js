const express = require('express')
const router = express.Router()
const { getChatRoomByAccId,getChatRoomById, updateChatRoom, deleteChatRoom, createChatRoom } = require('../app/controllers/ChatRoomController')
const {managerAuthMiddleware} = require('../app/middlewares/managerAuthMiddleware')
const {authMiddleware} = require('../app/middlewares/authMiddleware')

// router.get('/:id', getChatRoomById)
router.get('/:accId',getChatRoomByAccId)
router.post('/', createChatRoom)
router.put('/:id', updateChatRoom)
router.delete('/:id', deleteChatRoom)

module.exports = router