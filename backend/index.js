const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const productRoutes = require("./routes/ProductRoutes");
const outingRoutes = require("./routes/Outingroutes");
const contactRoutes = require("./routes/ContactRoutes");
const galleryRoutes = require("./routes/GalleryRoutes");

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Static folder for image uploads
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// Database connection
const encodedPassword = encodeURIComponent("Travel@5726");
mongoose
  .connect(
    `mongodb+srv://travellicious:${encodedPassword}@cluster0.3ra25.mongodb.net/travellicious?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Image upload setup
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage }).array("product", 5);

app.post("/upload", upload, (req, res) => {
  if (!req.files) {
    return res.status(400).json({ success: 0, message: "No files uploaded" });
  } 

  const imageUrls = req.files.map((file) => `http://localhost:${port}/images/${file.filename}`);
  res.json({ success: 1, image_urls: imageUrls });
});


// Routes
app.use("/", productRoutes);
app.use("/",outingRoutes);
app.use("/",contactRoutes);
app.use("/",galleryRoutes);



// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});