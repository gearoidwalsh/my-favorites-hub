# Favorites Hub - Backend

A Node.js/Express API for managing your favorite content.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with these variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
ADMIN_PASSWORD=your_secure_password_here
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

- `GET /api/favorites` - Get all favorites (with optional filters)
- `GET /api/favorites/:id` - Get single favorite
- `POST /api/favorites` - Create new favorite (requires password)
- `PUT /api/favorites/:id` - Update favorite (requires password)
- `DELETE /api/favorites/:id` - Delete favorite (requires password)
- `POST /api/favorites/:id/like` - Like a favorite (public)
- `GET /api/health` - Health check

## Database Schema

```javascript
{
  title: String,
  category: String,
  description: String,
  youtubeUrl: String (optional),
  imageUrl: String (optional),
  tags: [String],
  likes: Number,
  createdAt: Date
}
```


