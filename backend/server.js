const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/favorites-hub';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Favorite Schema
const favoriteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  youtubeUrl: { type: String },
  imageUrl: { type: String },
  tags: [String],
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

// ===== API ROUTES =====

// GET all favorites
app.get('/api/favorites', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const favorites = await Favorite.find(query).sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
});

// GET single favorite by ID
app.get('/api/favorites/:id', async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorite', error: error.message });
  }
});

// POST new favorite (with simple password protection)
app.post('/api/favorites', async (req, res) => {
  try {
    const { password, ...favoriteData } = req.body;
    
    // Simple admin password check
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Unauthorized: Invalid password' });
    }
    
    const favorite = new Favorite(favoriteData);
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(400).json({ message: 'Error creating favorite', error: error.message });
  }
});

// PUT update favorite
app.put('/api/favorites/:id', async (req, res) => {
  try {
    const { password, ...favoriteData } = req.body;
    
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Unauthorized: Invalid password' });
    }
    
    const favorite = await Favorite.findByIdAndUpdate(
      req.params.id,
      favoriteData,
      { new: true, runValidators: true }
    );
    
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    
    res.json(favorite);
  } catch (error) {
    res.status(400).json({ message: 'Error updating favorite', error: error.message });
  }
});

// DELETE favorite
app.delete('/api/favorites/:id', async (req, res) => {
  try {
    const { password } = req.body;
    
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Unauthorized: Invalid password' });
    }
    
    const favorite = await Favorite.findByIdAndDelete(req.params.id);
    
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    
    res.json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting favorite', error: error.message });
  }
});

// POST like a favorite (no password needed for public interaction)
app.post('/api/favorites/:id/like', async (req, res) => {
  try {
    const favorite = await Favorite.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Error liking favorite', error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Favorites Hub API is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


