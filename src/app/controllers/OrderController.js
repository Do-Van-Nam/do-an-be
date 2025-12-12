const Order = require('../models/Order')

// LẤY ORDER THEO accId
const getOrderByAccId = async (req, res) => {
    try {
        const { accId } = req.params

        const order = await Order.findOne({ accId })

        if (!order) {
            return res.status(200).json({ order: { accId, items: [] } })
        }

        return res.status(200).json({ order })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
}

// THÊM SẢN PHẨM VÀO ORDER (nếu chưa có thì tạo mới)
const addToOrder = async (req, res) => {
    try {
        const { accId, itemId, quantity = 1, price = 0 } = req.body

        if (!accId || !itemId) {
            return res.status(400).json({ message: 'Missing accId or itemId' })
        }

        let order = await Order.findOne({ accId })

        if (!order) {
            order = new Order({
                accId,
                items: [{ itemId, quantity, price }]
            })
            await order.save()
            return res.status(201).json({ message: 'Order created and item added', order })
        }

        const existingItem = order.items.find(item => item.itemId === itemId)

        if (existingItem) {
            existingItem.quantity += quantity
            existingItem.price = price || existingItem.price
        } else {
            order.items.push({ itemId, quantity, price })
        }

        await order.save()
        return res.status(200).json({ message: 'Item added to order', order })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
}

// THÊM NHIỀU SẢN PHẨM VÀO ORDER (nhận mảng items trong body)
const addManyToOrder = async (req, res) => {
    try {
        const { accId, items = [] } = req.body

        if (!accId || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Missing accId or items' })
        }

        let order = await Order.findOne({ accId })

        if (!order) {
            order = new Order({
                accId,
                items: items.map(({ itemId, quantity = 1, price = 0 }) => ({
                    itemId,
                    quantity,
                    price,
                })),
            })
            await order.save()
            return res.status(201).json({ message: 'Order created and items added', order })
        }

        // Gộp theo itemId
        items.forEach(({ itemId, quantity = 1, price = 0 }) => {
            if (!itemId) return
            const existingItem = order.items.find(item => item.itemId === itemId)
            if (existingItem) {
                existingItem.quantity += quantity
                existingItem.price = price || existingItem.price
            } else {
                order.items.push({ itemId, quantity, price })
            }
        })

        await order.save()
        return res.status(200).json({ message: 'Items added to order', order })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {
    getOrderByAccId,
    addToOrder,
    addManyToOrder,
}