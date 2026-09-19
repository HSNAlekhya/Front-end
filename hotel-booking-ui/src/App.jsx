import { useState } from "react";
import "./App.css";

const hotels = [
  {
    id: 1,
    name: "The Grand Palace",
    location: "Bengaluru, Karnataka",
    rating: 4.8,
    reviews: 324,
    price: 4200,
    type: "Luxury Hotel",
    image: "🏨",
    amenities: ["Free WiFi", "Pool", "Breakfast"],
  },
  {
    id: 2,
    name: "Ocean View Resort",
    location: "Goa, India",
    rating: 4.6,
    reviews: 218,
    price: 5600,
    type: "Resort",
    image: "🌴",
    amenities: ["Beach Access", "Pool", "Restaurant"],
  },
  {
    id: 3,
    name: "Green Valley Hotel",
    location: "Hyderabad, Telangana",
    rating: 4.5,
    reviews: 186,
    price: 3200,
    type: "Hotel",
    image: "🏢",
    amenities: ["Free WiFi", "Parking", "Breakfast"],
  },
  {
    id: 4,
    name: "Mountain View Stay",
    location: "Manali, Himachal Pradesh",
    rating: 4.7,
    reviews: 275,
    price: 4800,
    type: "Resort",
    image: "🏔️",
    amenities: ["Mountain View", "Restaurant", "Parking"],
  },
  {
    id: 5,
    name: "City Comfort Inn",
    location: "Chennai, Tamil Nadu",
    rating: 4.3,
    reviews: 142,
    price: 2600,
    type: "Hotel",
    image: "🏙️",
    amenities: ["Free WiFi", "Parking", "AC"],
  },
  {
    id: 6,
    name: "Royal Heritage Hotel",
    location: "Jaipur, Rajasthan",
    rating: 4.9,
    reviews: 412,
    price: 6200,
    type: "Luxury Hotel",
    image: "🏰",
    amenities: ["Pool", "Spa", "Breakfast"],
  },
];

const rooms = [
  {
    id: 1,
    name: "Deluxe Room",
    guests: 2,
    price: 4200,
    size: "320 sq ft",
    bed: "King Bed",
    icon: "🛏️",
  },
  {
    id: 2,
    name: "Premium Suite",
    guests: 3,
    price: 5800,
    size: "480 sq ft",
    bed: "King Bed",
    icon: "🛋️",
  },
  {
    id: 3,
    name: "Family Room",
    guests: 4,
    price: 6800,
    size: "550 sq ft",
    bed: "2 Double Beds",
    icon: "👨‍👩‍👧‍👦",
  },
];

function App() {
  const [page, setPage] = useState("Hotels");
  const [destination, setDestination] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [hotelType, setHotelType] = useState("All");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [booking, setBooking] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2",
    name: "",
    email: "",
    phone: "",
  });

  const filteredHotels = hotels.filter((hotel) => {
    const locationMatch =
      hotel.name.toLowerCase().includes(destination.toLowerCase()) ||
      hotel.location.toLowerCase().includes(destination.toLowerCase());

    const ratingMatch =
      ratingFilter === "All" || hotel.rating >= Number(ratingFilter);

    const priceMatch =
      priceFilter === "All" ||
      (priceFilter === "Under 3000" && hotel.price < 3000) ||
      (priceFilter === "3000-5000" &&
        hotel.price >= 3000 &&
        hotel.price <= 5000) ||
      (priceFilter === "Above 5000" && hotel.price > 5000);

    const typeMatch = hotelType === "All" || hotel.type === hotelType;

    return locationMatch && ratingMatch && priceMatch && typeMatch;
  });

  const handleBookingChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const openRooms = (hotel) => {
    setSelectedHotel(hotel);
    setSelectedRoom(null);
    setPage("Rooms");
    window.scrollTo(0, 0);
  };

  const openBooking = (room) => {
    setSelectedRoom(room);
    setPage("Booking");
    window.scrollTo(0, 0);
  };

  const confirmBooking = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  const goHome = () => {
    setPage("Hotels");
    setSelectedHotel(null);
    setSelectedRoom(null);
    setBookingConfirmed(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <button className="logo" onClick={goHome}>
            <span className="logo-icon">🏨</span>
            <span>
              <strong>StayEase</strong>
              <small>Hotel Booking</small>
            </span>
          </button>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>

          <nav className={mobileMenu ? "nav mobile-open" : "nav"}>
            <button
              className={page === "Hotels" ? "nav-link active" : "nav-link"}
              onClick={() => {
                goHome();
                setMobileMenu(false);
              }}
            >
              Hotels
            </button>

            <button
              className="nav-link"
              onClick={() => {
                setPage("Bookings");
                setMobileMenu(false);
              }}
            >
              My Bookings
            </button>

            <button
              className="nav-link"
              onClick={() => {
                setPage("About");
                setMobileMenu(false);
              }}
            >
              About
            </button>

            <button
              className="profile-button"
              onClick={() => setPage("Profile")}
            >
              <span>AG</span>
              Alex
            </button>
          </nav>
        </div>
      </header>

      {page === "Hotels" && (
        <>
          <section className="hero">
            <div className="hero-content">
              <span className="hero-label">FIND YOUR PERFECT STAY</span>

              <h1>
                Travel more.
                <br />
                <span>Stay better.</span>
              </h1>

              <p>
                Discover comfortable hotels and unforgettable stays at
                destinations around the world.
              </p>
            </div>
          </section>

          <main className="main-container">
            <section className="search-panel">
              <div className="search-field destination-field">
                <label>📍 DESTINATION</label>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className="search-field">
                <label>📅 CHECK-IN</label>
                <input
                  type="date"
                  value={booking.checkIn}
                  onChange={(e) =>
                    setBooking({
                      ...booking,
                      checkIn: e.target.value,
                    })
                  }
                />
              </div>

              <div className="search-field">
                <label>📅 CHECK-OUT</label>
                <input
                  type="date"
                  value={booking.checkOut}
                  onChange={(e) =>
                    setBooking({
                      ...booking,
                      checkOut: e.target.value,
                    })
                  }
                />
              </div>

              <div className="search-field">
                <label>👥 GUESTS</label>
                <select
                  value={booking.guests}
                  onChange={(e) =>
                    setBooking({
                      ...booking,
                      guests: e.target.value,
                    })
                  }
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </div>

              <button className="search-button">Search</button>
            </section>

            <div className="content-layout">
              <aside className="filters">
                <div className="filter-header">
                  <h3>Filters</h3>
                  <button
                    onClick={() => {
                      setRatingFilter("All");
                      setPriceFilter("All");
                      setHotelType("All");
                    }}
                  >
                    Reset
                  </button>
                </div>

                <div className="filter-section">
                  <h4>Price Range</h4>

                  {["All", "Under 3000", "3000-5000", "Above 5000"].map(
                    (option) => (
                      <label className="radio-option" key={option}>
                        <input
                          type="radio"
                          name="price"
                          checked={priceFilter === option}
                          onChange={() => setPriceFilter(option)}
                        />
                        <span>{option === "All" ? "Any Price" : `₹ ${option}`}</span>
                      </label>
                    )
                  )}
                </div>

                <div className="filter-section">
                  <h4>Rating</h4>

                  {["All", "4.5", "4.7", "4.8"].map((rating) => (
                    <label className="radio-option" key={rating}>
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingFilter === rating}
                        onChange={() => setRatingFilter(rating)}
                      />
                      <span>
                        {rating === "All" ? "Any Rating" : `⭐ ${rating}+`}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="filter-section">
                  <h4>Hotel Type</h4>

                  {["All", "Hotel", "Resort", "Luxury Hotel"].map((type) => (
                    <label className="radio-option" key={type}>
                      <input
                        type="radio"
                        name="type"
                        checked={hotelType === type}
                        onChange={() => setHotelType(type)}
                      />
                      <span>{type === "All" ? "All Types" : type}</span>
                    </label>
                  ))}
                </div>

                <div className="filter-promo">
                  <span>✨</span>
                  <strong>Special Offer</strong>
                  <p>Get up to 20% off on selected hotels.</p>
                </div>
              </aside>

              <section className="hotel-section">
                <div className="section-heading">
                  <div>
                    <h2>Available Hotels</h2>
                    <p>{filteredHotels.length} properties found</p>
                  </div>

                  <select className="sort-select">
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Highest Rated</option>
                  </select>
                </div>

                {filteredHotels.length > 0 ? (
                  <div className="hotel-grid">
                    {filteredHotels.map((hotel) => (
                      <div className="hotel-card" key={hotel.id}>
                        <div className="hotel-image">
                          <span className="hotel-emoji">{hotel.image}</span>
                          <span className="favorite">♡</span>
                          <span className="hotel-type">{hotel.type}</span>
                        </div>

                        <div className="hotel-info">
                          <div className="hotel-rating">
                            <span>⭐ {hotel.rating}</span>
                            <small>({hotel.reviews} reviews)</small>
                          </div>

                          <h3>{hotel.name}</h3>

                          <p className="hotel-location">
                            📍 {hotel.location}
                          </p>

                          <div className="amenities">
                            {hotel.amenities.map((amenity) => (
                              <span key={amenity}>{amenity}</span>
                            ))}
                          </div>

                          <div className="hotel-bottom">
                            <div className="hotel-price">
                              <strong>₹{hotel.price.toLocaleString()}</strong>
                              <span>/ night</span>
                            </div>

                            <button
                              className="view-button"
                              onClick={() => openRooms(hotel)}
                            >
                              View Rooms
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-results">
                    <div>🔍</div>
                    <h3>No hotels found</h3>
                    <p>Try changing your search or filters.</p>
                  </div>
                )}
              </section>
            </div>
          </main>
        </>
      )}

      {page === "Rooms" && selectedHotel && (
        <main className="main-container inner-page">
          <button className="back-button" onClick={goHome}>
            ← Back to Hotels
          </button>

          <section className="hotel-detail-header">
            <div className="detail-image">{selectedHotel.image}</div>

            <div>
              <span className="hotel-type">{selectedHotel.type}</span>
              <h1>{selectedHotel.name}</h1>
              <p>📍 {selectedHotel.location}</p>
              <div className="detail-rating">
                ⭐ {selectedHotel.rating}{" "}
                <span>({selectedHotel.reviews} reviews)</span>
              </div>
            </div>
          </section>

          <section className="rooms-section">
            <div className="section-heading">
              <div>
                <h2>Choose Your Room</h2>
                <p>Select a room that suits your stay.</p>
              </div>
            </div>

            <div className="rooms-list">
              {rooms.map((room) => (
                <div className="room-card" key={room.id}>
                  <div className="room-image">{room.icon}</div>

                  <div className="room-details">
                    <h3>{room.name}</h3>

                    <div className="room-features">
                      <span>🛏️ {room.bed}</span>
                      <span>📐 {room.size}</span>
                      <span>👥 Up to {room.guests} guests</span>
                    </div>

                    <p>Free cancellation • Breakfast available</p>
                  </div>

                  <div className="room-price">
                    <strong>₹{room.price.toLocaleString()}</strong>
                    <span>per night</span>

                    <button
                      className="view-button"
                      onClick={() => openBooking(room)}
                    >
                      Select Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {page === "Booking" && selectedHotel && selectedRoom && (
        <main className="main-container inner-page">
          <button
            className="back-button"
            onClick={() => setPage("Rooms")}
          >
            ← Back to Rooms
          </button>

          {!bookingConfirmed ? (
            <div className="booking-layout">
              <section className="booking-form-card">
                <h2>Complete Your Booking</h2>
                <p className="form-subtitle">
                  Enter your details to reserve your room.
                </p>

                <form onSubmit={confirmBooking}>
                  <div className="form-section">
                    <h3>Guest Information</h3>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          name="name"
                          value={booking.name}
                          onChange={handleBookingChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={booking.email}
                          onChange={handleBookingChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={booking.phone}
                          onChange={handleBookingChange}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Guests</label>
                        <select
                          name="guests"
                          value={booking.guests}
                          onChange={handleBookingChange}
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Stay Details</h3>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Check-in</label>
                        <input
                          type="date"
                          name="checkIn"
                          value={booking.checkIn}
                          onChange={handleBookingChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Check-out</label>
                        <input
                          type="date"
                          name="checkOut"
                          value={booking.checkOut}
                          onChange={handleBookingChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button className="confirm-button" type="submit">
                    Confirm Booking
                  </button>
                </form>
              </section>

              <BookingSummary
                hotel={selectedHotel}
                room={selectedRoom}
              />
            </div>
          ) : (
            <div className="confirmation">
              <div className="confirmation-icon">✓</div>

              <h1>Booking Confirmed!</h1>

              <p>
                Your reservation at <strong>{selectedHotel.name}</strong> has
                been successfully confirmed.
              </p>

              <div className="confirmation-card">
                <div>
                  <span>Booking ID</span>
                  <strong>STY-{Math.floor(Math.random() * 900000 + 100000)}</strong>
                </div>

                <div>
                  <span>Guest</span>
                  <strong>{booking.name}</strong>
                </div>

                <div>
                  <span>Room</span>
                  <strong>{selectedRoom.name}</strong>
                </div>

                <div>
                  <span>Guests</span>
                  <strong>{booking.guests}</strong>
                </div>

                <div>
                  <span>Check-in</span>
                  <strong>{booking.checkIn}</strong>
                </div>

                <div>
                  <span>Check-out</span>
                  <strong>{booking.checkOut}</strong>
                </div>
              </div>

              <button className="primary-green-button" onClick={goHome}>
                Browse More Hotels
              </button>
            </div>
          )}
        </main>
      )}

      {page === "Bookings" && (
        <main className="main-container inner-page">
          <div className="simple-page">
            <div className="simple-icon">📋</div>
            <h1>My Bookings</h1>
            <p>
              Your confirmed hotel reservations will appear here.
            </p>
            <button className="primary-green-button" onClick={goHome}>
              Browse Hotels
            </button>
          </div>
        </main>
      )}

      {page === "About" && (
        <main className="main-container inner-page">
          <div className="about-page">
            <span className="hero-label">ABOUT STAYEASE</span>
            <h1>Making hotel booking simple.</h1>
            <p>
              StayEase is a modern hotel booking interface designed to make
              discovering hotels, comparing rooms, and completing a booking
              simple and convenient.
            </p>

            <div className="about-cards">
              <div>
                <span>🏨</span>
                <h3>Quality Stays</h3>
                <p>Discover comfortable stays for every type of trip.</p>
              </div>

              <div>
                <span>🔍</span>
                <h3>Easy Search</h3>
                <p>Find hotels using destinations, ratings and price filters.</p>
              </div>

              <div>
                <span>🔒</span>
                <h3>Simple Booking</h3>
                <p>A straightforward booking experience from search to confirmation.</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {page === "Profile" && (
        <main className="main-container inner-page">
          <div className="profile-page">
            <div className="profile-big-avatar">AG</div>
            <h1>Alex Green</h1>
            <p>alex@example.com</p>

            <div className="profile-details">
              <div>
                <span>Member Since</span>
                <strong>2025</strong>
              </div>

              <div>
                <span>Bookings</span>
                <strong>12</strong>
              </div>

              <div>
                <span>Favorite Hotels</span>
                <strong>5</strong>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

function BookingSummary({ hotel, room }) {
  return (
    <aside className="booking-summary">
      <h3>Booking Summary</h3>

      <div className="summary-hotel">
        <div className="summary-image">{hotel.image}</div>

        <div>
          <strong>{hotel.name}</strong>
          <span>{hotel.location}</span>
        </div>
      </div>

      <div className="summary-room">
        <span>Selected Room</span>
        <strong>{room.name}</strong>
      </div>

      <div className="summary-details">
        <div>
          <span>Room price</span>
          <strong>₹{room.price.toLocaleString()}</strong>
        </div>

        <div>
          <span>Taxes & fees</span>
          <strong>₹{Math.round(room.price * 0.12).toLocaleString()}</strong>
        </div>

        <div>
          <span>Service fee</span>
          <strong>₹299</strong>
        </div>
      </div>

      <div className="summary-total">
        <span>Total</span>
        <strong>
          ₹{(room.price + Math.round(room.price * 0.12) + 299).toLocaleString()}
        </strong>
      </div>

      <p className="secure-text">🔒 Secure booking • Free cancellation</p>
    </aside>
  );
}

export default App;