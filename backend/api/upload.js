const allowCors = require('../lib/cors');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    try {
        const { images } = req.body;

        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ success: 0, message: 'No images provided' });
        }

        // Upload each image to Cloudinary
        const uploadPromises = images.map(async (imageData) => {
            const result = await cloudinary.uploader.upload(imageData, {
                folder: 'products'
            });
            return result.secure_url;
        });

        const imageUrls = await Promise.all(uploadPromises);

        return res.status(200).json({ success: 1, image_urls: imageUrls });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ success: 0, message: 'Error uploading files' });
    }
}

module.exports = allowCors(handler);
