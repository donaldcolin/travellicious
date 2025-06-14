const Gallery = require('../models/gallery');
const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

// Get all gallery images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload new image
exports.uploadImage = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Convert buffer to stream
    const stream = Readable.from(file.buffer);

    // Upload to Cloudinary using stream
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'gallery' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.pipe(uploadStream);
    });

    const result = await uploadPromise;

    const newImage = new Gallery({
      title,
      description,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update image
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    const updatedImage = await Gallery.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete image
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Gallery.findById(id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.cloudinaryId);
    
    // Delete from database
    await Gallery.findByIdAndDelete(id);
    
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 