import { useMemo, useState } from "react";
import "./App.css";

const songs = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Ray",
    album: "After Dark",
    duration: "3:42",
    genre: "Pop",
    color: "#7c3aed",
  },
  {
    id: 2,
    title: "Golden Skies",
    artist: "Alex Morgan",
    album: "Golden Hour",
    duration: "4:05",
    genre: "Chill",
    color: "#f59e0b",
  },
  {
    id: 3,
    title: "Ocean Drive",
    artist: "The Waves",
    album: "Summer",
    duration: "3:28",
    genre: "Indie",
    color: "#0891b2",
  },
  {
    id: 4,
    title: "City Lights",
    artist: "Nova",
    album: "Neon City",
    duration: "3:55",
    genre: "Electronic",
    color: "#db2777",
  },
  {
    id: 5,
    title: "Stay With Me",
    artist: "Mia Carter",
    album: "Closer",
    duration: "4:21",
    genre: "R&B",
    color: "#dc2626",
  },
  {
    id: 6,
    title: "Weekend",
    artist: "Ryan Cole",
    album: "Good Times",
    duration: "3:17",
    genre: "Pop",
    color: "#16a34a",
  },
  {
    id: 7,
    title: "Electric Heart",
    artist: "Neon Soul",
    album: "Electric",
    duration: "3:51",
    genre: "Electronic",
    color: "#9333ea",
  },
  {
    id: 8,
    title: "Lost In Time",
    artist: "Ella Stone",
    album: "Memories",
    duration: "4:12",
    genre: "Acoustic",
    color: "#ea580c",
  },
];

const playlists = [
  {
    id: 1,
    name: "Daily Mix",
    description: "Your daily selection",
    color: "#5b4bdb",
  },
  {
    id: 2,
    name: "Chill Vibes",
    description: "Relax and unwind",
    color: "#0891b2",
  },
  {
    id: 3,
    name: "Workout Hits",
    description: "Music for your workout",
    color: "#dc2626",
  },
  {
    id: 4,
    name: "Focus Flow",
    description: "Stay focused",
    color: "#059669",
  },
  {
    id: 5,
    name: "Weekend Party",
    description: "Turn up the volume",
    color: "#db2777",
  },
  {
    id: 6,
    name: "Acoustic Favorites",
    description: "Soft acoustic songs",
    color: "#d97706",
  },
];

const artists = [
  {
    id: 1,
    name: "Luna Ray",
    genre: "Pop",
    color: "#7c3aed",
  },
  {
    id: 2,
    name: "Alex Morgan",
    genre: "Chill",
    color: "#f59e0b",
  },
  {
    id: 3,
    name: "The Waves",
    genre: "Indie",
    color: "#0891b2",
  },
  {
    id: 4,
    name: "Nova",
    genre: "Electronic",
    color: "#db2777",
  },
  {
    id: 5,
    name: "Mia Carter",
    genre: "R&B",
    color: "#dc2626",
  },
  {
    id: 6,
    name: "Ryan Cole",
    genre: "Pop",
    color: "#16a34a",
  },
];

const albums = [
  {
    id: 1,
    title: "After Dark",
    artist: "Luna Ray",
    color: "#7c3aed",
  },
  {
    id: 2,
    title: "Golden Hour",
    artist: "Alex Morgan",
    color: "#f59e0b",
  },
  {
    id: 3,
    title: "Summer",
    artist: "The Waves",
    color: "#0891b2",
  },
  {
    id: 4,
    title: "Neon City",
    artist: "Nova",
    color: "#db2777",
  },
  {
    id: 5,
    title: "Closer",
    artist: "Mia Carter",
    color: "#dc2626",
  },
];

function App() {
  const [activePage, setActivePage] = useState("home");
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(70);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const filteredSongs = useMemo(() => {
    if (!search.trim()) return songs;

    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase()) ||
        song.album.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const toggleLike = (songId) => {
    setLikedSongs((previous) =>
      previous.includes(songId)
        ? previous.filter((id) => id !== songId)
        : [...previous, songId]
    );
  };

  const playNext = () => {
    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    const nextIndex = (currentIndex + 1) % songs.length;

    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
    setProgress(0);
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    const previousIndex =
      (currentIndex - 1 + songs.length) % songs.length;

    setCurrentSong(songs[previousIndex]);
    setIsPlaying(true);
    setProgress(0);
  };

  const goToPage = (page) => {
    setActivePage(page);
    setMobileSidebar(false);
  };

  return (
    <div className="music-app">
      <aside className={`sidebar ${mobileSidebar ? "open" : ""}`}>
        <div className="logo-area">
          <div className="logo-icon">♫</div>
          <div>
            <h2>Melody</h2>
            <span>Music for everyone</span>
          </div>
        </div>

        <nav className="navigation">
          <button
            className={activePage === "home" ? "nav-link active" : "nav-link"}
            onClick={() => goToPage("home")}
          >
            <span>⌂</span>
            Home
          </button>

          <button
            className={
              activePage === "search" ? "nav-link active" : "nav-link"
            }
            onClick={() => goToPage("search")}
          >
            <span>⌕</span>
            Search
          </button>

          <button
            className={
              activePage === "library" ? "nav-link active" : "nav-link"
            }
            onClick={() => goToPage("library")}
          >
            <span>▣</span>
            Your Library
          </button>
        </nav>

        <div className="library-section">
          <div className="library-heading">
            <span>YOUR PLAYLISTS</span>
            <button>＋</button>
          </div>

          {playlists.slice(0, 5).map((playlist) => (
            <button
              className="playlist-link"
              key={playlist.id}
              onClick={() => goToPage("library")}
            >
              <span>♫</span>
              {playlist.name}
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="profile-mini">
            <div className="profile-avatar">AG</div>

            <div>
              <strong>Alekhya</strong>
              <small>Free Account</small>
            </div>

            <button>⋮</button>
          </div>
        </div>
      </aside>

      {mobileSidebar && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMobileSidebar(true)}
          >
            ☰
          </button>

          <div className="search-container">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search songs, artists or albums..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                if (event.target.value) {
                  setActivePage("search");
                }
              }}
            />
          </div>

          <div className="topbar-profile">
            <div className="profile-avatar">AG</div>
            <span>Alekhya</span>
            <span>⌄</span>
          </div>
        </header>

        {activePage === "home" && (
          <HomePage
            songs={songs}
            playlists={playlists}
            albums={albums}
            artists={artists}
            currentSong={currentSong}
            playSong={playSong}
            likedSongs={likedSongs}
            toggleLike={toggleLike}
            goToPage={goToPage}
          />
        )}

        {activePage === "search" && (
          <SearchPage
            search={search}
            songs={filteredSongs}
            playSong={playSong}
            likedSongs={likedSongs}
            toggleLike={toggleLike}
          />
        )}

        {activePage === "library" && (
          <LibraryPage
            playlists={playlists}
            likedSongs={likedSongs}
            songs={songs}
            playSong={playSong}
            goToPage={goToPage}
          />
        )}

        {activePage === "artists" && (
          <ArtistsPage
            artists={artists}
            songs={songs}
            playSong={playSong}
          />
        )}

        {activePage === "albums" && (
          <AlbumsPage albums={albums} songs={songs} playSong={playSong} />
        )}
      </main>

      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        progress={progress}
        setProgress={setProgress}
        volume={volume}
        setVolume={setVolume}
        playNext={playNext}
        playPrevious={playPrevious}
        likedSongs={likedSongs}
        toggleLike={toggleLike}
      />
    </div>
  );
}

function HomePage({
  songs,
  playlists,
  albums,
  artists,
  playSong,
  likedSongs,
  toggleLike,
  goToPage,
}) {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <span className="hero-label">WELCOME BACK</span>
          <h1>Good evening, Alekhya</h1>
          <p>
            Discover new music and enjoy your favorite songs every day.
          </p>

          <button className="hero-button" onClick={() => playSong(songs[0])}>
            ▶ Start Listening
          </button>
        </div>

        <div className="hero-music-icon">♫</div>
      </section>

      <section className="section">
        <SectionHeader title="Recently Played" />

        <div className="song-list">
          {songs.slice(0, 5).map((song, index) => (
            <SongRow
              key={song.id}
              song={song}
              index={index + 1}
              playSong={playSong}
              liked={likedSongs.includes(song.id)}
              toggleLike={toggleLike}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          title="Made For You"
          action="See all"
          onClick={() => goToPage("library")}
        />

        <div className="card-grid">
          {playlists.slice(0, 4).map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              songs={songs}
              playSong={playSong}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          title="Popular Artists"
          action="See all"
          onClick={() => goToPage("artists")}
        />

        <div className="artist-grid">
          {artists.slice(0, 5).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          title="Popular Albums"
          action="See all"
          onClick={() => goToPage("albums")}
        />

        <div className="album-grid">
          {albums.slice(0, 5).map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              songs={songs}
              playSong={playSong}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function SearchPage({
  search,
  songs,
  playSong,
  likedSongs,
  toggleLike,
}) {
  return (
    <div className="page">
      <div className="page-heading">
        <span>SEARCH</span>
        <h1>
          {search ? `Results for "${search}"` : "Find your music"}
        </h1>
        <p>Search through songs, artists and albums.</p>
      </div>

      {songs.length > 0 ? (
        <section className="section">
          <div className="song-list">
            {songs.map((song, index) => (
              <SongRow
                key={song.id}
                song={song}
                index={index + 1}
                playSong={playSong}
                liked={likedSongs.includes(song.id)}
                toggleLike={toggleLike}
              />
            ))}
          </div>
        </section>
      ) : (
        <div className="empty-state">
          <div>⌕</div>
          <h2>No music found</h2>
          <p>Try searching for another song, artist or album.</p>
        </div>
      )}
    </div>
  );
}

function LibraryPage({
  playlists,
  likedSongs,
  songs,
  playSong,
  goToPage,
}) {
  const liked = songs.filter((song) => likedSongs.includes(song.id));

  return (
    <div className="page">
      <div className="page-heading">
        <span>YOUR LIBRARY</span>
        <h1>Your Music</h1>
        <p>Everything you have saved in one place.</p>
      </div>

      <section className="section">
        <SectionHeader title="Liked Songs" />

        {liked.length > 0 ? (
          <div className="song-list">
            {liked.map((song, index) => (
              <SongRow
                key={song.id}
                song={song}
                index={index + 1}
                playSong={playSong}
                liked={true}
                toggleLike={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="library-empty">
            <div>♡</div>
            <h3>No liked songs yet</h3>
            <p>Click the heart icon on a song to save it here.</p>
          </div>
        )}
      </section>

      <section className="section">
        <SectionHeader title="Your Playlists" />

        <div className="card-grid">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              songs={songs}
              playSong={playSong}
            />
          ))}
        </div>
      </section>

      <button className="text-link" onClick={() => goToPage("home")}>
        ← Back to Home
      </button>
    </div>
  );
}

function ArtistsPage({ artists, songs, playSong }) {
  return (
    <div className="page">
      <div className="page-heading">
        <span>ARTISTS</span>
        <h1>Popular Artists</h1>
        <p>Explore music from your favorite artists.</p>
      </div>

      <div className="artist-grid large">
        {artists.map((artist) => (
          <div className="artist-card" key={artist.id}>
            <div
              className="artist-image"
              style={{ background: artist.color }}
            >
              {artist.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </div>

            <h3>{artist.name}</h3>
            <span>{artist.genre} Artist</span>

            <button
              onClick={() => {
                const song = songs.find(
                  (item) => item.artist === artist.name
                );

                if (song) playSong(song);
              }}
            >
              ▶ Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlbumsPage({ albums, songs, playSong }) {
  return (
    <div className="page">
      <div className="page-heading">
        <span>ALBUMS</span>
        <h1>Popular Albums</h1>
        <p>Listen to albums from your favorite artists.</p>
      </div>

      <div className="album-grid large">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            songs={songs}
            playSong={playSong}
          />
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title, action, onClick }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>

      {action && (
        <button onClick={onClick}>
          {action}
        </button>
      )}
    </div>
  );
}

function SongRow({
  song,
  index,
  playSong,
  liked,
  toggleLike,
}) {
  return (
    <div className="song-row">
      <span className="song-number">{index}</span>

      <button
        className="song-cover"
        style={{ background: song.color }}
        onClick={() => playSong(song)}
      >
        {song.title[0]}
        <span className="cover-play">▶</span>
      </button>

      <div className="song-info">
        <strong>{song.title}</strong>
        <span>{song.artist}</span>
      </div>

      <span className="song-album">{song.album}</span>

      <button
        className={`heart-button ${liked ? "liked" : ""}`}
        onClick={() => toggleLike(song.id)}
      >
        {liked ? "♥" : "♡"}
      </button>

      <span className="song-duration">{song.duration}</span>

      <button className="more-button">⋮</button>
    </div>
  );
}

function PlaylistCard({ playlist, songs, playSong }) {
  return (
    <div className="playlist-card">
      <div
        className="playlist-art"
        style={{ background: playlist.color }}
      >
        <span>♫</span>

        <button
          className="floating-play"
          onClick={() => playSong(songs[0])}
        >
          ▶
        </button>
      </div>

      <h3>{playlist.name}</h3>
      <p>{playlist.description}</p>
    </div>
  );
}

function ArtistCard({ artist }) {
  return (
    <div className="artist-card">
      <div
        className="artist-image"
        style={{ background: artist.color }}
      >
        {artist.name
          .split(" ")
          .map((word) => word[0])
          .join("")}
      </div>

      <h3>{artist.name}</h3>
      <span>{artist.genre}</span>
    </div>
  );
}

function AlbumCard({ album, songs, playSong }) {
  return (
    <div className="album-card">
      <div
        className="album-cover"
        style={{ background: album.color }}
      >
        <span>{album.title[0]}</span>

        <button
          className="floating-play"
          onClick={() => {
            const song = songs.find(
              (item) => item.album === album.title
            );

            playSong(song || songs[0]);
          }}
        >
          ▶
        </button>
      </div>

      <h3>{album.title}</h3>
      <p>{album.artist}</p>
    </div>
  );
}

function MusicPlayer({
  currentSong,
  isPlaying,
  setIsPlaying,
  progress,
  setProgress,
  volume,
  setVolume,
  playNext,
  playPrevious,
  likedSongs,
  toggleLike,
}) {
  return (
    <footer className="music-player">
      <div className="player-song">
        <div
          className="player-cover"
          style={{ background: currentSong.color }}
        >
          {currentSong.title[0]}
        </div>

        <div>
          <strong>{currentSong.title}</strong>
          <span>{currentSong.artist}</span>
        </div>

        <button
          className={`player-heart ${
            likedSongs.includes(currentSong.id) ? "liked" : ""
          }`}
          onClick={() => toggleLike(currentSong.id)}
        >
          {likedSongs.includes(currentSong.id) ? "♥" : "♡"}
        </button>
      </div>

      <div className="player-controls">
        <div className="control-buttons">
          <button>🔀</button>
          <button onClick={playPrevious}>◀◀</button>

          <button
            className="play-pause"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

          <button onClick={playNext}>▶▶</button>
          <button>🔁</button>
        </div>

        <div className="progress-area">
          <span>1:22</span>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(event) =>
              setProgress(Number(event.target.value))
            }
          />

          <span>{currentSong.duration}</span>
        </div>
      </div>

      <div className="player-volume">
        <span>🔊</span>

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(event) =>
            setVolume(Number(event.target.value))
          }
        />
      </div>
    </footer>
  );
}

export default App;