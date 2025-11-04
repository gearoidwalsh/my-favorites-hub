# 🌟 My Favorites Hub

A full-stack web application to showcase and curate your favorite content - videos, music, inspiration, and more!

## Features

- 🎥 **YouTube Video Embedding** - Showcase your favorite videos
- 📱 **Responsive Design** - Works beautifully on all devices
- 🔍 **Search & Filter** - Find favorites by category or keywords
- ❤️ **Like System** - Visitors can like their favorite items
- 🔐 **Admin Panel** - Password-protected content management
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations

## Tech Stack

**Frontend:**
- React 18
- CSS3 with modern animations
- Responsive grid layout

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API

## Project Structure

```
my-favorites-hub/
├── backend/          # Node.js/Express API
│   ├── server.js     # Main server file
│   ├── package.json
│   └── .env          # Environment variables (create this)
├── frontend/         # React application
│   ├── public/
│   ├── src/
│   │   ├── App.js    # Main component
│   │   ├── App.css   # Styles
│   │   └── index.js  # Entry point
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account (free tier on MongoDB Atlas)
- npm or yarn

### Setup Instructions

#### 1. Set Up MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string

#### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file with:
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string
# ADMIN_PASSWORD=your_secure_password

npm run dev
```

Backend will run on http://localhost:5000

#### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run on http://localhost:3000

## Usage

1. **View Favorites**: Browse the gallery, filter by category, or search
2. **Like Favorites**: Click the heart button (no password needed)
3. **Add Content**: Click "Admin Panel", enter your password, and add new favorites

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Create account on [Render](https://render.com)
3. Create new Web Service
4. Connect your GitHub repo
5. Add environment variables
6. Deploy!

### Frontend (Vercel)
1. Create account on [Vercel](https://vercel.com)
2. Import your GitHub repo
3. Add environment variable: `REACT_APP_API_URL=your_backend_url`
4. Deploy!

## API Endpoints

- `GET /api/favorites` - Get all favorites
- `GET /api/favorites/:id` - Get single favorite
- `POST /api/favorites` - Create favorite (requires password)
- `PUT /api/favorites/:id` - Update favorite (requires password)
- `DELETE /api/favorites/:id` - Delete favorite (requires password)
- `POST /api/favorites/:id/like` - Like a favorite

## Demo Video Tips

1. Show the homepage with your favorites
2. Demonstrate filtering by category
3. Use the search feature
4. Show a YouTube video playing
5. Like a favorite
6. Open admin panel and add a new favorite
7. Show it appearing in the gallery

## Future Enhancements

- User authentication
- Comments on favorites
- Social sharing
- Dark mode
- More media types (Spotify, SoundCloud, etc.)

## License

MIT

---

Built with ❤️ as a full-stack learning project



