const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

//routes
const productRoutes = require("./routes/ProductRoutes");
const outingRoutes = require("./routes/Outingroutes");
const contactRoutes = require("./routes/ContactRoutes");
const userRoutes= require("./routes/UserRoutes")
const reviewRoutes = require("./routes/ReviewRoutes")

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Database connection
const username = process.env.MONGODB_USERNAME;
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const cluster = process.env.MONGODB_CLUSTER;
const database = process.env.MONGODB_DATABASE;

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${database}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage }).array("product", 5);

// Helper function to upload to Cloudinary
const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    const bufferStream = require('stream').Readable.from(file.buffer);
    bufferStream.pipe(uploadStream);
  });
};

app.post("/upload", upload, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: 0, message: "No files uploaded" });
    }

    const uploadPromises = req.files.map(file => uploadToCloudinary(file));
    const results = await Promise.all(uploadPromises);

    const imageUrls = results.map(result => result.secure_url);
    res.json({ success: 1, image_urls: imageUrls });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: 0, message: "Error uploading files" });
  }
});

// Routes
app.use("/api", productRoutes);       // Routes now start with /api/
app.use("/api", outingRoutes);
app.use("/api", contactRoutes);
app.use("/api", userRoutes);
app.use("/api", reviewRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
