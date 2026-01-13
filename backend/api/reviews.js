const connectDB = require('../lib/db');
const allowCors = require('../lib/cors');
const Review = require('../models/Review');

async function handler(req, res) {
    await connectDB();

    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                // Get all reviews
                const reviews = await Review.find();
                return res.status(200).json({
                    message: 'Reviews retrieved successfully',
                    reviews: reviews
                });

            case 'POST':
                // Add new review
                const { name, review, rating } = req.body;

                const newReview = new Review({
                    name,
                    review,
                    rating
                });

                const savedReview = await newReview.save();

                return res.status(201).json({
                    message: 'Review added successfully',
                    review: savedReview
                });

            default:
                res.setHeader('Allow', ['GET', 'POST']);
                return res.status(405).json({ message: `Method ${method} Not Allowed` });
        }
    } catch (error) {
        console.error('Reviews API error:', error);
        return res.status(500).json({
            message: 'Error processing request',
            error: error.message
        });
    }
}

module.exports = allowCors(handler);
