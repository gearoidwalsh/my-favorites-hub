import React, { useState, useEffect } from 'react';
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
  { title: 'The Thing', year: 1982, poster: 'https://m.media-amazon.com/images/M/MV5BNGViZWZmM2EtNGYyYy00ZDAyLTk3ODMtNzIyZTBjN2Y1NmM1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg' },
  { title: 'In the Mood for Love', year: 2000, poster: 'https://m.media-amazon.com/images/M/MV5BYWVjNjMwZTgtMGYyYy00NmVhLWE1NDItMzFhMmJkYTNjYWIwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg' },
  { title: 'Arrival', year: 2016, poster: 'https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX300.jpg' },
];

const SECTIONS = [
  { id: 'sports', name: 'Sports' },
  { id: 'ireland', name: 'Ireland' },
  { id: 'food', name: 'Food' },
  { id: 'music', name: 'Music' },
  { id: 'college', name: 'CSM→Cal' },
  { id: 'dogs', name: 'Dogs' },
  { id: 'movies', name: 'Movies' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'growth', name: 'Self/Spiritual Growth' },
  { id: 'family', name: 'Family' },
];

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('sports');

  // Scroll progress bar
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  // Intersection Observer for fade-in animations and active section tracking
  useEffect(() => {
    const options = {
      threshold: 0.3,
      rootMargin: '-100px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    document.querySelectorAll('.essential-section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="App">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Header & Navigation */}
      <header className="header">
        <div className="nav-container">
          <h1 className="site-title">GEAROID WALSH</h1>
          <nav>
            <ul className="nav-links">
              {SECTIONS.map(section => (
                <li key={section.id}>
                  <button
                    className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Intro Section */}
      <section className="intro-section">
        <div className="intro-label">Introduction</div>
        <h1 className="intro-title">Ten Things I Can't Live Without</h1>
        <div className="intro-divider"></div>
        <p className="intro-text">
          Hey, I'm Gearoid Walsh. These are ten things I can't live without. Each one reminds me of a moment, a person, or a part of my life that really stuck with me. Some are small, some are random, but together they tell a bit of my story.
        </p>
        <p className="intro-text">
          Explore my essentials through the cards above, or just keep scrolling — each one's got its own story.
        </p>
      </section>

      {/* ESSENTIAL #1: SPORTS - Layout 1 (Text Left, Images Right) */}
      <section id="sports" className="essential-section layout-1">
        <div className="section-text">
          <div className="section-label">ESSENTIAL #01</div>
          <h2 className="section-title">Sports</h2>
          <div className="section-divider"></div>
          
          <h3>Liverpool</h3>
          <p>
            The first time I went to Liverpool was in January 2019. My brothers and I grew up as diehard Liverpool fans; we'd wake up at 4 a.m. just to make sure we caught every match. After visiting family in Ireland, we finally got the chance to see a game at Anfield. The atmosphere was electric, and I can still vividly remember the roar of the crowd when we scored.
          </p>
          
          <h3>49ers</h3>
          <p>
            Growing up in the Bay Area, it was only natural that I became a 49ers fan. As a kid, though, I was much more into soccer and basketball than football. That changed around fifth grade, when I started developing a real passion for the NFL and the Niners. As a Christmas present, my dad took me to my first 49ers game in late December — the photo above is from that day. The Niners pulled off a win in the cold, and from that moment on, my love for football only grew stronger.
          </p>
          
          <h3>Fantasy Football</h3>
          <p>
            My love for fantasy football started a few years ago when my close friends and I created our own league. Soon, I wasn't just watching Niner games — I was following every matchup across the NFL. I'd stay up late researching players, predicting breakouts, and tinkering with my lineup. After a long season filled with laughs, trash talk, and heartbreak, my team made it all the way to the finals — a $300 prize on the line — against my good friend Sami. It came down to the wire, but I narrowly lost.
          </p>
        </div>
        
        <div className="image-container">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/FoBEEFdWhr8"
              title="Liverpool - Firmino Goal"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="video-container">
            <video controls>
              <source src="/copy_BBC5C62F-D14E-42EE-9E3C-ACFBB79A868A.mov" type="video/quicktime" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <img src="/photos/Fantasy.png" alt="Fantasy Football" className="editorial-image" />
        </div>
      </section>

      {/* ESSENTIAL #2: IRELAND - Layout 2 (Full-width hero with text below) */}
      <section id="ireland" className="essential-section layout-2">
        <div className="section-label">ESSENTIAL #02</div>
        <h2 className="section-title">Ireland</h2>
        <div className="section-divider"></div>
        
        <img src="/photos/Ireland.png" alt="Ireland" className="editorial-image hero-image" />
        
        <div className="section-text">
          <h3>Heritage & Home</h3>
          <p>
            Both of my parents are from Ireland — my dad from Galway and my mom from Dublin. Growing up, I made countless trips there, visiting family and soaking in the culture. Those visits shaped so much of who I am today. The landscapes, the stories, the sense of connection to a place my parents called home — it all left a lasting impression on me.
          </p>
          
          <h3>How My Parents Met</h3>
          <p>
            My parents met in a pretty classic Irish way — at a pub in Dublin. My dad was visiting from Galway, and my mom was out with friends. They hit it off immediately, and the rest, as they say, is history. Years later, they moved to the Bay Area, but Ireland has always remained a huge part of our lives. Every trip back feels like returning to a second home.
          </p>
        </div>
        
        <div className="spacer"></div>
        <img src="/photos/Parents.png" alt="My Parents" className="editorial-image" style={{ maxWidth: '600px', margin: '0 auto' }} />
      </section>

      {/* ESSENTIAL #3: FOOD - Layout 3 (Text left, images grid right) */}
      <section id="food" className="essential-section layout-3">
        <div className="section-text">
          <div className="section-label">ESSENTIAL #03</div>
          <h2 className="section-title">Food</h2>
          <div className="section-divider"></div>
          
          <h3>Foodie Trips with Mom</h3>
          <p>
            One of the things my mom and I bond over is food. We love sending each other videos of new "foodie" spots to try, and every other weekend, we'd make the drive to San Francisco to explore delis, bakeries, and hole-in-the-wall gems.
          </p>
          
          <h3>The Best Quesadilla</h3>
          <p>
            The best dish I've ever had was the Oxtail Quesadilla from CookingNStyle. The smokiness of the oxtail combined with the zing of jerk sauce and melted cheese was unreal. Honestly, that meal was on another level.
          </p>
          
          <h3>Sandwiches Forever</h3>
          <p>
            My most consumed food throughout my life has to be sandwiches. And given my love for sandwiches, it was a pleasure to indulge in this 'BLTA' Sandwich from Mezzo. One of the, if not the, best sandwiches I've ever had.
          </p>
        </div>
        
        <div className="image-grid">
          <img src="/photos/Cooking.png" alt="Cooking" className="editorial-image" />
          <img src="/photos/Donut.png" alt="Donut" className="editorial-image" />
          <img src="/photos/Mezzo.png" alt="Mezzo Sandwich" className="editorial-image" />
          <img src="/photos/Pizza.png" alt="Pizza" className="editorial-image" />
        </div>
      </section>

      {/* ESSENTIAL #4: MUSIC - Layout 4 (60% image / 40% text) */}
      <section id="music" className="essential-section layout-4">
        <div className="image-container">
          <img src="/photos/Blond.png" alt="Frank Ocean - Blonde" className="editorial-image" />
          <div className="spacer"></div>
          <img src="/photos/Carti.png" alt="Playboi Carti Concert" className="editorial-image" />
        </div>
        
        <div className="section-text">
          <div className="section-label">ESSENTIAL #04</div>
          <h2 className="section-title">Music</h2>
          <div className="section-divider"></div>
          
          <h3>Pandemic Story</h3>
          <p>
            During the pandemic, I spent a lot of time riding my bike — mornings, afternoons, even late at night — just exploring new areas. One day, I rode farther than ever before, and that was the first time I listened to Blonde and Channel Orange by Frank Ocean. Those albums became instant favorites, and Frank has been my favorite artist ever since. That ride, with those songs playing for the first time, is something I'll always cherish.
          </p>
          
          <h3>My First Concert</h3>
          <p>
            The first concert I ever went to was during my junior year of high school with my friends — Playboi Carti's Whole Lotta Red Tour in San Francisco. The energy was insane. Half the time, I was vibing to the music; the other half, I was just making sure my friends and I survived the mosh pit.
          </p>
        </div>
      </section>

      {/* ESSENTIAL #5: CSM→CAL - Layout 5 (Mirror of Layout 1) */}
      <section id="college" className="essential-section layout-5">
        <div className="section-text">
          <div className="section-label">ESSENTIAL #05</div>
          <h2 className="section-title">CSM → Cal</h2>
          <div className="section-divider"></div>
          
          <h3>Community College</h3>
          <p>
            After high school, I attended the College of San Mateo. Those two years gave me a lot of time for personal, academic, and professional growth. I'm incredibly grateful for that experience — it shaped who I am today.
          </p>
          
          <h3>Honors Presentation</h3>
          <p>
            During my time at CSM, I gave my first professional presentation at the college's Honors Showcase. It was a pivotal moment that built my confidence in public speaking and presenting ideas.
          </p>
          
          <h3>Voyager Consulting</h3>
          <p>
            One of the most formative experiences during college was working with Voyager Consulting, where I developed real-world business and consulting skills. The teamwork and challenges we faced together taught me invaluable lessons about collaboration and problem-solving.
          </p>
        </div>
        
        <div className="image-container">
          <img src="/photos/CSM%20%231.png" alt="CSM" className="editorial-image" />
          <img src="/photos/CSM%20%232.png" alt="CSM Presentation" className="editorial-image" />
          <img src="/photos/MidPoint%20Hormel.png" alt="Voyager Consulting" className="editorial-image" />
        </div>
      </section>

      {/* ESSENTIAL #6: DOGS - Layout 1 (Text Left, Images Right) */}
      <section id="dogs" className="essential-section layout-1">
        <div className="section-text">
          <div className="section-label">ESSENTIAL #06</div>
          <h2 className="section-title">Dogs</h2>
          <div className="section-divider"></div>
          
          <h3>Neansai (Mamo)</h3>
          <p>
            Mamo, whose full name is Neansai (pronounced "Nan-see"), is my family's dog back in Ireland. She's a loving, spirited companion who has brought so much joy to our family over the years. Every time we visit Ireland, she's always there to greet us with endless energy and affection.
          </p>
          
          <h3>Lucy</h3>
          <p>
            My dog Lucy is a beautiful dog I'm ngl. Fun fact about her is she can run insanely fast. When she was younger, every time our family went to the beach with her, people would come up and ask us how she was so fast.
          </p>
        </div>
        
        <div className="image-grid-3">
          <img src="/photos/Mamo.png" alt="Neansai (Mamo)" className="editorial-image" />
          <img src="/photos/Lucy.png" alt="Lucy" className="editorial-image" />
          <img src="/photos/Lucy%20%232.png" alt="Lucy 2" className="editorial-image" />
          <img src="/photos/Lucy%20%233.png" alt="Lucy 3" className="editorial-image" />
          <img src="/photos/Lucy%20Smile.png" alt="Lucy Smile" className="editorial-image" />
          <img src="/photos/Lucy%20walk.png" alt="Lucy Walk" className="editorial-image" />
        </div>
      </section>

      {/* ESSENTIAL #7: MOVIES - Layout 2 (Full-width with text below) */}
      <section id="movies" className="essential-section layout-2">
        <div className="section-label">ESSENTIAL #07</div>
        <h2 className="section-title">Movies</h2>
        <div className="section-divider"></div>
        
        <div className="section-text">
          <p>
            Movies have always been a huge part of my life. Whether it's getting lost in a powerful story, appreciating stunning cinematography, or just enjoying a night in with friends, films have shaped my perspective and imagination in countless ways.
          </p>
        </div>
        
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginTop: '48px', marginBottom: '32px', textAlign: 'center' }}>Favorite Clips</h3>
        
        <div className="image-grid">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/OA3Txp94pjs"
              title="Interstellar - Black Hole"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/nVs5f6UMiiE"
              title="Moonlight"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/BMCP4O5Hxs8"
              title="Catch Me If You Can"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginTop: '80px', marginBottom: '32px', textAlign: 'center' }}>All-Time Favorites</h3>
        
        <div className="movie-posters-grid">
          {MOVIES.map((movie, index) => (
            <img
              key={index}
              src={movie.poster}
              alt={movie.title}
              className="movie-poster"
            />
          ))}
        </div>
      </section>

      {/* ESSENTIAL #8: FASHION - Layout 4 (60% image / 40% text) */}
      <section id="fashion" className="essential-section layout-4">
        <div className="image-container">
          <img src="/photos/Bare%20Knuckles.png" alt="Bare Knuckles Grail" className="editorial-image" />
          
          <div className="video-container" style={{ marginTop: '32px' }}>
            <iframe
              src="https://www.youtube.com/embed/_XlbV2WbUZM"
              title="Round 2"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        <div className="section-text">
          <div className="section-label">ESSENTIAL #08</div>
          <h2 className="section-title">Fashion</h2>
          <div className="section-divider"></div>
          
          <h3>My Grail</h3>
          <p>
            This is one of my 'grails', meaning a piece of clothing I can't wait to someday get my hands on. Fashion has always been a form of self-expression for me, and this piece represents a perfect blend of style and craftsmanship.
          </p>
          
          <h3>Round 2 Story</h3>
          <p>
            Growing up, one of the things my older brothers and I bonded over was fashion. Round Two — a clothing store that started in Virginia and later opened a location in LA during the 2010s — became a big part of that. They used to film their day-to-day life at the shop, and we got hooked on their videos. Eventually, our obsession led us to take a trip down to LA just to visit the store in person.
          </p>
        </div>
      </section>

      {/* ESSENTIAL #9: SELF/SPIRITUAL GROWTH - Layout 3 (Text left, images grid right) */}
      <section id="growth" className="essential-section layout-3">
        <div className="section-text">
          <div className="section-label">ESSENTIAL #09</div>
          <h2 className="section-title">Self/Spiritual Growth</h2>
          <div className="section-divider"></div>
          
          <h3>The Enneagram</h3>
          <p>
            I first came across the Enneagram in the summer of 2025, and it honestly surprised me how much it clicked. I've never really been the type to get into personality systems or spiritual stuff, but this one just made sense. It helped me understand myself better and gave me a clearer picture of the kind of person I want to become.
          </p>
          
          <div className="video-container" style={{ marginTop: '32px', marginBottom: '32px' }}>
            <iframe
              src="https://www.youtube.com/embed/AT4XdAltZ0k"
              title="Enneagram"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <h3>My Idols</h3>
          <p>
            These are people who inspire me — not just for their achievements, but for how they carry themselves and influence those around them positively.
          </p>
          <p><strong>Virgil Van Dijk:</strong> Leadership through composure and excellence.</p>
          <p><strong>Stephen Curry:</strong> Humility and revolutionizing the game.</p>
          <p><strong>Erwin (Attack on Titan):</strong> Sacrifice and strategic brilliance.</p>
          <p><strong>Jurgen Klopp:</strong> Passion, authenticity, and building a family.</p>
        </div>
        
        <div className="image-grid">
          <img src="/photos/Virgil.png" alt="Virgil Van Dijk" className="editorial-image" />
          <img src="/photos/Curry.png" alt="Stephen Curry" className="editorial-image" />
          <img src="/photos/Erwin.png" alt="Erwin" className="editorial-image" />
          <img src="/photos/Klopp.png" alt="Jurgen Klopp" className="editorial-image" />
        </div>
      </section>

      {/* ESSENTIAL #10: FAMILY - Layout 2 (Full-width hero with text below) */}
      <section id="family" className="essential-section layout-2">
        <div className="section-label">ESSENTIAL #10</div>
        <h2 className="section-title">Family</h2>
        <div className="section-divider"></div>
        
        <div className="section-text">
          <p>
            Family has always been the foundation of who I am. From my parents' Irish roots to my brothers and the memories we've built together, every experience has shaped my values, my perspective, and my journey. These are the people who've supported me, challenged me, and made life meaningful.
          </p>
        </div>
        
        <div className="spacer"></div>
        
        <div className="image-grid">
          <img src="/photos/Mamo.png" alt="Family Memory" className="editorial-image" />
          <img src="/photos/Micheal.png" alt="Family Memory" className="editorial-image" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h3 className="footer-name">GEAROID WALSH</h3>
          <p className="footer-year">© 2025</p>
          <ul className="footer-links">
            <li><a href="https://linkedin.com" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://instagram.com" className="footer-link" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="mailto:contact@example.com" className="footer-link">Email</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
