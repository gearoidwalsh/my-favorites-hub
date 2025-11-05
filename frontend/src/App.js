import React, { useState, useEffect } from 'react';
import './App.css';

// Movie data with posters (removed "The Thing")
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
  { title: 'In the Mood for Love', year: 2000, poster: 'https://m.media-amazon.com/images/M/MV5BYWVjNjMwZTgtMGYyYy00NmVhLWE1NDItMzFhMmJkYTNjYWIwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg' },
  { title: 'Arrival', year: 2016, poster: 'https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX300.jpg' },
];

const SECTIONS = [
  { id: 'sports', name: '01 Sports', number: '01' },
  { id: 'ireland', name: '02 Ireland', number: '02' },
  { id: 'food', name: '03 Food', number: '03' },
  { id: 'music', name: '04 Music', number: '04' },
  { id: 'college', name: '05 CSM→Cal', number: '05' },
  { id: 'dogs', name: '06 Dogs', number: '06' },
  { id: 'movies', name: '07 Movies', number: '07' },
  { id: 'fashion', name: '08 Fashion', number: '08' },
  { id: 'growth', name: '09 Growth', number: '09' },
  { id: 'family', name: '10 Family', number: '10' },
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
      rootMargin: '-80px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const sectionId = entry.target.id;
          if (sectionId) setActiveSection(sectionId);
          
          // Stagger images within section
          const images = entry.target.querySelectorAll('.studio-image');
          images.forEach((img, index) => {
            setTimeout(() => {
              img.classList.add('visible');
            }, index * 120); // 120ms stagger
          });
        }
      });
    }, options);

    document.querySelectorAll('.essential-section, .feature-spread').forEach(section => {
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

      {/* Numbered Essentials Rail */}
      <header className="essentials-rail">
        <nav className="rail-container">
          {SECTIONS.map(section => (
            <button
              key={section.id}
              className={`rail-module ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => scrollToSection(section.id)}
            >
              {section.name}
            </button>
          ))}
        </nav>
      </header>

      {/* Magazine Hero Opener */}
      <section className="magazine-hero">
        <div className="hero-montage">
          <img src="/photos/Ireland.png" alt="Hero 1" className="hero-image" loading="eager" />
          <img src="/photos/Lucy.png" alt="Hero 2" className="hero-image" loading="eager" />
          <img src="/photos/Blond.png" alt="Hero 3" className="hero-image" loading="eager" />
        </div>
        <p className="hero-dek">
          Ten essentials. Each one tells a story about moments, people, and experiences that shaped who I am.
        </p>
      </section>

      {/* ESSENTIAL #01: SPORTS - Triptych A */}
      <section id="sports" className="essential-section" data-motif="sports">
        <div className="section-header">
          <div className="section-number">Essential 01</div>
          <h2 className="section-title">Sports</h2>
          <div className="section-divider"></div>
        </div>

        <div className="triptych-a">
          <div className="video-frame image-large">
            <iframe
              src="https://www.youtube.com/embed/FoBEEFdWhr8"
              title="Liverpool - Firmino Goal"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="image-stack">
            <div className="video-frame">
              <video controls>
                <source src="/photos/GameWinner.mov" type="video/quicktime" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            <div className="section-text">
              <h3>Liverpool</h3>
              <p>
                The first time I went to Liverpool was in January 2019. My brothers and I grew up as diehard Liverpool fans; we'd wake up at 4 a.m. just to make sure we caught every match. After visiting family in Ireland, we finally got the chance to see a game at Anfield. The atmosphere was electric.
              </p>
              
              <h3>Basketball & Beyond</h3>
              <p>
                The Warriors — and especially Stephen Curry — are the reason I fell in love with basketball. Watching them revolutionize the game was mesmerizing. I joined my high school team and played all four years. The buzzer-beater against our rival school remains one of my favorite memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ESSENTIAL #02: IRELAND - Triptych B */}
      <section id="ireland" className="essential-section" data-motif="ireland">
        <div className="section-header">
          <div className="section-number">Essential 02</div>
          <h2 className="section-title">Ireland</h2>
          <div className="section-divider"></div>
        </div>

        <div className="triptych-b">
          <div className="image-stack">
            <div className="section-text">
              <h3>Heritage & Home</h3>
              <p>
                Both of my parents are from Ireland — my dad from Galway and my mom from Dublin. Growing up, I made countless trips there, visiting family and soaking in the culture. Those visits shaped so much of who I am today.
              </p>
              
              <h3>How My Parents Met</h3>
              <p>
                My parents met in a pretty classic Irish way — at a pub in Dublin. My dad was visiting from Galway, and my mom was out with friends. They hit it off immediately, and the rest, as they say, is history.
              </p>
            </div>
            
            <img src="/photos/Parents.png" alt="My Parents" className="studio-image" loading="lazy" />
          </div>
          
          <img src="/photos/Ireland.png" alt="Ireland" className="studio-image image-large" loading="lazy" />
        </div>
      </section>

      {/* INTERSTITIAL SPREAD #1 */}
      <section className="feature-spread">
        <img src="/photos/Albufeira.png" alt="Feature" className="spread-image" loading="lazy" />
        <p className="spread-quote">"Every trip back feels like returning to a second home."</p>
      </section>

      {/* ESSENTIAL #03: FOOD - Triptych A */}
      <section id="food" className="essential-section" data-motif="food">
        <div className="section-callout">
          Sandwiches<br/>Quesadillas<br/>Bakeries
        </div>
        
        <div className="section-header">
          <div className="section-number">Essential 03</div>
          <h2 className="section-title">Food</h2>
          <div className="section-divider"></div>
        </div>

        <div className="triptych-a">
          <img src="/photos/Cooking.png" alt="Cooking" className="studio-image image-large" loading="lazy" />
          
          <div className="image-stack">
            <img src="/photos/Mezzo.png" alt="Mezzo Sandwich" className="studio-image" loading="lazy" />
            
            <div className="section-text">
              <h3>Foodie Trips with Mom</h3>
              <p>
                One of the things my mom and I bond over is food. We love sending each other videos of new "foodie" spots to try, and every other weekend, we'd make the drive to San Francisco to explore delis, bakeries, and hole-in-the-wall gems.
              </p>
              
              <h3>The Best Quesadilla</h3>
              <p>
                The best dish I've ever had was the Oxtail Quesadilla from CookingNStyle. The smokiness of the oxtail combined with the zing of jerk sauce and melted cheese was unreal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ESSENTIAL #04: MUSIC - Triptych B */}
      <section id="music" className="essential-section">
        <div className="section-header">
          <div className="section-number">Essential 04</div>
          <h2 className="section-title">Music</h2>
          <div className="section-divider"></div>
        </div>

        <div className="triptych-b">
          <div className="image-stack">
            <div className="section-text">
              <h3>Pandemic Story</h3>
              <p>
                During the pandemic, I spent a lot of time riding my bike — mornings, afternoons, even late at night — just exploring new areas. One day, I rode farther than ever before, and that was the first time I listened to Blonde and Channel Orange by Frank Ocean. Those albums became instant favorites.
              </p>
              
              <h3>My First Concert</h3>
              <p>
                The first concert I ever went to was during my junior year of high school with my friends — Playboi Carti's Whole Lotta Red Tour in San Francisco. The energy was insane. Half the time, I was vibing to the music; the other half, I was just making sure my friends and I survived the mosh pit.
              </p>
            </div>
            
            <img src="/photos/Carti.png" alt="Playboi Carti Concert" className="studio-image" loading="lazy" />
          </div>
          
          <img src="/photos/Blond.png" alt="Frank Ocean - Blonde" className="studio-image image-large" loading="lazy" />
        </div>
      </section>

      {/* INTERSTITIAL SPREAD #2 */}
      <section className="feature-spread">
        <img src="/photos/Donut.png" alt="Feature" className="spread-image" loading="lazy" />
        <p className="spread-quote">"That ride, with those songs playing for the first time, is something I'll always cherish."</p>
      </section>

      {/* ESSENTIAL #05: CSM→CAL - Triptych A */}
      <section id="college" className="essential-section">
        <div className="section-header">
          <div className="section-number">Essential 05</div>
          <h2 className="section-title">CSM → Cal</h2>
          <div className="section-divider"></div>
        </div>

        <div className="triptych-a">
          <img src="/photos/CSM%20%231.png" alt="CSM" className="studio-image image-large" loading="lazy" />
          
          <div className="image-stack">
            <img src="/photos/CSM%20%232.png" alt="CSM Presentation" className="studio-image" loading="lazy" />
            
            <div className="section-text">
              <h3>Community College</h3>
              <p>
                After high school, I attended the College of San Mateo. Those two years gave me a lot of time for personal, academic, and professional growth. I'm incredibly grateful for that experience — it shaped who I am today.
              </p>
              
              <h3>Voyager Consulting</h3>
              <p>
                One of the most formative experiences during college was working with Voyager Consulting, where I developed real-world business and consulting skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ESSENTIAL #06: DOGS - Triptych B */}
      <section id="dogs" className="essential-section">
        <div className="section-header">
          <div className="section-number">Essential 06</div>
          <h2 className="section-title">Dogs</h2>
          <div className="section-divider"></div>
        </div>

        <div className="triptych-b">
          <div className="image-stack">
            <div className="section-text">
              <h3>Neansai (Mamo)</h3>
              <p>
                Mamo, whose full name is Neansai (pronounced "Nan-see"), is my family's dog back in Ireland. She's a loving, spirited companion who has brought so much joy to our family over the years.
              </p>
              
              <h3>Lucy</h3>
              <p>
                My dog Lucy is a beautiful dog I'm ngl. Fun fact about her is she can run insanely fast. When she was younger, every time our family went to the beach with her, people would come up and ask us how she was so fast.
              </p>
            </div>
            
            <img src="/photos/Mamo.png" alt="Neansai (Mamo)" className="studio-image" loading="lazy" />
          </div>
          
          <img src="/photos/Lucy.png" alt="Lucy" className="studio-image image-large" loading="lazy" />
        </div>
      </section>

      {/* INTERSTITIAL SPREAD #3 */}
      <section className="feature-spread">
        <img src="/photos/Lucy%20Smile.png" alt="Feature" className="spread-image" loading="lazy" />
        <p className="spread-quote">"That smile brings joy to everyone who sees it."</p>
      </section>

      {/* ESSENTIAL #07: MOVIES */}
      <section id="movies" className="essential-section">
        <div className="section-header">
          <div className="section-number">Essential 07</div>
          <h2 className="section-title">Movies</h2>
          <div className="section-divider"></div>
        </div>

        <div className="section-text" style={{ marginBottom: '48px' }}>
          <p>
            Movies have always been a huge part of my life. Whether it's getting lost in a powerful story, appreciating stunning cinematography, or just enjoying a night in with friends, films have shaped my perspective and imagination in countless ways.
          </p>
        </div>

        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '32px' }}>Favorite Clips</h3>
        
        <div className="movie-clips-grid">
          <div className="movie-clip">
            <iframe
              src="https://www.youtube.com/embed/OA3Txp94pjs"
              title="Interstellar - Black Hole"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="movie-clip">
            <iframe
              src="https://www.youtube.com/embed/nVs5f6UMiiE"
              title="Moonlight"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="movie-clip">
            <iframe
              src="https://www.youtube.com/embed/BMCP4O5Hxs8"
              title="Catch Me If You Can"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="movie-clip">
            <iframe
              src="https://www.youtube.com/embed/YFtHjV4c4uw"
              title="The Prestige"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginTop: '80px', marginBottom: '32px' }}>All-Time Favorites</h3>
        
        <div className="movie-posters-grid">
          {MOVIES.map((movie, index) => (
            <img
              key={index}
              src={movie.poster}
              alt={movie.title}
              className="movie-poster"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      {/* ESSENTIAL #08: FASHION - Triptych A */}
      <section id="fashion" className="essential-section">
        <div className="section-header">
          <div className="section-number">Essential 08</div>
          <h2 className="section-title">Fashion</h2>
          <div className="section-divider"></div>
        </div>

        <div className="triptych-a">
          <img src="/photos/Bare%20Knuckles.png" alt="Bare Knuckles Grail" className="studio-image image-large" loading="lazy" />
          
          <div className="image-stack">
            <div className="video-frame">
              <iframe
                src="https://www.youtube.com/embed/_XlbV2WbUZM"
                title="Round 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="section-text">
              <h3>My Grail</h3>
              <p>
                This is one of my 'grails', meaning a piece of clothing I can't wait to someday get my hands on. Fashion has always been a form of self-expression for me.
              </p>
              
              <h3>Round 2 Story</h3>
              <p>
                Growing up, one of the things my older brothers and I bonded over was fashion. Round Two — a clothing store that started in Virginia and later opened in LA during the 2010s — became a big part of that. Eventually, our obsession led us to take a trip down to LA just to visit the store in person.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERSTITIAL SPREAD #4 */}
      <section className="feature-spread">
        <img src="/photos/Brothers.png" alt="Feature" className="spread-image" loading="lazy" />
        <p className="spread-quote">"Fashion became one of the things we bonded over most."</p>
      </section>

      {/* ESSENTIAL #09: SELF/SPIRITUAL GROWTH - With Idols Grid */}
      <section id="growth" className="essential-section">
        <div className="section-header">
          <div className="section-number">Essential 09</div>
          <h2 className="section-title">Self/Spiritual Growth</h2>
          <div className="section-divider"></div>
        </div>

        <div className="section-text" style={{ marginBottom: '48px' }}>
          <h3>The Enneagram</h3>
          <p>
            I first came across the Enneagram in the summer of 2025, and it honestly surprised me how much it clicked. I've never really been the type to get into personality systems or spiritual stuff, but this one just made sense. It helped me understand myself better and gave me a clearer picture of the kind of person I want to become.
          </p>
        </div>
        
        <div className="video-frame" style={{ maxWidth: '600px', margin: '0 auto 64px' }}>
          <iframe
            src="https://www.youtube.com/embed/AT4XdAltZ0k"
            title="Enneagram"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '32px' }}>My Idols</h3>
        
        <div className="idols-grid">
          <div className="idol-item">
            <img src="/photos/Virgil.png" alt="Virgil Van Dijk" className="idol-image" loading="lazy" />
            <p className="idol-caption">
              <strong>Virgil Van Dijk</strong>
              Leadership through composure and excellence.
            </p>
          </div>
          
          <div className="idol-item">
            <img src="/photos/Curry.png" alt="Stephen Curry" className="idol-image" loading="lazy" />
            <p className="idol-caption">
              <strong>Stephen Curry</strong>
              Humility and revolutionizing the game.
            </p>
          </div>
          
          <div className="idol-item">
            <img src="/photos/Erwin.png" alt="Erwin" className="idol-image" loading="lazy" />
            <p className="idol-caption">
              <strong>Erwin (Attack on Titan)</strong>
              Sacrifice and strategic brilliance.
            </p>
          </div>
          
          <div className="idol-item">
            <img src="/photos/Klopp.png" alt="Jurgen Klopp" className="idol-image" loading="lazy" />
            <p className="idol-caption">
              <strong>Jurgen Klopp</strong>
              Passion, authenticity, and building a family.
            </p>
          </div>
        </div>
      </section>

      {/* ESSENTIAL #10: FAMILY - Triptych B */}
      <section id="family" className="essential-section">
        <div className="section-header">
          <div className="section-number">Essential 10</div>
          <h2 className="section-title">Family</h2>
          <div className="section-divider"></div>
        </div>

        <div className="triptych-b">
          <div className="image-stack">
            <div className="section-text">
              <p>
                Family has always been the foundation of who I am. From my parents' Irish roots to my brothers and the memories we've built together, every experience has shaped my values, my perspective, and my journey. These are the people who've supported me, challenged me, and made life meaningful.
              </p>
            </div>
            
            <img src="/photos/Micheal.png" alt="Family Memory" className="studio-image" loading="lazy" />
          </div>
          
          <img src="/photos/Pumpkin%20Patch.png" alt="Family Memory" className="studio-image image-large" loading="lazy" />
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
