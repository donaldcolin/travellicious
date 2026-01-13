const connectDB = require('../../lib/db');
const allowCors = require('../../lib/cors');
const Gallery = require('../../models/gallery');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function handler(req, res) {
    await connectDB();

    const { method } = req;

    // Parse the URL to determine action
    const urlParts = req.url.split('/').filter(Boolean);
    const lastPart = urlParts[urlParts.length - 1];

    // Check for specific routes
    const isCategories = lastPart === 'categories';
    const isCategoryRoute = urlParts.includes('category');
    const categoryName = isCategoryRoute ? urlParts[urlParts.indexOf('category') + 1] : null;
    const isIdRoute = lastPart && !isCategories && !isCategoryRoute && lastPart !== 'gallery';

    try {
        switch (method) {
            case 'GET':
                if (isCategories) {
                    // Get all categories with descriptions
                    const categories = await Gallery.aggregate([
                        {
                            $group: {
                                _id: '$category',
                                description: { $first: '$categoryDescription' },
                                count: { $sum: 1 }
                            }
                        },
                        {
                            $project: {
                                category: '$_id',
                                description: 1,
                                count: 1,
                                _id: 0
                            }
                        },
                        { $sort: { category: 1 } }
                    ]);
                    return res.status(200).json(categories);
                } else if (isCategoryRoute && categoryName) {
                    // Get images by category
                    const images = await Gallery.find({ category: categoryName }).sort({ createdAt: -1 });
                    return res.status(200).json(images);
                } else {
                    // Get all images
                    const images = await Gallery.find().sort({ createdAt: -1 });
                    return res.status(200).json(images);
                }

            case 'POST':
                // Upload new image - handle base64 encoded image data
                const { category, categoryDescription, imageData } = req.body;

                if (!imageData) {
                    return res.status(400).json({ message: 'No image data provided' });
                }

                // Upload to Cloudinary
                const uploadResult = await cloudinary.uploader.upload(imageData, {
                    folder: 'gallery'
                });

                const newImage = new Gallery({
                    category,
                    categoryDescription,
                    imageUrl: uploadResult.secure_url,
                    cloudinaryId: uploadResult.public_id
                });

                await newImage.save();
                return res.status(201).json(newImage);

            case 'PUT':
                if (isIdRoute) {
                    // Update image metadata
                    const { category: updateCategory, categoryDescription: updateDesc } = req.body;

                    const updatedImage = await Gallery.findByIdAndUpdate(
                        lastPart,
                        { category: updateCategory, categoryDescription: updateDesc },
                        { new: true }
                    );

                    if (!updatedImage) {
                        return res.status(404).json({ message: 'Image not found' });
                    }

                    return res.status(200).json(updatedImage);
                }
                break;

            case 'DELETE':
                if (isIdRoute) {
                    // Delete image
                    const image = await Gallery.findById(lastPart);

                    if (!image) {
                        return res.status(404).json({ message: 'Image not found' });
                    }

                    // Delete from Cloudinary
                    await cloudinary.uploader.destroy(image.cloudinaryId);

                    // Delete from database
                    await Gallery.findByIdAndDelete(lastPart);

                    return res.status(200).json({ message: 'Image deleted successfully' });
                }
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).json({ message: `Method ${method} Not Allowed` });
        }

        return res.status(404).json({ message: 'Endpoint not found' });
    } catch (error) {
        console.error('Gallery API error:', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}

module.exports = allowCors(handler);
