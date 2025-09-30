const ChatRoom = require('../models/ChatRoom')
const Account = require('../models/Account')


const getChatRoomByAccId = async (req, res) => {
    const {accId} = req.params 
    try { 
        let chatrooms = await ChatRoom.find({ $or: [{ user1Id: accId }, { user2Id: accId }] })
 
        const otherUsers = chatrooms.map((chatroom) => ({
            userId: chatroom.user1Id === accId ? chatroom.user2Id : chatroom.user1Id,
            chatRoomId: chatroom._id
        })).filter(Boolean);
 
        const userPromises = otherUsers.map(e => Account.findById(e.userId))
        var userData = await Promise.all(userPromises)
        userData = userData.map((e, i) => {
            e = e.toObject()
            e.chatRoomId = otherUsers[i].chatRoomId
            return e
        } )
        return res.status(200).json({ users: userData })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}

// Lấy thông tin ChatRoom theo id
const getChatRoomById = async (req, res) => {
    const { id } = req.params;
    try {
        const chatroom = await ChatRoom.findById(id);
        if (!chatroom) {
            return res.status(404).json({ message: 'ChatRoom not found' });
        }
        res.json({ chatroom });
    } catch (error) {
        console.error('Error fetching vendor item by id:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Tạo mới ChatRoom
const createChatRoom = async (req, res) => {
    const { user1Id, user2Id } = req.body;
    try {
        const existingChatRoom = await ChatRoom.findOne({ user1Id, user2Id });
        if (existingChatRoom) {
            return res.status(400).json({ message: 'ChatRoom already exists!' });
        }

        const newChatRoom = new ChatRoom({ user1Id, user2Id });

        await newChatRoom.save();
        res.status(201).json({ chatroom: newChatRoom });
    } catch (error) {
        console.error('Error creating vendor item:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Cập nhật thông tin ChatRoom theo id
const updateChatRoom = async (req, res) => {
    const { id } = req.params;
    const { user1Id, user2Id } = req.body;
    try {
        const updatedChatRoom = await ChatRoom.findByIdAndUpdate(
            id,
            { user1Id, user2Id },
            { new: true }
        );

        if (!updatedChatRoom) {
            return res.status(404).json({ message: 'ChatRoom not found' });
        }

        res.json({ updatedChatRoom });
    } catch (error) {
        console.error('Error updating vendor item:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Xóa ChatRoom theo id
const deleteChatRoom = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedChatRoom = await ChatRoom.findByIdAndDelete(id);

        if (!deletedChatRoom) {
            return res.status(404).json({ message: 'ChatRoom not found' });
        }

        res.json({ message: 'ChatRoom successfully deleted', deletedChatRoom });
    } catch (error) {
        console.error('Error deleting vendor item:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getChatRoomByAccId,
    getChatRoomById,
    createChatRoom,
    updateChatRoom,
    deleteChatRoom
};
