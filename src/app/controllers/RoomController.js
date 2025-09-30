const Room = require('../models/Room')

const getRoomsByBuildingId = async (req, res) => {
    const { buildingId } = req.params
    try {
        const rooms = await Room.find({ buildingId })
        res.json({ rooms: rooms })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
const getRoomById = async (req, res) => {
    const id = req.params.id
    try {
        const room = await Room.findById(id)
        res.json({ room: room })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
const createRoom = async (req, res) => {
    const { roomName,tenantId,buildingId,floor,isRented,price,startday,noPrepaidMonths } = req.body
    try {
        let room = await Room.findOne({ roomName, buildingId })
        if (room) {
            return res.status(400).json({ message: 'Room already exists!' })
        }

        room = new Room({
            roomName,tenantId,buildingId,floor,isRented,price,startday,noPrepaidMonths
        })
        await room.save()
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
const quickCreateRooms = async (req, res) => {
    const { noFloor,noRoomPerFloor, price,buildingId} = req.body
    try {
        let rooms=[]
        for (let i = 1; i <= noFloor; i++) { 
            for (let j = 1; j <= noRoomPerFloor; j++) { 
                let roomName= j < 10 ? `${i}0${j}` : `${i}${j}`
                let roomExists = await Room.findOne({buildingId,roomName})
                if(!roomExists){
                    
                    rooms.push({
                    roomName, 
                    tenantId: null,
                    buildingId: buildingId,
                    floor: i, 
                    isRented:false,price:price,startday:null,noPrepaidMonths:0
                })
                }
                else console.log(roomExists) 
                
                
            }
        }
        await Room.insertMany(rooms)
        return res.status(201).json({ message: 'Rooms created successfully!' });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
const updateRoom = async (req, res) => {
    const id = req.params.id
    let { roomName,tenantId,buildingId,floor,isRented,price,startday,noPrepaidMonths } = req.body
    try {
        const updatedRoom = {
            roomName,tenantId,buildingId,floor,isRented,price,startday,noPrepaidMonths
        }

        const updatedRoom1 = await Room.findByIdAndUpdate(id, updatedRoom, { new: true })
        if (!updatedRoom1) {
            return res.status(404).json({ message: 'Room not found' })
        }
        return res.status(200).json(updatedRoom1)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
const deleteRoom = async (req, res) => {
    const id = req.params.id
    try {
        const deletedRoom = await Room.findByIdAndDelete(id)
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' })
        }
        return res.status(200).json({ message: 'Room deleted successfully!' })

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}
const deleteRoomOnOneFloor = async (req, res) => {
    const {buildingId,floor} = req.params
    try {
        const deletedRoom = await Room.deleteMany({buildingId:buildingId,floor:floor})
        if (deletedRoom.deletedCount===0) {
            return res.status(404).json({ message: 'Room not found' })
        }
        return res.status(200).json({ message: 'Room deleted successfully!' })

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}
const deleteRoomByBuildingId = async (req, res) => {
    const {buildingId} = req.params
    try {
        const deletedRoom = await Room.deleteMany({buildingId})
        if (deletedRoom.deletedCount===0) {
            return res.status(404).json({ message: 'Room not found' })
        }
        return res.status(200).json({ message: 'Room deleted successfully!' })

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

module.exports = {deleteRoomByBuildingId,deleteRoomOnOneFloor, getRoomsByBuildingId, getRoomById, createRoom,quickCreateRooms, updateRoom, deleteRoom }