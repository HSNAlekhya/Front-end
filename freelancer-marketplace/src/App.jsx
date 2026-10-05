import { useMemo, useState } from "react";
import "./App.css";

const freelancers = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Full Stack Developer",
    category: "Development",
    rating: 4.9,
    reviews: 124,
    price: 35,
    location: "India",
    skills: ["React", "Node.js", "MongoDB"],
    avatar: "AS",
    bio: "Full stack developer specializing in modern web applications, responsive interfaces and scalable APIs.",
    services: [
      "React Website Development",
      "Full Stack Web Application",
      "REST API Development",
    ],
  },
  {
    id: 2,
    name: "Priya Reddy",
    role: "UI/UX Designer",
    category: "Design",
    rating: 4.8,
    reviews: 98,
    price: 30,
    location: "India",
    skills: ["Figma", "UI Design", "UX Research"],
    avatar: "PR",
    bio: "Creative UI/UX designer focused on clean, modern and user-friendly digital experiences.",
    services: [
      "Website UI Design",
      "Mobile App UI Design",
      "Figma Prototype",
    ],
  },
  {
    id: 3,
    name: "Daniel Wilson",
    role: "Digital Marketing Expert",
    category: "Marketing",
    rating: 4.7,
    reviews: 76,
    price: 25,
    location: "United Kingdom",
    skills: ["SEO", "Google Ads", "Social Media"],
    avatar: "DW",
    bio: "Digital marketing specialist helping businesses increase traffic, leads and online visibility.",
    services: [
      "SEO Optimization",
      "Google Ads Campaign",
      "Social Media Marketing",
    ],
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "Content Writer",
    category: "Writing",
    rating: 4.9,
    reviews: 145,
    price: 20,
    location: "India",
    skills: ["Blog Writing", "Copywriting", "SEO"],
    avatar: "SK",
    bio: "Professional content writer creating engaging, SEO-friendly and conversion-focused content.",
    services: [
      "SEO Blog Writing",
      "Website Content",
      "Product Descriptions",
    ],
  },
  {
    id: 5,
    name: "Michael Chen",
    role: "Mobile App Developer",
    category: "Development",
    rating: 4.8,
    reviews: 87,
    price: 40,
    location: "Singapore",
    skills: ["React Native", "Flutter", "Firebase"],
    avatar: "MC",
    bio: "Mobile developer building high-performance Android and iOS applications.",
    services: [
      "React Native App",
      "Flutter Application",
      "Firebase Integration",
    ],
  },
  {
    id: 6,
    name: "Olivia Brown",
    role: "Graphic Designer",
    category: "Design",
    rating: 4.6,
    reviews: 63,
    price: 22,
    location: "United States",
    skills: ["Photoshop", "Illustrator", "Branding"],
    avatar: "OB",
    bio: "Graphic designer creating memorable branding, social media designs and marketing materials.",
    services: [
      "Logo Design",
      "Social Media Design",
      "Brand Identity",
    ],
  },
];

const categories = [
  {
    name: "Development",
    icon: "💻",
    description: "Websites, apps and software",
  },
  {
    name: "Design",
    icon: "🎨",
    description: "UI/UX, graphics and branding",
  },
  {
    name: "Marketing",
    icon: "📈",
    description: "SEO, ads and social media",
  },
  {
    name: "Writing",
    icon: "✍️",
    description: "Articles, blogs and copywriting",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredFreelancers = useMemo(() => {
    return freelancers.filter((freelancer) => {
      const text = `
        ${freelancer.name}
        ${freelancer.role}
        ${freelancer.category}
        ${freelancer.skills.join(" ")}
        ${freelancer.services.join(" ")}
      `.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || freelancer.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const favoriteFreelancers = freelancers.filter((freelancer) =>
    favorites.includes(freelancer.id)
  );

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const openFreelancer = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setPage("profile");
  };

  const openService = (freelancer, service) => {
    setSelectedFreelancer(freelancer);
    setSelectedService(service);
    setPage("service");
  };

  const goHome = () => {
    setPage("home");
    setSelectedFreelancer(null);
    setSelectedService(null);
    setMenuOpen(false);
  };

  const goFreelancers = () => {
    setPage("freelancers");
    setMenuOpen(false);
  };

  const goFavorites = () => {
    setPage("favorites");
    setMenuOpen(false);
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="nav-inner">
          <button className="logo" onClick={goHome}>
            <span className="logo-mark">F</span>
            <span>FreelanceHub</span>
          </button>

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            <button onClick={goHome}>Home</button>
            <button onClick={goFreelancers}>Find Freelancers</button>
            <button onClick={() => setPage("services")}>Services</button>
            <button onClick={goFavorites}>
              Favorites
              {favorites.length > 0 && (
                <span className="nav-badge">{favorites.length}</span>
              )}
            </button>
          </nav>

          <div className="nav-actions">
            <button className="login-btn" onClick={() => setShowProfile(true)}>
              Log In
            </button>
            <button className="signup-btn" onClick={() => setShowProfile(true)}>
              Join Now
            </button>
          </div>
        </div>
      </header>

      {page === "home" && (
        <main>
          <section className="hero">
            <div className="hero-content">
              <span className="hero-tag">FIND TALENT. GET WORK DONE.</span>

              <h1>
                Find the perfect freelancer
                <span> for your next project.</span>
              </h1>

              <p>
                Connect with talented freelancers from around the world and
                bring your ideas to life.
              </p>

              <div className="hero-search">
                <span>🔍</span>

                <input
                  type="text"
                  placeholder="Search for services, skills or freelancers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button
                  onClick={() => {
                    setPage("freelancers");
                    setCategory("All");
                  }}
                >
                  Search
                </button>
              </div>

              <div className="popular-searches">
                <span>Popular:</span>
                <button
                  onClick={() => {
                    setSearch("React");
                    setPage("freelancers");
                  }}
                >
                  React
                </button>
                <button
                  onClick={() => {
                    setSearch("UI Design");
                    setPage("freelancers");
                  }}
                >
                  UI Design
                </button>
                <button
                  onClick={() => {
                    setSearch("SEO");
                    setPage("freelancers");
                  }}
                >
                  SEO
                </button>
                <button
                  onClick={() => {
                    setSearch("Content Writing");
                    setPage("freelancers");
                  }}
                >
                  Content Writing
                </button>
              </div>
            </div>

            <div className="hero-card">
              <div className="floating-card card-one">
                <div className="small-avatar">AS</div>
                <div>
                  <strong>Web Developer</strong>
                  <span>★★★★★ 4.9</span>
                </div>
              </div>

              <div className="hero-illustration">
                <div className="illustration-circle">💻</div>
                <div className="illustration-person">👩🏻‍💻</div>
              </div>

              <div className="floating-card card-two">
                <span className="check">✓</span>
                <div>
                  <strong>Project Completed</strong>
                  <span>Successfully delivered</span>
                </div>
              </div>
            </div>
          </section>

          <section className="stats-section">
            <div>
              <strong>10K+</strong>
              <span>Freelancers</span>
            </div>
            <div>
              <strong>25K+</strong>
              <span>Services</span>
            </div>
            <div>
              <strong>15K+</strong>
              <span>Projects Completed</span>
            </div>
            <div>
              <strong>4.8/5</strong>
              <span>Average Rating</span>
            </div>
          </section>

          <section className="section">
            <div className="section-heading">
              <div>
                <span className="section-label">EXPLORE</span>
                <h2>Popular Categories</h2>
              </div>

              <button
                className="view-all"
                onClick={() => setPage("services")}
              >
                View all →
              </button>
            </div>

            <div className="category-grid">
              {categories.map((item) => (
                <button
                  className="category-card"
                  key={item.name}
                  onClick={() => {
                    setCategory(item.name);
                    setPage("freelancers");
                  }}
                >
                  <div className="category-icon">{item.icon}</div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span>Explore →</span>
                </button>
              ))}
            </div>
          </section>

          <section className="section light-section">
            <div className="section-heading">
              <div>
                <span className="section-label">TOP TALENT</span>
                <h2>Featured Freelancers</h2>
              </div>

              <button className="view-all" onClick={goFreelancers}>
                View all →
              </button>
            </div>

            <div className="freelancer-grid">
              {freelancers.slice(0, 4).map((freelancer) => (
                <FreelancerCard
                  key={freelancer.id}
                  freelancer={freelancer}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  openFreelancer={openFreelancer}
                />
              ))}
            </div>
          </section>

          <section className="cta-section">
            <div>
              <span className="section-label">ARE YOU A FREELANCER?</span>
              <h2>Turn your skills into opportunities.</h2>
              <p>
                Create your profile, showcase your services and connect with
                clients looking for your expertise.
              </p>
            </div>

            <button onClick={() => setShowProfile(true)}>
              Become a Freelancer →
            </button>
          </section>
        </main>
      )}

      {page === "freelancers" && (
        <main className="page-container">
          <div className="page-header">
            <span className="section-label">TALENT MARKETPLACE</span>
            <h1>Find Freelancers</h1>
            <p>
              Search and connect with skilled professionals for your project.
            </p>
          </div>

          <div className="search-toolbar">
            <div className="main-search">
              <span>🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search freelancers, skills or services..."
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="results-row">
            <strong>{filteredFreelancers.length} freelancers found</strong>

            <button
              className="clear-filter"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>

          <div className="freelancer-grid">
            {filteredFreelancers.map((freelancer) => (
              <FreelancerCard
                key={freelancer.id}
                freelancer={freelancer}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                openFreelancer={openFreelancer}
              />
            ))}
          </div>

          {filteredFreelancers.length === 0 && (
            <div className="empty-state">
              <div>🔎</div>
              <h2>No freelancers found</h2>
              <p>Try another keyword or category.</p>
            </div>
          )}
        </main>
      )}

      {page === "services" && (
        <main className="page-container">
          <div className="page-header">
            <span className="section-label">SERVICES</span>
            <h1>Explore Services</h1>
            <p>Find professional services for almost any project.</p>
          </div>

          <div className="service-category-grid">
            {categories.map((item) => (
              <div className="large-category" key={item.name}>
                <div className="category-icon">{item.icon}</div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>

                <div className="service-list">
                  {freelancers
                    .filter((f) => f.category === item.name)
                    .flatMap((f) =>
                      f.services.map((service) => ({
                        service,
                        freelancer: f,
                      }))
                    )
                    .slice(0, 4)
                    .map((item, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          openService(item.freelancer, item.service)
                        }
                      >
                        {item.service}
                        <span>→</span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {page === "favorites" && (
        <main className="page-container">
          <div className="page-header">
            <span className="section-label">SAVED TALENT</span>
            <h1>My Favorites</h1>
            <p>Freelancers you have saved for later.</p>
          </div>

          {favoriteFreelancers.length > 0 ? (
            <div className="freelancer-grid">
              {favoriteFreelancers.map((freelancer) => (
                <FreelancerCard
                  key={freelancer.id}
                  freelancer={freelancer}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  openFreelancer={openFreelancer}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div>♡</div>
              <h2>No favorites yet</h2>
              <p>Save freelancers you want to work with later.</p>
              <button onClick={goFreelancers}>Find Freelancers</button>
            </div>
          )}
        </main>
      )}

      {page === "profile" && selectedFreelancer && (
        <main className="page-container">
          <button className="back-button" onClick={goFreelancers}>
            ← Back to freelancers
          </button>

          <section className="profile-page">
            <div className="profile-main">
              <div className="profile-cover"></div>

              <div className="profile-content">
                <div className="profile-top">
                  <div className="profile-avatar">
                    {selectedFreelancer.avatar}
                  </div>

                  <div className="profile-info">
                    <div className="verified">✓ Verified Freelancer</div>
                    <h1>{selectedFreelancer.name}</h1>
                    <h3>{selectedFreelancer.role}</h3>

                    <div className="profile-meta">
                      <span>⭐ {selectedFreelancer.rating}</span>
                      <span>
                        {selectedFreelancer.reviews} reviews
                      </span>
                      <span>📍 {selectedFreelancer.location}</span>
                    </div>
                  </div>

                  <button
                    className="heart-large"
                    onClick={() =>
                      toggleFavorite(selectedFreelancer.id)
                    }
                  >
                    {favorites.includes(selectedFreelancer.id) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="profile-section">
                  <h2>About Me</h2>
                  <p>{selectedFreelancer.bio}</p>
                </div>

                <div className="profile-section">
                  <h2>Skills</h2>

                  <div className="skill-tags">
                    {selectedFreelancer.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="profile-section">
                  <h2>Services</h2>

                  <div className="profile-services">
                    {selectedFreelancer.services.map((service) => (
                      <button
                        key={service}
                        onClick={() =>
                          openService(selectedFreelancer, service)
                        }
                      >
                        <span>{service}</span>
                        <span>→</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <aside className="profile-sidebar">
              <div className="hire-card">
                <span>Starting from</span>
                <strong>${selectedFreelancer.price}</strong>
                <small>per hour</small>

                <button onClick={() => setShowProfile(true)}>
                  Contact Freelancer
                </button>

                <button
                  className="secondary-button"
                  onClick={() => setShowProfile(true)}
                >
                  Send Message
                </button>

                <div className="hire-features">
                  <span>✓ Fast response</span>
                  <span>✓ Professional service</span>
                  <span>✓ Secure communication</span>
                </div>
              </div>
            </aside>
          </section>
        </main>
      )}

      {page === "service" && selectedFreelancer && selectedService && (
        <main className="page-container">
          <button
            className="back-button"
            onClick={() => setPage("profile")}
          >
            ← Back to profile
          </button>

          <section className="service-detail">
            <div className="service-detail-main">
              <span className="service-category">
                {selectedFreelancer.category}
              </span>

              <h1>{selectedService}</h1>

              <div className="service-freelancer">
                <div className="small-avatar">
                  {selectedFreelancer.avatar}
                </div>

                <div>
                  <strong>{selectedFreelancer.name}</strong>
                  <span>{selectedFreelancer.role}</span>
                </div>
              </div>

              <div className="service-image">💼</div>

              <h2>About this service</h2>

              <p>
                Get professional {selectedService.toLowerCase()} from{" "}
                {selectedFreelancer.name}. This service is designed to deliver
                quality results, clear communication and a professional
                experience from start to finish.
              </p>

              <h2>What's included</h2>

              <div className="included-grid">
                <div>✓ Professional consultation</div>
                <div>✓ High-quality delivery</div>
                <div>✓ Revisions included</div>
                <div>✓ Clear communication</div>
              </div>
            </div>

            <aside className="service-order-card">
              <span>Starting price</span>
              <strong>${selectedFreelancer.price}</strong>
              <small>Hourly rate</small>

              <button onClick={() => setShowProfile(true)}>
                Contact Freelancer
              </button>

              <div className="service-rating">
                ⭐ {selectedFreelancer.rating} (
                {selectedFreelancer.reviews} reviews)
              </div>
            </aside>
          </section>
        </main>
      )}

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <button className="footer-logo" onClick={goHome}>
              <span className="logo-mark">F</span>
              FreelanceHub
            </button>

            <p>
              Connect with talented freelancers and find the right skills for
              your next project.
            </p>
          </div>

          <div>
            <h4>Marketplace</h4>
            <button onClick={goFreelancers}>Find Freelancers</button>
            <button onClick={() => setPage("services")}>Services</button>
            <button onClick={goFavorites}>Favorites</button>
          </div>

          <div>
            <h4>Company</h4>
            <button>About Us</button>
            <button>How It Works</button>
            <button>Contact</button>
          </div>

          <div>
            <h4>For Freelancers</h4>
            <button onClick={() => setShowProfile(true)}>
              Become a Freelancer
            </button>
            <button>Community</button>
            <button>Resources</button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 FreelanceHub. All rights reserved.</span>
          <span>Built with React + Vite</span>
        </div>
      </footer>

      {showProfile && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowProfile(false)}
            >
              ×
            </button>

            <div className="modal-icon">🚀</div>

            <h2>Welcome to FreelanceHub</h2>

            <p>
              This is a frontend marketplace demo. Login, registration,
              messaging and payments can be connected to a backend later.
            </p>

            <button
              className="modal-button"
              onClick={() => setShowProfile(false)}
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FreelancerCard({
  freelancer,
  favorites,
  toggleFavorite,
  openFreelancer,
}) {
  return (
    <article className="freelancer-card">
      <div className="card-top">
        <div
          className="freelancer-avatar"
          onClick={() => openFreelancer(freelancer)}
        >
          {freelancer.avatar}
        </div>

        <button
          className="favorite-button"
          onClick={() => toggleFavorite(freelancer.id)}
        >
          {favorites.includes(freelancer.id) ? "♥" : "♡"}
        </button>
      </div>

      <div
        className="freelancer-info"
        onClick={() => openFreelancer(freelancer)}
      >
        <div className="verified-small">✓ Verified</div>

        <h3>{freelancer.name}</h3>

        <p className="role">{freelancer.role}</p>

        <div className="rating">
          <span>★</span>
          <strong>{freelancer.rating}</strong>
          <small>({freelancer.reviews})</small>
        </div>

        <div className="skill-tags">
          {freelancer.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>

      <div className="card-bottom">
        <div>
          <small>Starting at</small>
          <strong>${freelancer.price}/hr</strong>
        </div>

        <button onClick={() => openFreelancer(freelancer)}>
          View Profile
        </button>
      </div>
    </article>
  );
}

export default App;