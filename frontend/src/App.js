import React from 'react';
import './App.css';

// Movie data with posters
const MOVIES = [
  { title: 'Interstellar', year: 2014, poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg' },
  { title: 'Whiplash', year: 2014, poster: 'https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg' },
  { title: 'Spirited Away', year: 2001, poster: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg' },
  { title: 'The Grand Budapest Hotel', year: 2014, poster: 'https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg' },
  { title: 'The Shawshank Redemption', year: 1994, poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg' },
  { title: 'Blade Runner 2049', year: 2017, poster: 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg' },
  { title: 'No Country for Old Men', year: 2007, poster: 'https://m.media-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_SX300.jpg' },
  { title: 'Catch Me If You Can', year: 2002, poster: 'https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_SX300.jpg' },
  { title: 'Moonlight', year: 2016, poster: 'https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_SX300.jpg' },
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
  { title: 'Arrival', year: 2016, poster: 'https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX300.jpg' },
];

function App() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="App">
      {/* Hero Header */}
      <header className="hero-header">
        <h1 className="main-title">GEAROID WALSH</h1>
        <p className="main-subtitle">My Life In Stories</p>
        <p className="essentials-tag">10 Things I Can't Live Without</p>
      </header>

      {/* Navigation Cards */}
      <nav className="navigation-grid">
        <div className="nav-cards">
          <button className="nav-card" onClick={() => scrollToSection('sports')}>
            <span className="nav-number">01</span>
            Sports
          </button>
          <button className="nav-card" onClick={() => scrollToSection('ireland')}>
            <span className="nav-number">02</span>
            Ireland
          </button>
          <button className="nav-card" onClick={() => scrollToSection('food')}>
            <span className="nav-number">03</span>
            Food
          </button>
          <button className="nav-card" onClick={() => scrollToSection('music')}>
            <span className="nav-number">04</span>
            Music
          </button>
          <button className="nav-card" onClick={() => scrollToSection('college')}>
            <span className="nav-number">05</span>
            CSM→Cal
          </button>
          <button className="nav-card" onClick={() => scrollToSection('dogs')}>
            <span className="nav-number">06</span>
            Dogs
          </button>
          <button className="nav-card" onClick={() => scrollToSection('movies')}>
            <span className="nav-number">07</span>
            Movies
          </button>
          <button className="nav-card" onClick={() => scrollToSection('fashion')}>
            <span className="nav-number">08</span>
            Fashion
          </button>
          <button className="nav-card" onClick={() => scrollToSection('growth')}>
            <span className="nav-number">09</span>
            Growth
          </button>
          <button className="nav-card" onClick={() => scrollToSection('family')}>
            <span className="nav-number">10</span>
            Family
          </button>
        </div>
      </nav>

      {/* Intro Section */}
      <div className="home-intro">
        <div className="intro-card paper-texture">
          <p className="intro-text">
            Hey, I'm Gearoid Walsh. These are ten things I can't live without. Each one reminds me of a moment, a person, or a part of my life that really stuck with me. Some are small, some are random, but together they tell a bit of my story.
          </p>
          <p className="intro-text">
            Explore my essentials through the cards above, or just keep scrolling — each one's got its own story.
          </p>
        </div>
      </div>

      {/* All Sections - Scrollable */}
      <div className="main-content">
        <div id="sports"><SportsSection /></div>
        <div id="ireland"><IrelandSection /></div>
        <div id="food"><FoodSection /></div>
        <div id="music"><MusicSection /></div>
        <div id="college"><CollegeSection /></div>
        <div id="dogs"><DogsSection /></div>
        <div id="movies"><MoviesSection /></div>
        <div id="fashion"><FashionSection /></div>
        <div id="growth"><SelfGrowthSection /></div>
        <div id="family"><FamilySection /></div>
      </div>
    </div>
  );
}

// ==================== ESSENTIAL #1: SPORTS ====================
function SportsSection() {
  return (
    <div className="essential-item paper-texture">
      <div className="item-number">01</div>
      <div className="item-header">
        <span className="item-label">Essential #1</span>
        <div className="diamond-accent"></div>
        <h2 className="item-title">Sports</h2>
      </div>
      
      <div className="item-content">
        <div>
          <div className="item-text">
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', marginBottom: '20px', fontWeight: '700' }}>
              Liverpool FC
            </h4>
            <p style={{ marginBottom: '30px' }}>
              The first time I went to Liverpool was in January 2019. My brothers and I grew up as diehard Liverpool fans; we'd wake up at 4 a.m. just to make sure we caught every match. After visiting family in Ireland, we finally got the chance to see a game at Anfield. The atmosphere was electric, and I can still vividly remember the roar of the crowd when we scored.
            </p>
          </div>
          
          <div className="sub-story">
            <h4>The 49ers</h4>
            <p>
              Growing up in the Bay Area, it was only natural that I became a 49ers fan. As a kid, though, I was much more into soccer and basketball than football. That changed around fifth grade, when I started developing a real passion for the NFL and the Niners. As a Christmas present, my dad took me to my first 49ers game in late December. The Niners pulled off a win in the cold, and from that moment on, my love for football only grew stronger.
            </p>
          </div>
          
          <div className="sub-story">
            <h4>Fantasy Football</h4>
            <p>
              My love for fantasy football started a few years ago when my close friends and I created our own league. Soon, I wasn't just watching Niner games — I was following every matchup across the NFL. I'd stay up late researching players, predicting breakouts, and tinkering with my lineup. After a long season filled with laughs, trash talk, and heartbreak, my team made it all the way to the finals — a $300 prize on the line — against my good friend Sami. It came down to the wire, but I narrowly lost.
            </p>
          </div>
          
          <div className="sub-story">
            <h4>Warriors & Basketball</h4>
            <p>
              The Warriors — and especially Stephen Curry — are the reason I fell in love with basketball. Watching them revolutionize the game was mesmerizing, and it pushed me to pick up a ball myself. I joined my high school team and played all four years, channeling that same drive and excitement.
            </p>
            <p style={{ marginTop: '20px' }}>
              After high school, my friends and I joined a local basketball league. At first, we couldn't buy a win — the other teams were older, stronger, and way more physical. But with time, practice, and chemistry, things clicked. In our final season, we went undefeated and won the league. Still one of the best feelings ever.
            </p>
          </div>
        </div>
        
        <div className="polaroid-stack" style={{ height: '700px' }}>
          <div className="polaroid" style={{ top: '0', left: '0', width: '380px' }}>
            <div className="polaroid-image" style={{ height: '240px' }}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/FoBEEFdWhr8"
                title="Roberto Firmino weaves through Arsenal"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="polaroid-caption">Firmino magic ⚽</div>
          </div>
          
          <div className="polaroid" style={{ top: '280px', left: '30px', width: '360px', transform: 'rotate(-5deg)' }}>
            <div className="polaroid-image">
              <video
                width="100%"
                height="100%"
                controls
                style={{ objectFit: 'cover' }}
              >
                <source src="/copy_BBC5C62F-D14E-42EE-9E3C-ACFBB79A868A.mov" type="video/quicktime" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="polaroid-caption">Buzzer-beater 🏀</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== ESSENTIAL #2: IRELAND ====================
function IrelandSection() {
  return (
    <div className="essential-item paper-texture">
      <div className="item-number">02</div>
      <div className="item-header">
        <span className="item-label">Essential #2</span>
        <div className="diamond-accent"></div>
        <h2 className="item-title">Ireland</h2>
      </div>
      
      <div className="item-content">
        <div>
          <div className="item-text">
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', marginBottom: '20px', fontWeight: '700' }}>
              Summers in Ireland
            </h4>
            <p style={{ marginBottom: '30px' }}>
              Growing up, I spent most of my summers in Ireland. My parents, both Irish immigrants, were adamant that my brothers and I stayed connected to our roots — and I couldn't thank them enough for that. Here are some photos I've taken in Ireland over the years!
            </p>
          </div>
          
          <div className="sub-story">
            <h4>How My Parents Met</h4>
            <p>
              My parents actually met the year the World Cup was held in America. My dad, from Galway, and my mother, from Dublin, both decided to visit Boston that summer to support Ireland. They ran into each other in a bar, and now I'm here. San Mateo/Berkeley California. No place I'd rather be; Ireland and California.
            </p>
          </div>
        </div>
        
        <div className="polaroid-stack">
          <div className="polaroid">
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Ireland.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Irish summers ☘️</div>
          </div>
          <div className="polaroid">
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Parents.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Mom & Dad ❤️</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== ESSENTIAL #3: FOOD ====================
function FoodSection() {
  return (
    <div className="essential-item paper-texture">
      <div className="item-number">03</div>
      <div className="item-header">
        <span className="item-label">Essential #3</span>
        <div className="diamond-accent"></div>
        <h2 className="item-title">Food</h2>
      </div>
      
      <div className="item-content">
        <div>
          <div className="item-text">
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', marginBottom: '20px', fontWeight: '700' }}>
              SF Adventures with Mom
            </h4>
            <p style={{ marginBottom: '30px' }}>
              One of the things my mom and I bond over is food. We love sending each other videos of new "foodie" spots to try, and every other weekend, we'd make the drive to San Francisco to explore delis, bakeries, and hole-in-the-wall gems.
            </p>
          </div>
          
          <div className="sub-story">
            <h4>Oxtail Quesadilla</h4>
            <p style={{ marginBottom: '20px' }}>
              The best dish I've ever had was the Oxtail Quesadilla from CookingNStyle. The smokiness of the oxtail combined with the zing of jerk sauce and melted cheese was unreal. Honestly, that meal was on another level.
            </p>
          </div>

          <div className="sub-story">
            <h4>Mezzo's BLTA</h4>
            <p style={{ marginBottom: '20px' }}>
              My most consumed food throughout my life has to be sandwiches. And given my love for sandwiches, it was a pleasure to indulge in this "BLTA" Sandwich from Mezzo. One of the, if not the, best sandwiches I've ever had.
            </p>
          </div>

          <div className="sub-story">
            <h4>Sweet Treats & Pizza</h4>
            <p>
              From donuts at our favorite bakeries to good square slices from a pizza parlor in San Jose — every food adventure is a memory.
            </p>
          </div>
        </div>
        
        <div className="polaroid-stack" style={{ height: '750px' }}>
          <div className="polaroid" style={{ top: '0', left: '0', width: '340px' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Cooking.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Oxtail magic 🔥</div>
          </div>
          <div className="polaroid" style={{ top: '100px', right: '0', width: '340px', transform: 'rotate(5deg)' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Mezzo.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">BLTA perfection 🥪</div>
          </div>
          <div className="polaroid" style={{ top: '400px', left: '30px', width: '320px', transform: 'rotate(-4deg)' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Donut.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Sweet treats 🍩</div>
          </div>
          <div className="polaroid" style={{ top: '450px', right: '20px', width: '300px', transform: 'rotate(6deg)' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Pizza.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">San Jose slice 🍕</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== ESSENTIAL #4: MUSIC ====================
function MusicSection() {
  return (
    <div className="essential-item paper-texture">
      <div className="item-number">04</div>
      <div className="item-header">
        <span className="item-label">Essential #4</span>
        <div className="diamond-accent"></div>
        <h2 className="item-title">Music</h2>
      </div>
      
      <div className="item-content">
        <div>
          <div className="item-text">
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', marginBottom: '20px', fontWeight: '700' }}>
              My First Concert
            </h4>
            <p style={{ marginBottom: '30px' }}>
              The first concert I ever went to was during my junior year of high school with my friends — Playboi Carti's Whole Lotta Red Tour in San Francisco. The energy was insane. Half the time, I was vibing to the music; the other half, I was just making sure my friends and I survived the mosh pit.
            </p>
          </div>
          
          <div className="sub-story">
            <h4>Pandemic Story</h4>
            <p>
              During the pandemic, I spent a lot of time riding my bike — mornings, afternoons, even late at night — just exploring new areas. One day, I rode farther than ever before, and that was the first time I listened to Blonde and Channel Orange by Frank Ocean. Those albums became instant favorites, and Frank has been my favorite artist ever since. That ride, with those songs playing for the first time, is something I'll always cherish.
            </p>
          </div>
        </div>
        
        <div className="polaroid-stack">
          <div className="polaroid">
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Carti.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Whole Lotta Red 🎤</div>
          </div>
          <div className="polaroid">
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Blond.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Blonde era 🚴</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== ESSENTIAL #5: COLLEGE ====================
function CollegeSection() {
  return (
    <div className="essential-item paper-texture">
      <div className="item-number">05</div>
      <div className="item-header">
        <span className="item-label">Essential #5</span>
        <div className="diamond-accent"></div>
        <h2 className="item-title">CSM→Cal</h2>
      </div>
      
      <div className="item-content">
        <div>
          <div className="item-text">
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', marginBottom: '20px', fontWeight: '700' }}>
              CSM Experience
            </h4>
            <p style={{ marginBottom: '30px' }}>
              After high school, I attended the College of San Mateo. Those two years gave me a lot of time for personal, academic, and professional growth. I'm incredibly grateful for that experience — it shaped who I am today. Linked here is a photo from my first professional presentation, which I gave at my college's Honors Showcase.
            </p>
          </div>
          
          <div className="sub-story">
            <h4>Voyager Consulting/Berkeley Experience</h4>
            <p>
              So as I'm writing this, I'm actually still kind of new to Voyager. I'm halfway through my first semester, but I've really enjoyed it so far. It's a huge change of environment from community college, and it's been so fun to experience everything. Good people in the club :) — And that's what matters to me.
            </p>
          </div>
        </div>
        
        <div className="polaroid-stack" style={{ height: '700px' }}>
          <div className="polaroid" style={{ top: '0', left: '0', width: '340px' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/CSM%20%231.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Honors Showcase 📊</div>
          </div>
          <div className="polaroid" style={{ top: '80px', right: '-20px', width: '340px', transform: 'rotate(5deg)' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/CSM%20%232.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">CSM days 🎓</div>
          </div>
          <div className="polaroid" style={{ top: '400px', left: '40px', width: '340px', transform: 'rotate(-4deg)' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/MidPoint%20Hormel.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Berkeley life 🐻</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== ESSENTIAL #6: DOGS ====================
function DogsSection() {
  return (
    <div className="essential-item paper-texture">
      <div className="item-number">06</div>
      <div className="item-header">
        <span className="item-label">Essential #6</span>
        <div className="diamond-accent"></div>
        <h2 className="item-title">Dogs</h2>
      </div>
      
      <div className="item-content">
        <div>
          <div className="item-text">
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', marginBottom: '20px', fontWeight: '700' }}>
              Lucy & Animals
            </h4>
            <p>
              My dog Lucy is a beautiful dog I'm ngl. Fun fact about her is she can run insanely fast. When she was younger every time our family went to the beach with her people would come up and ask us how she was so fast XD.
            </p>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginTop: '40px' }}>
          <div className="polaroid" style={{ position: 'relative', transform: 'rotate(-3deg)' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Mamo.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Neansai 🐾</div>
          </div>
          <div className="polaroid" style={{ position: 'relative', transform: 'rotate(2deg)' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Lucy.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Lucy 🐕</div>
          </div>
          <div className="polaroid" style={{ position: 'relative', transform: 'rotate(-2deg)' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Lucy%20%232.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Lucy adventures 🏃‍♀️</div>
          </div>
          <div className="polaroid" style={{ position: 'relative', transform: 'rotate(3deg)' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Lucy%20%233.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">More Lucy! 😊</div>
          </div>
          <div className="polaroid" style={{ position: 'relative', transform: 'rotate(-3deg)' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Lucy%20Smile.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">That smile! 🌟</div>
          </div>
          <div className="polaroid" style={{ position: 'relative', transform: 'rotate(2deg)' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Lucy%20walk.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Beach walks 🏖️</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== ESSENTIAL #7: MOVIES ====================
function MoviesSection() {
  return (
    <div className="essential-item paper-texture">
      <div className="item-number">07</div>
      <div className="item-header">
        <span className="item-label">Essential #7</span>
        <div className="diamond-accent"></div>
        <h2 className="item-title">Movies</h2>
      </div>
      
      <div className="movies-intro">
        <p>
          Here is a collection of some of my favorite movies, as well as some of my all-time favorite movie clips.
        </p>
      </div>

      {/* Favorite Movie Clips - AT TOP */}
      <div className="movie-clips">
        <h3 className="clips-title">Favorite Scenes</h3>
        <div className="clips-grid">
          <div className="clip-item">
            <div className="clip-placeholder">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/OA3Txp94pjs"
                title="Interstellar Into the Black Hole"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="clip-info">
              <h4 className="clip-title">Interstellar: Into the Black Hole</h4>
              <p className="clip-description">
                One of the most visually stunning and emotionally powerful scenes in cinema.
              </p>
            </div>
          </div>

          <div className="clip-item">
            <div className="clip-placeholder">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/nVs5f6UMiiE"
                title="Moonlight Decide for Yourself"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="clip-info">
              <h4 className="clip-title">Moonlight: Decide for Yourself</h4>
              <p className="clip-description">
                A beautifully intimate moment that captures the heart of this incredible film.
              </p>
            </div>
          </div>

          <div className="clip-item">
            <div className="clip-placeholder">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/BMCP4O5Hxs8"
                title="Catch Me If You Can"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="clip-info">
              <h4 className="clip-title">Catch Me If You Can</h4>
              <p className="clip-description">
                A timeless Spielberg classic that never gets old.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Collection - BELOW CLIPS */}
      <div style={{ marginTop: '100px' }}>
        <h3 className="clips-title">My Favorites</h3>
        <div className="movie-collection">
          {MOVIES.map((movie, index) => (
            <div key={index} className="movie-poster-card">
              <div className="movie-poster" style={{
                backgroundImage: `url(${movie.poster})`
              }}></div>
              <div className="movie-name">{movie.title}</div>
              <div className="movie-year">{movie.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== ESSENTIAL #8: FASHION ====================
function FashionSection() {
  return (
    <div className="essential-item paper-texture">
      <div className="item-number">08</div>
      <div className="item-header">
        <span className="item-label">Essential #8</span>
        <div className="diamond-accent"></div>
        <h2 className="item-title">Fashion</h2>
      </div>
      
      <div className="item-content">
        <div>
          <div className="item-text">
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', marginBottom: '20px', fontWeight: '700' }}>
              Round 2
            </h4>
            <p style={{ marginBottom: '30px' }}>
              Growing up, one of the things my older brothers and I bonded over was fashion. Round Two — a clothing store that started in Virginia and later opened a location in LA during the 2010s — became a big part of that. They used to film their day-to-day life at the shop, and we got hooked on their videos. Eventually, our obsession led us to take a trip down to LA just to visit the store in person.
            </p>
          </div>
          
          <div className="sub-story">
            <h4>My Grail</h4>
            <p>
              This is one of my "grails", meaning a piece of clothing I can't wait to someday get my hands on.
            </p>
          </div>
        </div>
        
        <div className="polaroid-stack">
          <div className="polaroid">
            <div className="polaroid-image">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/_XlbV2WbUZM"
                title="Round 2 LA"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="polaroid-caption">Round Two LA 🛍️</div>
          </div>
          <div className="polaroid">
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Bare%20Knuckles.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">My grail 🧥</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== ESSENTIAL #9: SELF GROWTH ====================
function SelfGrowthSection() {
  return (
    <div className="essential-item paper-texture">
      <div className="item-number">09</div>
      <div className="item-header">
        <span className="item-label">Essential #9</span>
        <div className="diamond-accent"></div>
        <h2 className="item-title">Self/Spiritual Growth</h2>
      </div>
      
      <div className="item-content">
        <div>
          <div className="item-text">
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', marginBottom: '20px', fontWeight: '700' }}>
              The Enneagram
            </h4>
            <p style={{ marginBottom: '30px' }}>
              I first came across the Enneagram in the summer of 2025, and it honestly surprised me how much it clicked. I've never really been the type to get into personality systems or spiritual stuff, but this one just made sense. It helped me understand myself better and gave me a clearer picture of the kind of person I want to become.
            </p>
          </div>
          
          <div className="sub-story">
            <h4>People Who Inspire Me</h4>
            <p style={{ marginBottom: '25px' }}>
              All of the role models below have had a major influence on me — not just for what they've accomplished on the court or field, but for how they carry themselves and inspire others. Each of them represents qualities I try to embody as I work toward becoming the best version of myself.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '30px' }}>
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                <h5 style={{ fontSize: '1.3rem', marginBottom: '8px', fontWeight: '700' }}>Virgil van Dijk</h5>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: '0.9' }}>
                  A leader who commands respect through composure and consistency. His presence alone elevates those around him.
                </p>
              </div>
              
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                <h5 style={{ fontSize: '1.3rem', marginBottom: '8px', fontWeight: '700' }}>Stephen Curry</h5>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: '0.9' }}>
                  Revolutionized his sport through relentless work ethic and unwavering confidence. Proves that greatness comes in all forms.
                </p>
              </div>
              
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                <h5 style={{ fontSize: '1.3rem', marginBottom: '8px', fontWeight: '700' }}>Erwin Smith</h5>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: '0.9' }}>
                  A character who embodies sacrifice, vision, and the courage to lead others toward a greater purpose.
                </p>
              </div>
              
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                <h5 style={{ fontSize: '1.3rem', marginBottom: '8px', fontWeight: '700' }}>Jürgen Klopp</h5>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: '0.9' }}>
                  Passionate, authentic, and genuinely cares about his people. Shows that leadership is about connection, not control.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="polaroid-stack" style={{ height: '850px' }}>
          <div className="polaroid" style={{ top: '0', left: '0', width: '360px' }}>
            <div className="polaroid-image">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/AT4XdAltZ0k"
                title="Enneagram"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="polaroid-caption">Enneagram 📖</div>
          </div>
          
          {/* Idol Photos - Better Spaced */}
          <div className="polaroid" style={{ top: '120px', right: '0', width: '280px', transform: 'rotate(4deg)' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Virgil.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Virgil 🛡️</div>
          </div>
          
          <div className="polaroid" style={{ top: '420px', left: '20px', width: '280px', transform: 'rotate(-4deg)' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Curry.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Steph 🏀</div>
          </div>
          
          <div className="polaroid" style={{ top: '460px', right: '10px', width: '280px', transform: 'rotate(5deg)' }}>
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Erwin.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Erwin ⚔️</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== ESSENTIAL #10: FAMILY ====================
function FamilySection() {
  return (
    <div className="essential-item paper-texture">
      <div className="item-number">10</div>
      <div className="item-header">
        <span className="item-label">Essential #10</span>
        <div className="diamond-accent"></div>
        <h2 className="item-title">Family</h2>
      </div>
      
      <div className="item-content">
        <div>
          <div className="item-text">
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', marginBottom: '20px', fontWeight: '700' }}>
              The Foundation
            </h4>
            <p style={{ marginBottom: '30px' }}>
              I'm the youngest son of two Irish immigrants, Gearóid Breathnach and Gráinne Keegan, and the little brother to Aodán and Micheál. Everything I do ties back to them — my family here, and the one still in Ireland. They're the foundation that upholds my character, work ethic, and commitment to staying grounded.
            </p>
          </div>
          
          <div className="sub-story">
            <h4>What They Taught Me</h4>
            <p>
              The lessons that shaped me came from watching my parents rebuild a life from scratch, from hearing stories of home, and from realizing how much they gave up for my brothers and me. That's what drives me. I want every step I take to reflect their kindness, humility, and grit; and to carry our family name in the most positive light I can.
            </p>
          </div>
        </div>
        
        <div className="polaroid-stack">
          <div className="polaroid">
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Mamo.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Family ❤️</div>
          </div>
          <div className="polaroid">
            <div className="polaroid-image" style={{
              backgroundImage: 'url(/photos/Micheal.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <div className="polaroid-caption">Brothers 👨‍👦‍👦</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
