const express = require('express')
const router = express.Router()
const { getBuildingsByOwnerId,getBuildingById, updateBuilding, deleteBuilding, createBuilding } = require('../app/controllers/BuildingController')
const {managerAuthMiddleware} = require('../app/middlewares/managerAuthMiddleware')

// router.get('/:id', getBuildingById)
router.get('/:ownerId',managerAuthMiddleware, getBuildingsByOwnerId)
router.post('/', createBuilding)
router.put('/:id',managerAuthMiddleware, updateBuilding)
router.delete('/:id',managerAuthMiddleware, deleteBuilding)

module.exports = router