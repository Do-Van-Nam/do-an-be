const express = require('express')
const router  = express.Router()
const {managerAuthMiddleware} = require('../app/middlewares/managerAuthMiddleware')
const {authMiddleware} = require('../app/middlewares/authMiddleware')
const { 
    getOrderByAccId, 
    addToOrder, 
    addManyToOrder, 
} = require('../app/controllers/OrderController');

router.get('/:accId', getOrderByAccId);
router.post('/add', addToOrder);
router.post('/add-many', addManyToOrder);

module.exports = router