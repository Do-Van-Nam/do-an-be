const Cart = require('../models/Cart');

// 1. LẤY CART THEO accId
const getCartByAccId = async (req, res) => {
    try {
        const { accId } = req.params; // hoặc req.query.accId tùy cách bạn gửi

        const cart = await Cart.findOne({ accId });

        if (!cart) {
            return res.status(200).json({ cart: { accId, vendors: [] } }); // trả về cart rỗng nếu chưa có
        }

        return res.status(200).json({ cart });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// 2. THÊM / CẬP NHẬT SẢN PHẨM VÀO CART (nếu chưa có cart thì tạo mới)
const addToCart = async (req, res) => {
    try {
        const { accId, vendorId, quantity = 1 } = req.body;

        if (!accId || !vendorId) {
            return res.status(400).json({ message: 'Missing accId or vendorId' });
        }

        // Tìm cart hiện tại
        let cart = await Cart.findOne({ accId });

        if (!cart) {
            // Tạo cart mới nếu chưa có
            cart = new Cart({
                accId,
                vendors: [{ vendorId, quantity }]
            });
            await cart.save();
            return res.status(201).json({ message: 'Cart created and item added', cart });
        }

        // Kiểm tra xem vendorId đã tồn tại chưa
        const existingItem = cart.vendors.find(item => item.vendorId === vendorId);

        if (existingItem) {
            // Nếu đã có thì cộng dồn số lượng
            existingItem.quantity += quantity;
        } else {
            // Nếu chưa có thì thêm mới
            cart.vendors.push({ vendorId, quantity });
        }

        await cart.save();
        return res.status(200).json({ message: 'Item added to cart', cart });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// 3. CẬP NHẬT SỐ LƯỢNG CỦA MỘT SẢN PHẨM TRONG CART
const updateCartItemQuantity = async (req, res) => {
    try {
        const { accId, vendorId, quantity } = req.body;

        if (!accId || !vendorId || quantity < 0) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        const cart = await Cart.findOne({ accId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.vendors.find(v => v.vendorId === vendorId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        if (quantity === 0) {
            // Nếu quantity = 0 thì xóa luôn item
            cart.vendors = cart.vendors.filter(v => v.vendorId !== vendorId);
        } else {
            item.quantity = quantity;
        }

        await cart.save();
        return res.status(200).json({ message: 'Cart updated', cart });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// 4. XÓA MỘT SẢN PHẨM KHỎI CART
const removeFromCart = async (req, res) => {
    try {
        const { accId, vendorId } = req.body; // hoặc dùng req.params

        if (!accId || !vendorId) {
            return res.status(400).json({ message: 'Missing accId or vendorId' });
        }

        const cart = await Cart.findOne({ accId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const initialLength = cart.vendors.length;
        cart.vendors = cart.vendors.filter(v => v.vendorId !== vendorId);

        if (cart.vendors.length === initialLength) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Nếu giỏ hàng trống hoàn toàn thì có thể xóa luôn document (tùy yêu cầu)
        if (cart.vendors.length === 0) {
            await Cart.deleteOne({ accId });
            return res.status(200).json({ message: 'Item removed and cart deleted (empty)' });
        }

        await cart.save();
        return res.status(200).json({ message: 'Item removed from cart', cart });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// 5. (TÙY CHỌN) XÓA TOÀN BỘ CART
const clearCart = async (req, res) => {
    try {
        const { accId } = req.body;

        const result = await Cart.deleteOne({ accId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getCartByAccId,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart
};