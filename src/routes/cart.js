const express = require('express')
const router  = express.Router()
const {managerAuthMiddleware} = require('../app/middlewares/managerAuthMiddleware')
const {authMiddleware} = require('../app/middlewares/authMiddleware')
const { 
    getCartByAccId, 
    addToCart, 
    updateCartItemQuantity, 
    removeFromCart,
    clearCart 
} = require('../app/controllers/CartController');

router.get('/:accId', getCartByAccId);
router.post('/add', addToCart);
router.put('/update', updateCartItemQuantity);
router.delete('/remove', removeFromCart);
router.delete('/clear', clearCart);

module.exports = router