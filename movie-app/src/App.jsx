import { useState } from "react";
import "./App.css";

const movies = [
  {
    id: 1,
    title: "The Last Journey",
    category: "Action",
    year: 2025,
    rating: 8.7,
    duration: "2h 18m",
    emoji: "🚀",
    description:
      "A fearless explorer begins an unforgettable journey across a mysterious world.",
  },
  {
    id: 2,
    title: "City Lights",
    category: "Drama",
    year: 2024,
    rating: 8.2,
    duration: "2h 05m",
    emoji: "🌃",
    description:
      "A young artist discovers friendship, ambition and love while chasing a dream.",
  },
  {
    id: 3,
    title: "Shadow Mission",
    category: "Action",
    year: 2025,
    rating: 9.0,
    duration: "2h 25m",
    emoji: "🕵️",
    description:
      "An undercover agent must stop a dangerous organization before it is too late.",
  },
  {
    id: 4,
    title: "Ocean Heart",
    category: "Romance",
    year: 2023,
    rating: 7.9,
    duration: "1h 58m",
    emoji: "🌊",
    description:
      "Two strangers meet near the ocean and discover that their lives are connected.",
  },
  {
    id: 5,
    title: "Lost Kingdom",
    category: "Adventure",
    year: 2024,
    rating: 8.8,
    duration: "2h 30m",
    emoji: "🏰",
    description:
      "A group of adventurers searches for a legendary kingdom hidden beyond the mountains.",
  },
  {
    id: 6,
    title: "Midnight Mystery",
    category: "Thriller",
    year: 2025,
    rating: 8.5,
    duration: "2h 10m",
    emoji: "🌙",
    description:
      "A detective receives a mysterious message that leads to a dangerous investigation.",
  },
  {
    id: 7,
    title: "Galaxy Wars",
    category: "Sci-Fi",
    year: 2024,
    rating: 9.1,
    duration: "2h 42m",
    emoji: "🌌",
    description:
      "A team of space pilots fights to protect humanity from an approaching alien force.",
  },
  {
    id: 8,
    title: "Funny Neighbors",
    category: "Comedy",
    year: 2023,
    rating: 7.6,
    duration: "1h 45m",
    emoji: "😂",
    description:
      "Two completely different neighbors find themselves involved in hilarious situations.",
  },
  {
    id: 9,
    title: "The Haunted House",
    category: "Horror",
    year: 2024,
    rating: 8.0,
    duration: "1h 52m",
    emoji: "🏚️",
    description:
      "A family moves into an old house and discovers a terrifying secret hidden inside.",
  },
  {
    id: 10,
    title: "Dream Catcher",
    category: "Drama",
    year: 2025,
    rating: 8.4,
    duration: "2h 12m",
    emoji: "✨",
    description:
      "A talented musician struggles to follow a dream while facing unexpected challenges.",
  },
  {
    id: 11,
    title: "Speed Force",
    category: "Action",
    year: 2023,
    rating: 8.3,
    duration: "2h 08m",
    emoji: "🏎️",
    description:
      "A professional racer returns to the track for one final and dangerous competition.",
  },
  {
    id: 12,
    title: "Mountain Story",
    category: "Adventure",
    year: 2022,
    rating: 7.8,
    duration: "2h 00m",
    emoji: "🏔️",
    description:
      "A group of friends begins an exciting expedition through the highest mountains.",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const categories = [
    "All",
    "Action",
    "Drama",
    "Romance",
    "Adventure",
    "Thriller",
    "Sci-Fi",
    "Comedy",
    "Horror",
  ];

  const filteredMovies = movies.filter((movie) => {
    const categoryMatch =
      category === "All" ||
      movie.category === category;

    const searchMatch =
      movie.title
        .toLowerCase()
        .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const toggleFavorite = (id) => {
    setFavorites((oldFavorites) => {
      if (oldFavorites.includes(id)) {
        return oldFavorites.filter(
          (movieId) => movieId !== id
        );
      }

      return [...oldFavorites, id];
    });
  };

  return (
    <div className="app">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">
          🎬 CineMax
        </div>

        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#movies">
            Movies
          </a>

          <a href="#categories">
            Categories
          </a>

          <a href="#favorites">
            ❤️ Favorites
          </a>

        </div>

        <div className="nav-search">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

      </nav>

      {/* HERO */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <span className="hero-label">
            NOW STREAMING
          </span>

          <h1>
            Discover your
            <br />
            next favorite movie
          </h1>

          <p>
            Explore popular movies, discover
            new stories and find something
            amazing to watch tonight.
          </p>

          <button
            className="explore-button"
            onClick={() =>
              document
                .getElementById("movies")
                .scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Explore Movies →
          </button>

        </div>

        <div className="hero-art">
          🎬
        </div>

      </section>

      {/* CATEGORIES */}

      <section
        className="categories"
        id="categories"
      >

        <div className="section-heading">

          <h2>
            Browse Categories
          </h2>

          <p>
            Find movies by your favorite
            genre
          </p>

        </div>

        <div className="category-list">

          {categories.map(
            (item) => (

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

            )
          )}

        </div>

      </section>

      {/* MOVIES */}

      <section
        className="movies"
        id="movies"
      >

        <div className="movies-heading">

          <div>
            <h2>
              {category === "All"
                ? "Popular Movies"
                : category + " Movies"}
            </h2>

            <p>
              {filteredMovies.length} movies
              available
            </p>
          </div>

          <input
            className="movie-search"
            type="text"
            placeholder="🔎 Search by movie name..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {filteredMovies.length === 0 ? (

          <div className="no-movies">

            <div>
              🎬
            </div>

            <h3>
              No movies found
            </h3>

            <p>
              Try another movie name or
              category.
            </p>

          </div>

        ) : (

          <div className="movie-grid">

            {filteredMovies.map(
              (movie) => (

                <div
                  className="movie-card"
                  key={movie.id}
                >

                  <div className="movie-poster">

                    <span>
                      {movie.emoji}
                    </span>

                    <button
                      className="favorite-button"
                      onClick={() =>
                        toggleFavorite(
                          movie.id
                        )
                      }
                    >
                      {favorites.includes(
                        movie.id
                      )
                        ? "❤️"
                        : "🤍"}
                    </button>

                    <div className="rating">
                      ⭐ {movie.rating}
                    </div>

                  </div>

                  <div className="movie-info">

                    <span className="genre">
                      {movie.category}
                    </span>

                    <h3>
                      {movie.title}
                    </h3>

                    <p>
                      {movie.year} ·{" "}
                      {movie.duration}
                    </p>

                    <button
                      className="details-button"
                      onClick={() =>
                        setSelectedMovie(
                          movie
                        )
                      }
                    >
                      View Details
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>

      {/* FAVORITES */}

      <section
        className="favorites"
        id="favorites"
      >

        <div className="section-heading">

          <h2>
            ❤️ My Favorites
          </h2>

          <p>
            Movies you saved for later
          </p>

        </div>

        {favorites.length === 0 ? (

          <div className="empty-favorites">
            <div>🤍</div>
            <p>
              You haven't added any favorite
              movies yet.
            </p>
          </div>

        ) : (

          <div className="favorite-list">

            {movies
              .filter((movie) =>
                favorites.includes(movie.id)
              )
              .map((movie) => (

                <button
                  className="favorite-movie"
                  key={movie.id}
                  onClick={() =>
                    setSelectedMovie(movie)
                  }
                >
                  {movie.emoji}{" "}
                  {movie.title}
                </button>

              ))}

          </div>

        )}

      </section>

      {/* DETAILS MODAL */}

      {selectedMovie && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedMovie(null)
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
                setSelectedMovie(null)
              }
            >
              ×
            </button>

            <div className="modal-poster">
              {selectedMovie.emoji}
            </div>

            <div className="modal-content">

              <span className="genre">
                {selectedMovie.category}
              </span>

              <h2>
                {selectedMovie.title}
              </h2>

              <div className="movie-meta">
                ⭐ {selectedMovie.rating}
                &nbsp; · &nbsp;
                {selectedMovie.year}
                &nbsp; · &nbsp;
                {selectedMovie.duration}
              </div>

              <p>
                {selectedMovie.description}
              </p>

              <button
                className="watch-button"
                onClick={() =>
                  alert(
                    "This is a frontend demo. Movie playback can be connected later."
                  )
                }
              >
                ▶ Watch Now
              </button>

              <button
                className="modal-favorite"
                onClick={() =>
                  toggleFavorite(
                    selectedMovie.id
                  )
                }
              >
                {favorites.includes(
                  selectedMovie.id
                )
                  ? "❤️ Remove Favorite"
                  : "🤍 Add to Favorites"}
              </button>

            </div>

          </div>

        </div>

      )}

      {/* FOOTER */}

      <footer>

        <div className="footer-logo">
          🎬 CineMax
        </div>

        <p>
          © 2026 CineMax · Built with
          React + Vite
        </p>

      </footer>

    </div>
  );
}

export default App;