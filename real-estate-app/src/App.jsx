import { useState } from "react";
import "./App.css";

const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Vijayawada, Andhra Pradesh",
    type: "Villa",
    price: 12500000,
    bedrooms: 4,
    bathrooms: 3,
    area: "2,400 sq.ft",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    description:
      "A beautiful modern villa with spacious rooms, premium interiors, garden space and parking.",
    amenities: ["Parking", "Garden", "Swimming Pool", "Security"],
  },
  {
    id: 2,
    title: "Premium City Apartment",
    location: "Hyderabad, Telangana",
    type: "Apartment",
    price: 6800000,
    bedrooms: 3,
    bathrooms: 2,
    area: "1,650 sq.ft",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
    description:
      "A premium apartment located close to shopping centers, offices and public transportation.",
    amenities: ["Parking", "Gym", "Security", "Lift"],
  },
  {
    id: 3,
    title: "Elegant Family House",
    location: "Bhimavaram, Andhra Pradesh",
    type: "House",
    price: 8500000,
    bedrooms: 3,
    bathrooms: 2,
    area: "1,900 sq.ft",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
    description:
      "Comfortable family house in a peaceful neighborhood with excellent connectivity.",
    amenities: ["Parking", "Garden", "Water Supply", "Security"],
  },
  {
    id: 4,
    title: "Affordable Modern Apartment",
    location: "Visakhapatnam, Andhra Pradesh",
    type: "Apartment",
    price: 4500000,
    bedrooms: 2,
    bathrooms: 2,
    area: "1,200 sq.ft",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80",
    description:
      "A modern apartment with excellent natural lighting and convenient city access.",
    amenities: ["Parking", "Lift", "Security", "Power Backup"],
  },
  {
    id: 5,
    title: "Spacious Independent House",
    location: "Eluru, Andhra Pradesh",
    type: "House",
    price: 7200000,
    bedrooms: 4,
    bathrooms: 3,
    area: "2,100 sq.ft",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
    description:
      "A spacious independent house suitable for a large family with a peaceful environment.",
    amenities: ["Parking", "Garden", "Terrace", "Security"],
  },
  {
    id: 6,
    title: "Luxury Beach Villa",
    location: "Visakhapatnam, Andhra Pradesh",
    type: "Villa",
    price: 15000000,
    bedrooms: 5,
    bathrooms: 4,
    area: "3,000 sq.ft",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80",
    description:
      "A luxurious villa with premium interiors, large outdoor space and beautiful surroundings.",
    amenities: ["Swimming Pool", "Garden", "Parking", "Security"],
  },
];

function formatPrice(price) {
  return `₹${(price / 100000).toFixed(0)} Lakh`;
}

function App() {
  const [page, setPage] = useState("home");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [maxPrice, setMaxPrice] = useState("All");
  const [bedrooms, setBedrooms] = useState("All");

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const openProperty = (property) => {
    setSelectedProperty(property);
    setPage("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(search.toLowerCase()) ||
      property.location.toLowerCase().includes(search.toLowerCase());

    const matchesType = type === "All" || property.type === type;

    const matchesPrice =
      maxPrice === "All" || property.price <= Number(maxPrice);

    const matchesBedrooms =
      bedrooms === "All" || property.bedrooms >= Number(bedrooms);

    return (
      matchesSearch &&
      matchesType &&
      matchesPrice &&
      matchesBedrooms
    );
  });

  const favoriteProperties = properties.filter((property) =>
    favorites.includes(property.id)
  );

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo" onClick={() => setPage("home")}>
          🏠 <span>Dream</span>Estate
        </div>

        <nav>
          <button
            className={page === "home" ? "active" : ""}
            onClick={() => setPage("home")}
          >
            Home
          </button>

          <button
            className={page === "properties" ? "active" : ""}
            onClick={() => setPage("properties")}
          >
            Properties
          </button>

          <button
            className={page === "favorites" ? "active" : ""}
            onClick={() => setPage("favorites")}
          >
            ❤️ Favorites
            {favorites.length > 0 && (
              <span className="favorite-count">{favorites.length}</span>
            )}
          </button>

          <button
            className={page === "about" ? "active" : ""}
            onClick={() => setPage("about")}
          >
            About
          </button>
        </nav>

        <button className="agent-btn">List Your Property</button>
      </header>

      {page === "home" && (
        <>
          <section className="hero">
            <div className="hero-content">
              <span className="hero-tag">FIND YOUR DREAM HOME</span>

              <h1>
                Find a Place
                <br />
                You Can <span>Call Home</span>
              </h1>

              <p>
                Discover beautiful properties in your favorite locations.
                Search, compare and find your perfect home.
              </p>

              <button
                className="primary-btn"
                onClick={() => setPage("properties")}
              >
                Explore Properties →
              </button>
            </div>
          </section>

          <section className="search-section">
            <div className="search-box">
              <div className="search-field">
                <label>📍 Location</label>
                <input
                  type="text"
                  placeholder="Search location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="search-field">
                <label>🏠 Property Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>

              <div className="search-field">
                <label>💰 Maximum Price</label>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                >
                  <option value="All">Any Price</option>
                  <option value="5000000">₹50 Lakh</option>
                  <option value="7500000">₹75 Lakh</option>
                  <option value="10000000">₹1 Crore</option>
                  <option value="15000000">₹1.5 Crore</option>
                </select>
              </div>

              <button
                className="search-btn"
                onClick={() => setPage("properties")}
              >
                🔍 Search
              </button>
            </div>
          </section>

          <section className="section">
            <div className="section-heading">
              <div>
                <span className="small-title">EXPLORE</span>
                <h2>Featured Properties</h2>
              </div>

              <button
                className="view-all"
                onClick={() => setPage("properties")}
              >
                View All →
              </button>
            </div>

            <div className="property-grid">
              {properties.slice(0, 3).map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  openProperty={openProperty}
                />
              ))}
            </div>
          </section>

          <section className="why-section">
            <span className="small-title">WHY CHOOSE US</span>
            <h2>Everything You Need to Find Your Home</h2>

            <div className="why-grid">
              <div className="why-card">
                <div>🔍</div>
                <h3>Easy Search</h3>
                <p>
                  Quickly find properties using powerful search and filters.
                </p>
              </div>

              <div className="why-card">
                <div>🏡</div>
                <h3>Verified Properties</h3>
                <p>
                  Explore carefully selected properties with complete details.
                </p>
              </div>

              <div className="why-card">
                <div>🤝</div>
                <h3>Trusted Agents</h3>
                <p>
                  Connect with property agents and get professional support.
                </p>
              </div>

              <div className="why-card">
                <div>❤️</div>
                <h3>Save Favorites</h3>
                <p>
                  Save properties you love and easily view them later.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {page === "properties" && (
        <section className="page-section">
          <div className="page-title">
            <span className="small-title">DISCOVER</span>
            <h1>Properties</h1>
            <p>Find your perfect property from our collection.</p>
          </div>

          <div className="filter-panel">
            <div>
              <label>Search</label>
              <input
                type="text"
                placeholder="Property or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <label>Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            <div>
              <label>Maximum Price</label>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              >
                <option value="All">Any Price</option>
                <option value="5000000">₹50 Lakh</option>
                <option value="7500000">₹75 Lakh</option>
                <option value="10000000">₹1 Crore</option>
                <option value="15000000">₹1.5 Crore</option>
              </select>
            </div>

            <div>
              <label>Bedrooms</label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              >
                <option value="All">Any</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>
          </div>

          <div className="results-info">
            <h2>{filteredProperties.length} Properties Found</h2>
            <button
              onClick={() => {
                setSearch("");
                setType("All");
                setMaxPrice("All");
                setBedrooms("All");
              }}
            >
              Reset Filters
            </button>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="property-grid">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  openProperty={openProperty}
                />
              ))}
            </div>
          ) : (
            <div className="empty">
              <div>🏠</div>
              <h2>No Properties Found</h2>
              <p>Try changing your search filters.</p>
            </div>
          )}
        </section>
      )}

      {page === "details" && selectedProperty && (
        <section className="page-section details-page">
          <button className="back-btn" onClick={() => setPage("properties")}>
            ← Back to Properties
          </button>

          <div className="details-image">
            <img src={selectedProperty.image} alt={selectedProperty.title} />

            <button
              className={`details-favorite ${
                favorites.includes(selectedProperty.id) ? "saved" : ""
              }`}
              onClick={() => toggleFavorite(selectedProperty.id)}
            >
              {favorites.includes(selectedProperty.id) ? "♥" : "♡"}
            </button>
          </div>

          <div className="details-content">
            <div className="details-main">
              <span className="property-type">
                {selectedProperty.type}
              </span>

              <h1>{selectedProperty.title}</h1>

              <p className="location">
                📍 {selectedProperty.location}
              </p>

              <div className="details-stats">
                <div>
                  <strong>🛏️ {selectedProperty.bedrooms}</strong>
                  <span>Bedrooms</span>
                </div>

                <div>
                  <strong>🚿 {selectedProperty.bathrooms}</strong>
                  <span>Bathrooms</span>
                </div>

                <div>
                  <strong>📐 {selectedProperty.area}</strong>
                  <span>Area</span>
                </div>

                <div>
                  <strong>⭐ {selectedProperty.rating}</strong>
                  <span>Rating</span>
                </div>
              </div>

              <h2>About This Property</h2>
              <p className="description">
                {selectedProperty.description}
              </p>

              <h2>Amenities</h2>

              <div className="amenities">
                {selectedProperty.amenities.map((amenity) => (
                  <span key={amenity}>✓ {amenity}</span>
                ))}
              </div>
            </div>

            <div className="price-card">
              <span>Property Price</span>
              <h2>{formatPrice(selectedProperty.price)}</h2>

              <button className="primary-btn full">
                📞 Contact Agent
              </button>

              <button
                className="outline-btn full"
                onClick={() => toggleFavorite(selectedProperty.id)}
              >
                {favorites.includes(selectedProperty.id)
                  ? "♥ Remove Favorite"
                  : "♡ Add to Favorites"}
              </button>

              <div className="agent">
                <div className="agent-avatar">👨</div>
                <div>
                  <strong>Rajesh Kumar</strong>
                  <span>Property Agent</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {page === "favorites" && (
        <section className="page-section">
          <div className="page-title">
            <span className="small-title">SAVED</span>
            <h1>My Favorites ❤️</h1>
            <p>Properties you have saved for later.</p>
          </div>

          {favoriteProperties.length > 0 ? (
            <div className="property-grid">
              {favoriteProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  openProperty={openProperty}
                />
              ))}
            </div>
          ) : (
            <div className="empty">
              <div>♡</div>
              <h2>No Favorites Yet</h2>
              <p>
                Click the heart icon on a property to save it here.
              </p>

              <button
                className="primary-btn"
                onClick={() => setPage("properties")}
              >
                Explore Properties
              </button>
            </div>
          )}
        </section>
      )}

      {page === "about" && (
        <section className="page-section about-page">
          <div className="page-title">
            <span className="small-title">ABOUT US</span>
            <h1>Find Your Dream Home</h1>
          </div>

          <div className="about-content">
            <div>
              <h2>Welcome to DreamEstate</h2>
              <p>
                DreamEstate is a modern real estate platform designed to
                make property discovery simple and convenient.
              </p>
              <p>
                Browse properties, use filters to narrow your search,
                view detailed property information and save your favorite
                properties.
              </p>
            </div>

            <div className="about-stat">
              <strong>500+</strong>
              <span>Properties</span>

              <strong>150+</strong>
              <span>Locations</span>

              <strong>100+</strong>
              <span>Trusted Agents</span>
            </div>
          </div>
        </section>
      )}

      <footer>
        <div className="footer-logo">🏠 DreamEstate</div>
        <p>Find your dream home with confidence.</p>
        <p>© 2026 DreamEstate. All rights reserved.</p>
      </footer>
    </div>
  );
}

function PropertyCard({
  property,
  favorites,
  toggleFavorite,
  openProperty,
}) {
  const isFavorite = favorites.includes(property.id);

  return (
    <div className="property-card">
      <div className="property-image">
        <img src={property.image} alt={property.title} />

        <span className="type-badge">{property.type}</span>

        <button
          className={`heart-btn ${isFavorite ? "saved" : ""}`}
          onClick={() => toggleFavorite(property.id)}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="property-info">
        <div className="property-top">
          <h3>{property.title}</h3>
          <span className="rating">⭐ {property.rating}</span>
        </div>

        <p className="property-location">
          📍 {property.location}
        </p>

        <div className="property-details">
          <span>🛏️ {property.bedrooms} Beds</span>
          <span>🚿 {property.bathrooms} Baths</span>
          <span>📐 {property.area}</span>
        </div>

        <div className="property-bottom">
          <strong>{formatPrice(property.price)}</strong>

          <button onClick={() => openProperty(property)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;