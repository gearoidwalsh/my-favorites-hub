# 🔗 How to Link to Your Personal Website

## Step 1: Find Where to Add the Link

You have options! Here are the best places:

### Option A: Add a Projects Section (RECOMMENDED)

Create a new "Projects" section on your personal website:

```jsx
// In your App.js
<section className="projects">
  <h2>My Projects</h2>
  <div className="project-card">
    <h3>🌟 My Favorites Hub</h3>
    <p>A full-stack web app showcasing my favorite videos, music, and inspiration</p>
    <a href="https://your-app.vercel.app" target="_blank" rel="noopener noreferrer">
      <button>View Project</button>
    </a>
  </div>
</section>
```

### Option B: Add to Navigation

Add it to your header/nav menu:

```jsx
<nav>
  <a href="#home">Home</a>
  <a href="#about">About</a>
  <a href="https://your-app.vercel.app" target="_blank" rel="noopener noreferrer">
    My Favorites
  </a>
</nav>
```

### Option C: Add a Button in Hero Section

Add a prominent button on your landing page:

```jsx
<div className="hero">
  <h1>Welcome to My Website</h1>
  <p>Check out my latest project!</p>
  <a href="https://your-app.vercel.app" target="_blank" rel="noopener noreferrer">
    <button className="cta-button">
      ✨ View My Favorites Hub
    </button>
  </a>
</div>
```

## Step 2: Style the Link/Button

Add some CSS to make it look good:

```css
.cta-button {
  padding: 15px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.project-card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
}
```

## Step 3: Example Full Implementation

Here's a complete example for your personal website:

```jsx
// App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Your Name</h1>
        <nav>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <h2>Welcome!</h2>
        <p>I'm a developer passionate about building cool stuff</p>
      </section>

      <section id="projects" className="projects">
        <h2>My Projects</h2>
        
        <div className="project-card">
          <div className="project-badge">Full-Stack App</div>
          <h3>🌟 My Favorites Hub</h3>
          <p>
            A full-stack web application built with React, Node.js, Express, 
            and MongoDB. Features include YouTube video embedding, search/filter 
            functionality, and a password-protected admin panel.
          </p>
          <div className="tech-stack">
            <span>React</span>
            <span>Node.js</span>
            <span>MongoDB</span>
            <span>Express</span>
          </div>
          <a 
            href="https://your-app.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button className="view-project-btn">
              View Live Project →
            </button>
          </a>
        </div>
      </section>

      <footer>
        <p>© 2024 Your Name</p>
      </footer>
    </div>
  );
}

export default App;
```

## Step 4: Deploy Updated Website

After adding the link:

```bash
cd /Users/g/Documents/Github/personal-website
git add .
git commit -m "Add link to Favorites Hub project"
git push
```

If your site is on Vercel/Netlify, it will auto-deploy!

## Pro Tips for Demo Video

When showing this in your demo:
1. Show your personal website
2. Click the link to your Favorites Hub
3. Say: "I linked this to my personal website so visitors can explore my work"

This shows you can integrate multiple projects together! 🎯

---

Need help? Check the main README.md!



