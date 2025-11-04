import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Movie data with posters
const MOVIES = [
  { title: 'Interstellar', year: 2014, poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg' },
  { title: 'Whiplash', year: 2014, poster: 'https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg' },
  { title: 'Spirited Away', year: 2001, poster: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg' },
  { title: 'The Grand Budapest Hotel', year: 2014, poster: 'https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg' },
  { title: 'Fantastic Mr. Fox', year: 2009, poster: 'https://m.media-amazon.com/images/M/MV5BMTYzNDc2MDc0N15BMl5BanBnXkFtZTcwMzQ2MTc0Mg@@._V1_SX300.jpg' },
  { title: 'The Shawshank Redemption', year: 1994, poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg' },
  { title: 'Blade Runner 2049', year: 2017, poster: 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg' },
  { title: 'Aftersun', year: 2022, poster: 'https://m.media-amazon.com/images/M/MV5BZmZmODVmNzktMDZkYy00MzMzLTgxMDMtNWQ4NDA1ZGRmYzE0XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_SX300.jpg' },
  { title: 'No Country for Old Men', year: 2007, poster: 'https://m.media-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_SX300.jpg' },
  { title: 'Catch Me If You Can', year: 2002, poster: 'https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_SX300.jpg' },
  { title: 'Moonlight', year: 2016, poster: 'https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_SX300.jpg' },
  { title: 'Babylon', year: 2022, poster: 'https://m.media-amazon.com/images/M/MV5BNjI0NDYwMzgtN2Q2Yy00ZGM4LTk3ZWMtNzE1ZmJkNmQzMGQ2XkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_SX300.jpg' },
  { title: 'The Godfather', year: 1972, poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg' },
  { title: 'The Godfather Part II', year: 1974, poster: 'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg' },
  { title: 'Manchester by the Sea', year: 2016, poster: 'https://m.media-amazon.com/images/M/MV5BMTYxMjk0NDg4Ml5BMl5BanBnXkFtZTgwODcyNjA5OTE@._V1_SX300.jpg' },
  { title: 'Pulp Fiction', year: 1994, poster: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg' },
  { title: 'Dead Poets Society', year: 1989, poster: 'https://m.media-amazon.com/images/M/MV5BOGYwYWNjMzgtNGU4ZC00NWQ2LWEwZjUtMzE1Zjc3NjY3YTU1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg' },
  { title: 'Parasite', year: 2019, poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg' },
  { title: 'Gone Girl', year: 2014, poster: 'https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_SX300.jpg' },
  { title: 'Prisoners', year: 2013, poster: 'https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTcwNDc3MzM5OQ@@._V1_SX300.jpg' },
  { title: 'Coco', year: 2017, poster: 'https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkMDE3ZjAxXkEyXkFqcGdeQXVyODIxMzk5NjA@._V1_SX300.jpg' },
  { title: 'The Thing', year: 1982, poster: 'https://m.media-amazon.com/images/M/MV5BNGViZWZmM2EtNGYzZi00ZDAyLTk3ODMtNzIyZTBjN2Y1NmM1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg' },
  { title: 'In the Mood for Love', year: 2000, poster: 'https://m.media-amazon.com/images/M/MV5BYWVjNjMwZTgtMGYyYy00NmVhLWE1NDItMzFhMmJkYTNjYWIwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg' },
  { title: 'Training Day', year: 2001, poster: 'https://m.media-amazon.com/images/M/MV5BOTc4NDQzODkxM15BMl5BanBnXkFtZTcwNzEzNjUxNA@@._V1_SX300.jpg' },
  { title: 'Arrival', year: 2016, poster: 'https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX300.jpg' },
];

function App() {
  const [favorites, setFavorites] = useState([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState('favorites'); // favorites, photos, movies

  // Fetch favorites on component mount
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/favorites`);
      const data = await response.json();
      // Ensure data is an array before setting
      setFavorites(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setFavorites([]); // Set empty array on error
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    
    // Extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    
    return null;
  };

  const handleFavoriteAdded = () => {
    fetchFavorites();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    <div className="App">
      {showConfetti && <Confetti />}
      
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1 className="title">My Curated Gallery</h1>
          <p className="subtitle">A Personal Collection</p>
          <div className="divider"></div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="navigation">
        <div className="container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              Favorites
            </button>
            <button 
              className={`tab ${activeTab === 'photos' ? 'active' : ''}`}
              onClick={() => setActiveTab('photos')}
            >
              Personal Photos
            </button>
            <button 
              className={`tab ${activeTab === 'movies' ? 'active' : ''}`}
              onClick={() => setActiveTab('movies')}
            >
              Favorite Films
            </button>
          </div>
        </div>
      </nav>

      {/* Admin Button - Only show on Favorites tab */}
      {activeTab === 'favorites' && (
        <div className="admin-section">
          <button
            className="admin-btn"
            onClick={() => setShowAdminPanel(!showAdminPanel)}
          >
            {showAdminPanel ? 'Close Curator Panel' : 'Curator Panel'}
          </button>
        </div>
      )}

      {/* Admin Panel */}
      {showAdminPanel && (
        <AdminPanel
          onClose={() => setShowAdminPanel(false)}
          onFavoriteAdded={handleFavoriteAdded}
          apiUrl={API_URL}
        />
      )}

      {/* Gallery - Favorites Tab */}
      {activeTab === 'favorites' && (
        <div className="gallery">
          <div className="container">
            {loading ? (
              <div className="loading">
                <div className="ship-wheel"></div>
                <p>Curating Collection...</p>
              </div>
            ) : favorites.length === 0 ? (
              <div className="empty-state">
                <p>The gallery awaits your first piece.</p>
              </div>
            ) : (
              <div className="grid">
                {favorites.map((favorite, index) => (
                  <FavoriteCard
                    key={favorite._id}
                    favorite={favorite}
                    index={index}
                    getYouTubeEmbedUrl={getYouTubeEmbedUrl}
                    onVideoClick={() => setSelectedVideo(favorite)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Photos Tab */}
      {activeTab === 'photos' && (
        <PhotoGallery />
      )}

      {/* Movies Tab */}
      {activeTab === 'movies' && (
        <MovieGallery movies={MOVIES} />
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          favorite={selectedVideo}
          getYouTubeEmbedUrl={getYouTubeEmbedUrl}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}

// Confetti Component
function Confetti() {
  const confettiPieces = Array.from({ length: 50 });
  
  return (
    <div className="confetti-container">
      {confettiPieces.map((_, index) => (
        <div key={index} className="confetti-piece" style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 0.5}s`,
          backgroundColor: ['#D4AF37', '#2C5F2D', '#8B7355'][Math.floor(Math.random() * 3)]
        }}></div>
      ))}
    </div>
  );
}

// Video Modal Component
function VideoModal({ favorite, getYouTubeEmbedUrl, onClose }) {
  const embedUrl = getYouTubeEmbedUrl(favorite.youtubeUrl);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {embedUrl && (
          <div className="modal-video">
            <iframe
              src={embedUrl}
              title={favorite.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <div className="modal-info">
          <h2>{favorite.title}</h2>
          <p className="modal-category">{favorite.category}</p>
          <p className="modal-description">{favorite.description}</p>
        </div>
      </div>
    </div>
  );
}

// Favorite Card Component
function FavoriteCard({ favorite, index, getYouTubeEmbedUrl, onVideoClick }) {
  const embedUrl = getYouTubeEmbedUrl(favorite.youtubeUrl);

  return (
    <div 
      className="card" 
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => embedUrl && onVideoClick()}
    >
      {embedUrl && (
        <div className="card-video">
          <iframe
            src={embedUrl}
            title={favorite.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="play-overlay">
            <div className="play-button">▶</div>
          </div>
        </div>
      )}
      
      {!embedUrl && favorite.imageUrl && (
        <div className="card-image">
          <img src={favorite.imageUrl} alt={favorite.title} />
        </div>
      )}

      <div className="card-content">
        <div className="card-header">
          <span className="category-badge">{favorite.category}</span>
          <h3 className="card-title">{favorite.title}</h3>
        </div>
        
        <p className="card-description">{favorite.description}</p>
        
        {favorite.tags && favorite.tags.length > 0 && (
          <div className="tags">
            {favorite.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Admin Panel Component
function AdminPanel({ onClose, onFavoriteAdded, apiUrl }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Videos',
    description: '',
    youtubeUrl: '',
    imageUrl: '',
    tags: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const response = await fetch(`${apiUrl}/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          description: formData.description,
          youtubeUrl: formData.youtubeUrl,
          imageUrl: formData.imageUrl,
          tags: tagsArray,
          password: formData.password
        }),
      });

      if (response.ok) {
        setMessage('✅ Favorite added successfully!');
        setFormData({
          title: '',
          category: 'Videos',
          description: '',
          youtubeUrl: '',
          imageUrl: '',
          tags: '',
          password: formData.password // Keep password for convenience
        });
        onFavoriteAdded();
      } else {
        const error = await response.json();
        setMessage(`❌ Error: ${error.message}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-content">
          <h2>Add to Collection</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="Videos">Videos</option>
                <option value="Music">Music</option>
                <option value="Tech">Tech</option>
                <option value="Inspiration">Inspiration</option>
                <option value="Movies">Movies</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>YouTube URL (optional)</label>
              <input
                type="text"
                name="youtubeUrl"
                value={formData.youtubeUrl}
                onChange={handleChange}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div className="form-group">
              <label>Image URL (optional)</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label>Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="coding, inspiration, tutorial"
              />
            </div>

            <div className="form-group">
              <label>Admin Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {message && <div className="message">{message}</div>}

            <button type="submit" className="submit-btn">
              Add Favorite
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Photo Gallery Component
function PhotoGallery() {
  const photos = [
    { id: 1, title: 'Albufeira', url: '/photos/Albufeira.png', description: 'Coastal memories' },
    { id: 2, title: 'Culinary Adventures', url: '/photos/Cooking.png', description: 'In the kitchen' },
    { id: 3, title: 'Sweet Treats', url: '/photos/Donut.png', description: 'Life\'s simple pleasures' },
    { id: 4, title: 'Ireland', url: '/photos/Ireland.png', description: 'Emerald isle journey' },
    { id: 5, title: 'Jimmy', url: '/photos/Jimmy.png', description: 'Cherished companion' },
    { id: 6, title: 'Lucy', url: '/photos/Lucy.png', description: 'Beloved friend' },
    { id: 7, title: 'Mamo', url: '/photos/Mamo.png', description: 'Family warmth' },
    { id: 8, title: 'Mezzo', url: '/photos/Mezzo.png', description: 'Special moments' },
    { id: 9, title: 'Micheal', url: '/photos/Micheal.png', description: 'Treasured memories' },
    { id: 10, title: 'Middle Eastern Feast', url: '/photos/MiddleEastern.png', description: 'Culinary exploration' },
    { id: 11, title: 'Pizza Night', url: '/photos/Pizza.png', description: 'Good food, good times' },
    { id: 12, title: 'Pumpkin Patch', url: '/photos/Pumpkin Patch.png', description: 'Autumn adventures' },
    { id: 13, title: 'Yellow Art', url: '/photos/YellowArt.png', description: 'Creative expression' },
  ];

  return (
    <div className="gallery">
      <div className="container">
        <h2 className="section-title">Personal Photographs</h2>
        <div className="photo-grid">
          {photos.map((photo, index) => (
            <div key={photo.id} className="photo-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="photo-frame">
                <img src={photo.url} alt={photo.title} />
              </div>
              <div className="photo-info">
                <h3>{photo.title}</h3>
                <p>{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Movie Gallery Component
function MovieGallery({ movies }) {
  return (
    <div className="gallery">
      <div className="container">
        <h2 className="section-title">Cinematic Favorites</h2>
        <div className="movie-grid">
          {movies.map((movie, index) => (
            <div key={index} className="movie-card" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="movie-poster">
                <img src={movie.poster} alt={movie.title} />
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p className="movie-year">{movie.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

