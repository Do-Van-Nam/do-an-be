const Review = require('../models/Review');
const VendorItem = require('../models/VendorItem');

// Lấy danh sách Reviews theo accId
const getReviewsByAccId = async (req, res) => {
    const { accId } = req.params;
    try {
        const reviews = await Review.find({ accId });
        if (!reviews.length) {
            return res.status(404).json({ message: 'No Reviews found for this account' });
        }
        res.json({ reviews });
    } catch (error) {
        console.error('Error fetching vendor items by accId:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
// Lấy danh sách Reviews theo accId
const getReviewsByVendorItemId = async (req, res) => {
    const { vendorItemId } = req.params;
    try {
        const reviews = await Review.find({ vendorItemId });
        if (!reviews.length) {
            return res.status(404).json({ message: 'No Reviews found for this account' });
        }
        res.json({ reviews });
    } catch (error) {
        console.error('Error fetching vendor items by accId:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
// Lấy thông tin Review theo id
const getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ review });
    } catch (error) {
        console.error('Error fetching vendor item by id:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Tạo mới Review
const createReview = async (req, res) => {
    const { vendorItemId, accId, review, rate ,name} = req.body;
    try {
        const existingReview = await Review.findOne({ vendorItemId,accId });
        if (existingReview) {
            return res.status(400).json({ message: 'Review already exists!' });
        }

        const newReview = new Review({ vendorItemId, accId, review, rate,name });

        await newReview.save();
        updateItemReviewStats(vendorItemId)
        res.status(201).json({ review: newReview });
    } catch (error) {
        console.error('Error creating vendor item:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Cập nhật thông tin Review theo id
const updateReview = async (req, res) => {
    const { id } = req.params;
    const { vendorItemId, accId, review,name,
        rate } = req.body;
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            {
                vendorItemId, accId, review,
                rate,name
            },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        updateItemReviewStats(vendorItemId)
        res.json({ updatedReview });
    } catch (error) {
        console.error('Error updating vendor item:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Xóa Review theo id
const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        updateItemReviewStats(deletedReview.vendorItemId)
        res.json({ message: 'Review successfully deleted', deletedReview });
    } catch (error) {
        console.error('Error deleting vendor item:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
const updateItemReviewStats = async (vendorItemId) => {
    try {
        const stats = await Review.aggregate([
            { $match: { vendorItemId } },
            {
                $group: {
                    _id: "$vendorItemId",
                    avgRating: { $avg: "$rate" },
                    noReview: { $sum: 1 },
                },
            },
        ])

        const { avgRating = 0, noReview = 0 } = stats[0] || {}

        await VendorItem.findByIdAndUpdate(vendorItemId, {
            rate: avgRating,
            noReview,
        })
    } catch (error) {
        console.error("Error updating review stats:", error)
    }
}
module.exports = {
    getReviewsByAccId,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    getReviewsByVendorItemId
};
