const Guest = require('../models/Guest')

const getGuestByAccId=async (req,res)=>{
    const accId= req.params.accId
try {
    let guest = await Guest.findOne({ accId })
    if(!guest) return res.status(404).json({ guest: 'Guest not found' });
    return res.status(200).json({guest})
} catch (error) {
    console.log(error)
        return res.status(400).json({ guest: 'Server error' })
}
}

// Lấy thông tin Guest theo id
const getGuestById = async (req, res) => {
    const { id } = req.params;
    try {
        const guest = await Guest.findById(id);
        if (!guest) {
            return res.status(404).json({ guest: 'Guest not found' });
        }
        res.json({ guest });
    } catch (error) {
        console.error('Error fetching vendor item by id:', error);
        return res.status(500).json({ guest: 'Server error' });
    }
};

// Tạo mới Guest
const createGuest = async (req, res) => {
    const {accId} = req.params
    const { guestList } = req.body;
    try {
        const existingGuest = await Guest.findOne({  accId });
        if (existingGuest) {
            existingGuest.guestList.push(...guestList)
            await existingGuest.save();
            return res.status(200).json({ message: 'Guests added successfully', guest: existingGuest });
        }else{
            const newGuest = new Guest({accId,    guestList });
            await newGuest.save();
            res.status(201).json({ guest: newGuest });
        }
    } catch (error) {
        console.error('Error creating vendor item:', error);
        return res.status(500).json({ guest: 'Server error' });
    }
};

// Cập nhật thông tin Guest theo id
const updateGuest = async (req, res) => {
    const { id } = req.params;
    const {accId,    guestList } = req.body;
    try {
        const updatedGuest = await Guest.findByIdAndUpdate(
            id,
            {accId,    guestList },
            { new: true }
        );

        if (!updatedGuest) {
            return res.status(404).json({ guest: 'Guest not found' });
        }

        res.json({ updatedGuest });
    } catch (error) {
        console.error('Error updating vendor item:', error);
        return res.status(500).json({ guest: 'Server error' });
    }
};
const updateOneGuest = async (req, res) => {
    const { accId } = req.params;          // id của guest
    const { id, guest } = req.body; // accId của user và thông tin guest cần update
    try {
        const existingGuest = await Guest.findOne({ accId });

        if (!existingGuest) {
            return res.status(404).json({ guest: 'Guest not found' });
        }

        // Find and update the specific guest in guestList array
        const guestIndex = existingGuest.guestList.findIndex(g => g._id.toString() === id);
        
        if (guestIndex === -1) {
            return res.status(404).json({ guest: 'Guest not found in list' });
        }

        existingGuest.guestList[guestIndex] = {
            ...existingGuest.guestList[guestIndex],
            ...guest
        };

        await existingGuest.save();

        res.json({ 
            message: 'Guest updated successfully',updatedGuest: guest})} catch (error) {
                console.error('Error updating guest:', error);
        return res.status(500).json({ guest: 'Server error' });
            }}

// Xóa Guest theo id
const deleteGuest = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedGuest = await Guest.findByIdAndDelete(id);

        if (!deletedGuest) {
            return res.status(404).json({ guest: 'Guest not found' });
        }

        res.json({ guest: 'Guest successfully deleted', deletedGuest });
    } catch (error) {
        console.error('Error deleting vendor item:', error);
        return res.status(500).json({ guest: 'Server error' });
    }
};
const deleteOneGuest = async (req, res) => {
    const { accId } = req.params;        
    const { id } = req.body;       
    try {
        const existingGuest = await Guest.findOne({ accId });

        if (!existingGuest) {
            return res.status(404).json({ message: 'Guest document not found' });
        }

        // Tìm và xóa guest cụ thể trong guestList array
        const guestIndex = existingGuest.guestList.findIndex(g => g._id.toString() === id);
        
        if (guestIndex === -1) {
            return res.status(404).json({ message: 'Guest not found in list' });
        }

        // Xóa guest khỏi mảng
        existingGuest.guestList.splice(guestIndex, 1);

        // Lưu thay đổi
        await existingGuest.save();

        res.json({ 
            message: 'Guest deleted successfully',
            remainingGuests: existingGuest.guestList
        });

    } catch (error) {
        console.error('Error deleting guest:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {
    getGuestByAccId,
    getGuestById,
    createGuest,
    updateGuest,
    deleteGuest,
    deleteOneGuest,
    updateOneGuest
};
