// 1️⃣ Load environment variables
require('dotenv').config();

// 2️⃣ Import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// 3️⃣ Create app
const app = express();

// 4️⃣ Middlewares
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'https://aerospire.vercel.app', 
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl) or matching origins
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 📂 Ensure uploads directory exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// 📦 Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// 5️⃣ Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

// 6️⃣ Use routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

// 🚀 Image Upload Route
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const protocol = req.protocol;
  const host = req.get('host');
  const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
  res.json({ imageUrl: fileUrl });
});

// 7️⃣ Basic route
app.get('/', (req, res) => {
  res.send('Backend running 🚀');
});

// 8️⃣ Import middlewares
const authMiddleware = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware');

// 9️⃣ Protected Admin Dashboard
app.get(
  '/api/admin/dashboard',
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      msg: "Welcome Admin 🔥",
      userId: req.user?.id,
      role: req.user?.role
    });
  }
);

// 🔟 MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    console.log('MongoDB Connected ✅');

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });

  })
  .catch(err => {
    console.error('MongoDB Connection Error ❌:', err.message);
  });