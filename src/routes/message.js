const express = require('express')
const router = express.Router()
const {createMultipleMessages,getMessagesByChatRoomId, getMessagesByAccId,getMessageById, updateMessage, deleteMessage, createMessage } = require('../app/controllers/MessageController')
const {managerAuthMiddleware} = require('../app/middlewares/managerAuthMiddleware')
const {authMiddleware} = require('../app/middlewares/authMiddleware')

// router.get('/:id', getMessageById)
router.get('/accId/:accId',getMessagesByAccId)
router.get('/chatRoomId/:chatRoomId',getMessagesByChatRoomId)
router.post('/', createMessage)
router.post('/createMultipleMessages', createMultipleMessages)
router.put('/:id', updateMessage)
router.delete('/:id', deleteMessage)

module.exports = router