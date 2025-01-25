const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get("/allimages", (req, res) => {
    try {
        // Define the directory where images are stored
        const imageDirectory = path.join(__dirname, "../upload/images");
        
        // Log the full path for debugging
        console.log('Image Directory Path:', imageDirectory);

        // Read all files in the images directory
        fs.readdir(imageDirectory, (err, files) => {
            if (err) {
                console.error('Directory Read Error:', err);
                return res.status(500).json({ 
                    success: 0, 
                    message: "Failed to read image directory",
                    error: err.message,
                    path: imageDirectory
                });
            }

            // Filter for image files (you can expand this list)
            const imageFiles = files.filter(file => 
                ['.png', '.jpg', '.jpeg', '.gif', '.webp'].some(ext => 
                    file.toLowerCase().endsWith(ext)
                )
            );

            // Create full URLs for the images
            const imageUrls = imageFiles.map(file => 
                `http://localhost:${process.env.PORT || 4000}/upload/images/${file}`
            );

            res.json({ 
                success: 1, 
                image_urls: imageUrls,
                total_images: imageUrls.length
            });
        });
    } catch (error) {
        console.error('Catch Block Error:', error);
        res.status(500).json({ 
            success: 0, 
            message: "Failed to retrieve images",
            error: error.message 
        });
    }
});

module.exports = router;