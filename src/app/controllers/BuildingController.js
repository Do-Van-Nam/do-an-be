const Building = require('../models/Building')

const getBuildingsByOwnerId = async (req, res) => {
    const {ownerId}  = req.params
    try {
        const buildings = await Building.find({ownerId})
        res.json({ buildings: buildings })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
const getBuildingById = async (req, res) => {
    const id = req.params.id
    try {
        const building = await Building.findById(id)
        res.json({ building: building })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
const createBuilding = async (req, res) => {
    const { name, ownerId,address,noRoom,noFloor} = req.body
    try {
        let building = await Building.findOne({ name,address })
        if (building) {
            return res.status(400).json({ message: 'Building already exists!' })
        }

        building = new Building({
            name, ownerId,address,noRoom,noFloor
        })
        await building.save()
        res.json({building})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
const updateBuilding = async (req, res) => {
    const id = req.params.id
    let { name, ownerId,address,noRoom,noFloor } = req.body
    try {
        const updatedBuilding = {
            name, ownerId,address,noRoom,noFloor
        }

        const updatedBuilding1 = await Building.findByIdAndUpdate(id,updatedBuilding,{new : true})
        if(!updatedBuilding1){
        return res.status(404).json({ message: 'Building not found' })
        }
        return res.status(200).json({updatedBuilding1})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
const deleteBuilding  = async (req,res)=>{
    const id = req.params.id
    try {
        const deletedBuilding = await Building.findByIdAndDelete(id)
        if(!deletedBuilding){
            return res.status(404).json({message: 'Building not found'})
        }
        return res.status(200).json({deletedBuilding})

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

module.exports = { getBuildingsByOwnerId,getBuildingById, createBuilding , updateBuilding ,deleteBuilding }