import { useState } from "react";
import "./App.css";

const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    category: "Beach",
    price: 599,
    rating: 4.9,
    emoji: "🏝️",
    description:
      "Discover tropical beaches, beautiful temples, green rice fields and unforgettable sunsets in Bali.",
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    category: "City",
    price: 899,
    rating: 4.8,
    emoji: "🗼",
    description:
      "Experience romantic streets, famous landmarks, delicious food and the timeless beauty of Paris.",
  },
  {
    id: 3,
    name: "Dubai",
    country: "UAE",
    category: "Luxury",
    price: 749,
    rating: 4.9,
    emoji: "🏙️",
    description:
      "Enjoy luxury shopping, desert adventures, modern architecture and spectacular city views.",
  },
  {
    id: 4,
    name: "Switzerland",
    country: "Europe",
    category: "Mountain",
    price: 1099,
    rating: 4.9,
    emoji: "🏔️",
    description:
      "Explore snow-covered mountains, peaceful villages, beautiful lakes and scenic train journeys.",
  },
  {
    id: 5,
    name: "Maldives",
    country: "Indian Ocean",
    category: "Beach",
    price: 999,
    rating: 5.0,
    emoji: "🌊",
    description:
      "Relax in a tropical paradise surrounded by crystal-clear water, beaches and luxurious resorts.",
  },
  {
    id: 6,
    name: "Tokyo",
    country: "Japan",
    category: "City",
    price: 1199,
    rating: 4.8,
    emoji: "🗾",
    description:
      "Experience Japanese culture, futuristic technology, amazing food and exciting city life.",
  },
  {
    id: 7,
    name: "Manali",
    country: "India",
    category: "Mountain",
    price: 299,
    rating: 4.7,
    emoji: "🏞️",
    description:
      "Enjoy breathtaking Himalayan scenery, adventure activities and peaceful mountain escapes.",
  },
  {
    id: 8,
    name: "Santorini",
    country: "Greece",
    category: "Beach",
    price: 949,
    rating: 4.9,
    emoji: "🏛️",
    description:
      "Explore whitewashed buildings, blue domes, beautiful beaches and spectacular Aegean sunsets.",
  },
];

const packages = [
  {
    id: 1,
    title: "Bali Paradise",
    location: "Bali, Indonesia",
    days: "5 Days / 4 Nights",
    price: 599,
    oldPrice: 749,
    emoji: "🏝️",
    features: [
      "4-star hotel",
      "Daily breakfast",
      "Airport transfer",
      "Island tour",
    ],
  },
  {
    id: 2,
    title: "European Escape",
    location: "Paris & Switzerland",
    days: "8 Days / 7 Nights",
    price: 1299,
    oldPrice: 1599,
    emoji: "🗼",
    features: [
      "Premium hotels",
      "City sightseeing",
      "Train tickets",
      "Daily breakfast",
    ],
  },
  {
    id: 3,
    title: "Dubai Adventure",
    location: "Dubai, UAE",
    days: "4 Days / 3 Nights",
    price: 749,
    oldPrice: 899,
    emoji: "🏙️",
    features: [
      "Luxury hotel",
      "Desert safari",
      "City tour",
      "Airport transfer",
    ],
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedDestination, setSelectedDestination] =
    useState(null);
  const [bookingPackage, setBookingPackage] =
    useState(null);
  const [favorites, setFavorites] = useState([]);

  const categories = [
    "All",
    "Beach",
    "City",
    "Mountain",
    "Luxury",
  ];

  const filteredDestinations =
    destinations.filter((destination) => {
      const categoryMatch =
        category === "All" ||
        destination.category === category;

      const searchMatch =
        destination.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        destination.country
          .toLowerCase()
          .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });

  const toggleFavorite = (id) => {
    setFavorites((oldFavorites) => {
      if (oldFavorites.includes(id)) {
        return oldFavorites.filter(
          (favoriteId) => favoriteId !== id
        );
      }

      return [...oldFavorites, id];
    });
  };

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="app">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">
          ✈️ TravelGo
        </div>

        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#destinations">
            Destinations
          </a>

          <a href="#packages">
            Packages
          </a>

          <a href="#about">
            About
          </a>

        </div>

        <button
          className="nav-button"
          onClick={() =>
            scrollToSection("packages")
          }
        >
          Book Now
        </button>

      </nav>

      {/* HERO */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <span className="hero-label">
            ✨ EXPLORE THE WORLD
          </span>

          <h1>
            Your journey
            <br />
            starts here.
          </h1>

          <p>
            Discover amazing destinations,
            unforgettable experiences and
            carefully designed travel packages
            for your next adventure.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={() =>
                scrollToSection(
                  "destinations"
                )
              }
            >
              Explore Destinations →
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                scrollToSection("packages")
              }
            >
              View Packages
            </button>

          </div>

        </div>

        <div className="hero-art">

          <div className="hero-circle">
            🌍
          </div>

          <div className="floating-card card-one">
            📍 Bali
          </div>

          <div className="floating-card card-two">
            ⭐ 4.9 Rating
          </div>

        </div>

      </section>

      {/* SEARCH */}

      <section className="search-section">

        <div className="search-box">

          <div className="search-item">

            <span>📍</span>

            <div>
              <small>Where to?</small>

              <input
                type="text"
                placeholder="Search destination..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

          </div>

          <button
            className="search-button"
            onClick={() =>
              scrollToSection(
                "destinations"
              )
            }
          >
            🔎 Search
          </button>

        </div>

      </section>

      {/* DESTINATIONS */}

      <section
        className="section"
        id="destinations"
      >

        <div className="section-header">

          <div>

            <span className="section-label">
              POPULAR DESTINATIONS
            </span>

            <h2>
              Explore the world
            </h2>

          </div>

          <p>
            Find your perfect destination
            and start planning your next
            adventure.
          </p>

        </div>

        {/* FILTER */}

        <div className="category-list">

          {categories.map((item) => (

            <button
              key={item}
              className={
                category === item
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() =>
                setCategory(item)
              }
            >
              {item}
            </button>

          ))}

        </div>

        {/* DESTINATION GRID */}

        {filteredDestinations.length ===
        0 ? (

          <div className="no-results">

            <div>🌍</div>

            <h3>
              No destinations found
            </h3>

            <p>
              Try searching for another
              destination.
            </p>

          </div>

        ) : (

          <div className="destination-grid">

            {filteredDestinations.map(
              (destination) => (

                <div
                  className="destination-card"
                  key={destination.id}
                >

                  <div className="destination-image">

                    <span>
                      {destination.emoji}
                    </span>

                    <button
                      className="favorite-button"
                      onClick={() =>
                        toggleFavorite(
                          destination.id
                        )
                      }
                    >
                      {favorites.includes(
                        destination.id
                      )
                        ? "❤️"
                        : "🤍"}
                    </button>

                    <span className="destination-tag">
                      {destination.category}
                    </span>

                  </div>

                  <div className="destination-info">

                    <div className="destination-title">

                      <div>
                        <h3>
                          {destination.name}
                        </h3>

                        <p>
                          📍{" "}
                          {destination.country}
                        </p>
                      </div>

                      <span className="rating">
                        ⭐{" "}
                        {destination.rating}
                      </span>

                    </div>

                    <p className="destination-description">
                      {destination.description}
                    </p>

                    <div className="destination-bottom">

                      <div>

                        <small>
                          Starting from
                        </small>

                        <strong>
                          ${destination.price}
                        </strong>

                        <span>
                          /person
                        </span>

                      </div>

                      <button
                        className="details-button"
                        onClick={() =>
                          setSelectedDestination(
                            destination
                          )
                        }
                      >
                        Details
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>

      {/* PACKAGES */}

      <section
        className="packages-section"
        id="packages"
      >

        <div className="section-header">

          <div>

            <span className="section-label">
              BEST TRAVEL DEALS
            </span>

            <h2>
              Popular packages
            </h2>

          </div>

          <p>
            Carefully planned packages
            for a stress-free holiday.
          </p>

        </div>

        <div className="package-grid">

          {packages.map((travelPackage) => (

            <div
              className="package-card"
              key={travelPackage.id}
            >

              <div className="package-image">

                <span>
                  {travelPackage.emoji}
                </span>

                <div className="offer">
                  SPECIAL OFFER
                </div>

              </div>

              <div className="package-info">

                <h3>
                  {travelPackage.title}
                </h3>

                <p className="package-location">
                  📍 {travelPackage.location}
                </p>

                <p className="package-days">
                  🗓️ {travelPackage.days}
                </p>

                <ul>

                  {travelPackage.features.map(
                    (feature) => (
                      <li key={feature}>
                        ✓ {feature}
                      </li>
                    )
                  )}

                </ul>

                <div className="package-bottom">

                  <div>

                    <span className="old-price">
                      ${travelPackage.oldPrice}
                    </span>

                    <strong>
                      ${travelPackage.price}
                    </strong>

                    <small>
                      /person
                    </small>

                  </div>

                  <button
                    className="book-button"
                    onClick={() =>
                      setBookingPackage(
                        travelPackage
                      )
                    }
                  >
                    Book Now
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* WHY US */}

      <section
        className="why-us"
        id="about"
      >

        <div className="why-content">

          <span className="section-label">
            WHY TRAVELGO?
          </span>

          <h2>
            Travel more.
            <br />
            Worry less.
          </h2>

          <p>
            We make planning your next
            adventure simple, convenient
            and enjoyable.
          </p>

          <div className="features">

            <div className="feature">

              <span>
                🌍
              </span>

              <div>
                <h3>
                  Amazing destinations
                </h3>

                <p>
                  Handpicked places around
                  the world.
                </p>
              </div>

            </div>

            <div className="feature">

              <span>
                💰
              </span>

              <div>
                <h3>
                  Best prices
                </h3>

                <p>
                  Great experiences at
                  affordable prices.
                </p>
              </div>

            </div>

            <div className="feature">

              <span>
                🛡️
              </span>

              <div>
                <h3>
                  Safe & trusted
                </h3>

                <p>
                  Travel confidently with
                  our trusted services.
                </p>
              </div>

            </div>

          </div>

        </div>

        <div className="why-art">
          🧳
        </div>

      </section>

      {/* FAVORITES */}

      <section className="favorites">

        <div className="section-header">

          <div>

            <span className="section-label">
              YOUR SAVED PLACES
            </span>

            <h2>
              ❤️ Favorites
            </h2>

          </div>

        </div>

        {favorites.length === 0 ? (

          <div className="empty-favorites">

            <span>
              🤍
            </span>

            <p>
              You haven't saved any
              destinations yet.
            </p>

          </div>

        ) : (

          <div className="favorite-list">

            {destinations
              .filter((destination) =>
                favorites.includes(
                  destination.id
                )
              )
              .map((destination) => (

                <button
                  key={destination.id}
                  className="favorite-item"
                  onClick={() =>
                    setSelectedDestination(
                      destination
                    )
                  }
                >
                  {destination.emoji}{" "}
                  {destination.name}
                </button>

              ))}

          </div>

        )}

      </section>

      {/* DESTINATION DETAILS MODAL */}

      {selectedDestination && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedDestination(null)
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedDestination(null)
              }
            >
              ×
            </button>

            <div className="modal-image">
              {selectedDestination.emoji}
            </div>

            <div className="modal-content">

              <span className="section-label">
                {selectedDestination.category}
              </span>

              <h2>
                {selectedDestination.name}
              </h2>

              <p className="modal-location">
                📍{" "}
                {selectedDestination.country}
              </p>

              <div className="modal-rating">
                ⭐{" "}
                {selectedDestination.rating}
                {" · "}
                Excellent
              </div>

              <p>
                {selectedDestination.description}
              </p>

              <div className="modal-price">
                <small>
                  Starting from
                </small>

                <strong>
                  ${selectedDestination.price}
                </strong>

                <span>
                  /person
                </span>
              </div>

              <button
                className="primary-button"
                onClick={() => {
                  setBookingPackage({
                    title:
                      selectedDestination.name,
                    location:
                      selectedDestination.country,
                    price:
                      selectedDestination.price,
                  });

                  setSelectedDestination(
                    null
                  );
                }}
              >
                Book This Trip
              </button>

            </div>

          </div>

        </div>

      )}

      {/* BOOKING MODAL */}

      {bookingPackage && (

        <div
          className="modal-overlay"
          onClick={() =>
            setBookingPackage(null)
          }
        >

          <div
            className="booking-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setBookingPackage(null)
              }
            >
              ×
            </button>

            <span className="section-label">
              BOOK YOUR TRIP
            </span>

            <h2>
              {bookingPackage.title}
            </h2>

            <p className="booking-location">
              📍 {bookingPackage.location}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                alert(
                  "Booking request submitted successfully!"
                );

                setBookingPackage(null);
              }}
            >

              <label>
                Full Name

                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                />

              </label>

              <label>
                Email

                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                />

              </label>

              <label>
                Travel Date

                <input
                  type="date"
                  required
                />

              </label>

              <label>
                Number of Travelers

                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  required
                />

              </label>

              <div className="booking-total">

                <span>
                  Starting price
                </span>

                <strong>
                  ${bookingPackage.price}
                  /person
                </strong>

              </div>

              <button
                className="book-submit"
                type="submit"
              >
                Confirm Booking
              </button>

            </form>

          </div>

        </div>

      )}

      {/* FOOTER */}

      <footer>

        <div className="footer-logo">
          ✈️ TravelGo
        </div>

        <p>
          Discover the world. Create
          unforgettable memories.
        </p>

        <small>
          © 2026 TravelGo · Built with
          React + Vite
        </small>

      </footer>

    </div>
  );
}

export default App;