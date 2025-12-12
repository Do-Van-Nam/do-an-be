const express = require('express')
const router = express.Router()
const { getReviewsByAccId,getReviewById, updateReview, deleteReview, createReview,getReviewsByVendorItemId } = require('../app/controllers/ReviewController')
const {managerAuthMiddleware} = require('../app/middlewares/managerAuthMiddleware')
const {authMiddleware} = require('../app/middlewares/authMiddleware')

// router.get('/:id', getReviewById)
router.get('/:vendorItemId',getReviewsByVendorItemId)
//router.get('/:accId',getReviewsByAccId)
router.post('/', createReview)
router.put('/:id', updateReview)
router.delete('/:id', deleteReview)

module.exports = router