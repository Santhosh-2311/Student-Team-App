const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
}).single('image');

// MongoDB connection with better error handling
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student-team', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit if cannot connect to MongoDB
});

// Define Member Schema
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  year: { type: String, required: true },
  degree: { type: String, required: true },
  role: { type: String, required: true },
  aboutProject: { type: String, required: true },
  certificate: { type: String },
  aboutYourself: { type: String, required: true },
  github: { type: String },
  linkedin: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Member = mongoose.model('Member', memberSchema);

// Routes with better error handling
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ 
      message: 'Error fetching members',
      error: error.message 
    });
  }
});

app.post('/api/members', async (req, res) => {
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(400).json({ 
        message: 'File upload error',
        error: err.message 
      });
    } else if (err) {
      console.error('Unknown error:', err);
      return res.status(400).json({ 
        message: 'Unknown error occurred',
        error: err.message 
      });
    }

    try {
      // Validate required fields
      const requiredFields = ['name', 'rollNumber', 'year', 'degree', 'role', 'aboutProject', 'aboutYourself'];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          throw new Error(`${field} is required`);
        }
      }

      const memberData = {
        ...req.body,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null
      };

      // Check if roll number already exists
      const existingMember = await Member.findOne({ rollNumber: memberData.rollNumber });
      if (existingMember) {
        return res.status(400).json({ 
          message: 'A member with this roll number already exists' 
        });
      }

      const member = new Member(memberData);
      await member.save();
      res.status(201).json(member);
    } catch (error) {
      console.error('Error saving member:', error);
      res.status(400).json({ 
        message: 'Error saving member',
        error: error.message 
      });
    }
  });
});

app.get('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    console.error('Error fetching member:', error);
    res.status(500).json({ 
      message: 'Error fetching member',
      error: error.message 
    });
  }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: err.message 
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}); 