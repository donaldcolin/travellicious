const express = require('express');
const router = express.Router();
const multer = require('multer');
const galleryController = require('../controllers/galleryController');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
router.get('/gallery', galleryController.getAllImages);
router.post('/gallery', upload.single('image'), galleryController.uploadImage);
router.put('/gallery/:id', galleryController.updateImage);
router.delete('/gallery/:id', galleryController.deleteImage);

module.exports = router;
