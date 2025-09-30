const Message = require('../models/Message')

const getMessagesByAccId = async (req, res) => {
    const accId = req.params.accId
    try {
        let messages = await Message.find({ senderId: accId })
        return res.status(200).json({ messages })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
const getMessagesByChatRoomId = async (req, res) => {
    const chatRoomId = req.params.chatRoomId
    try {
        let messages = await Message.find({ chatRoomId })
        return res.status(200).json({ messages })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server error' })
    }
}
// Lấy thông tin Message theo id
const getMessageById = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.json({ message });
    } catch (error) {
        console.error('Error fetching vendor item by id:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Tạo mới Message
const createMessage = async (req, res) => {
    const { chatRoomId, senderId, content, createdAt } = req.body;
    try {
        const existingMessage = await Message.findOne({ chatRoomId, senderId,createdAt });
        if (existingMessage) {
            return res.status(400).json({ message: 'Message already exists!' });
        }

        const newMessage = new Message({ chatRoomId, senderId, content, createdAt });

        await newMessage.save();
        res.status(201).json({ message: newMessage });
    } catch (error) {
        console.error('Error creating vendor item:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Cập nhật thông tin Message theo id
const updateMessage = async (req, res) => {
    const { id } = req.params;
    const { chatRoomId, senderId, content, createdAt } = req.body;
    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { chatRoomId, senderId, content, createdAt },
            { new: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.json({ updatedMessage });
    } catch (error) {
        console.error('Error updating vendor item:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Xóa Message theo id
const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMessage = await Message.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.json({ message: 'Message successfully deleted', deletedMessage });
    } catch (error) {
        console.error('Error deleting vendor item:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
const createMultipleMessages = async (req, res) => {
    const { messages } = req.body 
        try {
        
        const createdMessages = await Message.insertMany(messages);

        return res.status(201).json({ messages: createdMessages });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Server error' });
    }
};

module.exports = {
    createMultipleMessages,
    getMessagesByChatRoomId,
    getMessagesByAccId,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
};
