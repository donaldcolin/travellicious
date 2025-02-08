const express = require('express');
const router = express.Router();
const Review = require("../models/Review");

router.post('/addreview', async (req, res) => {
    try {
        const { name, review, rating } = req.body;

        // Create new review instance
        const newReview = new Review({
            name,
            review,
            rating
        });

        // Save review to database
        const savedReview = await newReview.save();

        res.status(201).json({
            message: 'Review added successfully',
            review: savedReview
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding review',
            error: error.message
        });
    }
}
) 
router.get('/getreviews', async (req, res) => {
    try {
        // Fetch all reviews from database
        const reviews = await Review.find();

        res.status(200).json({
            message: 'Reviews retrieved successfully',
            reviews: reviews
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving reviews',
            error: error.message
        });
    }
});
;

module.exports = router;