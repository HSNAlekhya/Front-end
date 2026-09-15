import { useMemo, useState } from "react";
import "./App.css";

const initialPosts = [
  {
    id: 1,
    author: "Sarah Wilson",
    username: "@sarahwilson",
    time: "2 hours ago",
    avatar: "SW",
    content:
      "Had an amazing day exploring the city! Sometimes taking a break and enjoying the little things is all we need. ✨",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
    likes: 248,
    comments: 32,
    shares: 14,
    liked: false,
  },
  {
    id: 2,
    author: "David Brown",
    username: "@davidbrown",
    time: "5 hours ago",
    avatar: "DB",
    content:
      "Working on a new project today. Loving the process of turning an idea into something real! 💻🚀",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    likes: 182,
    comments: 21,
    shares: 9,
    liked: false,
  },
  {
    id: 3,
    author: "Emily Johnson",
    username: "@emilyjohnson",
    time: "Yesterday",
    avatar: "EJ",
    content:
      "Coffee, music and a peaceful morning. Perfect way to start the weekend. ☕🎵",
    image: null,
    likes: 96,
    comments: 12,
    shares: 4,
    liked: false,
  },
];

const friends = [
  {
    id: 1,
    name: "Sarah Wilson",
    username: "@sarahwilson",
    avatar: "SW",
    online: true,
  },
  {
    id: 2,
    name: "David Brown",
    username: "@davidbrown",
    avatar: "DB",
    online: true,
  },
  {
    id: 3,
    name: "Emily Johnson",
    username: "@emilyjohnson",
    avatar: "EJ",
    online: false,
  },
  {
    id: 4,
    name: "Michael Davis",
    username: "@michaeldavis",
    avatar: "MD",
    online: true,
  },
  {
    id: 5,
    name: "Jessica Taylor",
    username: "@jessicataylor",
    avatar: "JT",
    online: false,
  },
];

const suggestedFriends = [
  {
    name: "James Anderson",
    username: "@jamesanderson",
    avatar: "JA",
  },
  {
    name: "Olivia Martin",
    username: "@oliviamartin",
    avatar: "OM",
  },
  {
    name: "Daniel Thomas",
    username: "@danielthomas",
    avatar: "DT",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Home");
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredPosts = useMemo(() => {
    if (!search.trim()) {
      return posts;
    }

    const value = search.toLowerCase();

    return posts.filter(
      (post) =>
        post.content.toLowerCase().includes(value) ||
        post.author.toLowerCase().includes(value) ||
        post.username.toLowerCase().includes(value)
    );
  }, [posts, search]);

  const createPost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      author: "Alekhya Gorthi",
      username: "@hsnalekhya",
      time: "Just now",
      avatar: "AG",
      content: newPost,
      image: null,
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const toggleLike = (id) => {
    setPosts(
      posts.map((post) => {
        if (post.id !== id) return post;

        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      })
    );
  };

  const changePage = (page) => {
    setActivePage(page);
    setMobileMenu(false);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">S</div>
          <h1>Socially</h1>
        </div>

        <div className="top-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search posts, people..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="top-actions">
          <button
            className="notification-button"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔
            <span></span>
          </button>

          <div className="top-profile">
            <div className="profile-avatar">AG</div>
            <strong>Alekhya</strong>
            <span>⌄</span>
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>
        </div>

        {showNotifications && (
          <div className="notification-dropdown">
            <h3>Notifications</h3>

            <div className="notification-item">
              ❤️ <span>Sarah liked your post</span>
            </div>

            <div className="notification-item">
              💬 <span>David commented on your post</span>
            </div>

            <div className="notification-item">
              👥 <span>Emily sent you a friend request</span>
            </div>
          </div>
        )}
      </header>

      <div className="layout">
        <aside className={`left-sidebar ${mobileMenu ? "show" : ""}`}>
          <nav>
            <button
              className={activePage === "Home" ? "active" : ""}
              onClick={() => changePage("Home")}
            >
              <span>🏠</span>
              Home
            </button>

            <button
              className={activePage === "Profile" ? "active" : ""}
              onClick={() => changePage("Profile")}
            >
              <span>👤</span>
              Profile
            </button>

            <button
              className={activePage === "Friends" ? "active" : ""}
              onClick={() => changePage("Friends")}
            >
              <span>👥</span>
              Friends
            </button>

            <button
              className={activePage === "Messages" ? "active" : ""}
              onClick={() => changePage("Messages")}
            >
              <span>💬</span>
              Messages
              <small>3</small>
            </button>

            <button
              className={activePage === "Saved" ? "active" : ""}
              onClick={() => changePage("Saved")}
            >
              <span>🔖</span>
              Saved
            </button>
          </nav>

          <div className="sidebar-divider"></div>

          <p className="sidebar-title">YOUR SHORTCUTS</p>

          <button className="shortcut">
            <span className="shortcut-color">💻</span>
            Web Development
          </button>

          <button className="shortcut">
            <span className="shortcut-color">🎨</span>
            Design Community
          </button>

          <button className="shortcut">
            <span className="shortcut-color">📸</span>
            Photography
          </button>

          <div className="sidebar-footer">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Help</span>
          </div>
        </aside>

        <main className="main-feed">
          {activePage === "Home" && (
            <HomePage
              newPost={newPost}
              setNewPost={setNewPost}
              createPost={createPost}
              posts={filteredPosts}
              toggleLike={toggleLike}
              search={search}
            />
          )}

          {activePage === "Profile" && (
            <ProfilePage
              posts={posts}
              toggleLike={toggleLike}
            />
          )}

          {activePage === "Friends" && <FriendsPage />}

          {activePage === "Messages" && <MessagesPage />}

          {activePage === "Saved" && <SavedPage />}
        </main>

        <aside className="right-sidebar">
          <div className="right-card profile-card">
            <div className="cover"></div>

            <div className="profile-card-body">
              <div className="large-avatar">AG</div>

              <h3>Alekhya Gorthi</h3>
              <p>@hsnalekhya</p>

              <div className="profile-stats">
                <div>
                  <strong>128</strong>
                  <span>Posts</span>
                </div>

                <div>
                  <strong>2.4K</strong>
                  <span>Friends</span>
                </div>

                <div>
                  <strong>4.8K</strong>
                  <span>Followers</span>
                </div>
              </div>
            </div>
          </div>

          <div className="right-card">
            <div className="right-card-header">
              <h3>Friend Requests</h3>
              <button onClick={() => changePage("Friends")}>See All</button>
            </div>

            <div className="request">
              <div className="friend-avatar">OM</div>

              <div className="friend-info">
                <strong>Olivia Martin</strong>
                <span>12 mutual friends</span>

                <div className="request-buttons">
                  <button className="confirm">Confirm</button>
                  <button className="delete">Delete</button>
                </div>
              </div>
            </div>

            <div className="request">
              <div className="friend-avatar">JA</div>

              <div className="friend-info">
                <strong>James Anderson</strong>
                <span>8 mutual friends</span>

                <div className="request-buttons">
                  <button className="confirm">Confirm</button>
                  <button className="delete">Delete</button>
                </div>
              </div>
            </div>
          </div>

          <div className="right-card">
            <div className="right-card-header">
              <h3>People You May Know</h3>
            </div>

            {suggestedFriends.map((friend) => (
              <div className="suggested-friend" key={friend.username}>
                <div className="friend-avatar">{friend.avatar}</div>

                <div className="friend-info">
                  <strong>{friend.name}</strong>
                  <span>{friend.username}</span>
                </div>

                <button className="add-friend">+</button>
              </div>
            ))}
          </div>

          <div className="right-card online-card">
            <div className="right-card-header">
              <h3>Online Friends</h3>
              <span className="online-count">3 online</span>
            </div>

            {friends
              .filter((friend) => friend.online)
              .map((friend) => (
                <div className="online-friend" key={friend.id}>
                  <div className="friend-avatar">
                    {friend.avatar}
                    <i></i>
                  </div>

                  <strong>{friend.name}</strong>
                </div>
              ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function HomePage({
  newPost,
  setNewPost,
  createPost,
  posts,
  toggleLike,
  search,
}) {
  return (
    <div>
      <div className="page-title">
        <div>
          <h2>Home Feed</h2>
          <p>Stay connected with your friends.</p>
        </div>

        <button className="feed-filter">Latest ▾</button>
      </div>

      <div className="stories">
        <div className="story create-story">
          <div className="story-image">
            <div className="story-avatar">AG</div>
          </div>
          <div className="add-story">+</div>
          <strong>Create Story</strong>
        </div>

        <div className="story">
          <div className="story-image story-one">
            <div className="story-user">SW</div>
          </div>
          <strong>Sarah</strong>
        </div>

        <div className="story">
          <div className="story-image story-two">
            <div className="story-user">DB</div>
          </div>
          <strong>David</strong>
        </div>

        <div className="story">
          <div className="story-image story-three">
            <div className="story-user">EJ</div>
          </div>
          <strong>Emily</strong>
        </div>

        <div className="story">
          <div className="story-image story-four">
            <div className="story-user">MD</div>
          </div>
          <strong>Michael</strong>
        </div>
      </div>

      <div className="create-post">
        <div className="post-avatar">AG</div>

        <div className="create-post-content">
          <textarea
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />

          <div className="post-tools">
            <div className="post-tool-list">
              <button>📷 Photo</button>
              <button>🎥 Video</button>
              <button>😊 Feeling</button>
            </div>

            <button className="post-button" onClick={createPost}>
              Post
            </button>
          </div>
        </div>
      </div>

      {search && (
        <div className="search-message">
          Showing posts matching "<strong>{search}</strong>"
        </div>
      )}

      <div className="posts">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            toggleLike={toggleLike}
          />
        ))}

        {posts.length === 0 && (
          <div className="empty-posts">
            <div>🔎</div>
            <h3>No posts found</h3>
            <p>Try searching for something else.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Post({ post, toggleLike }) {
  return (
    <article className="post">
      <div className="post-header">
        <div className="post-avatar">{post.avatar}</div>

        <div className="post-author">
          <strong>{post.author}</strong>
          <span>
            {post.username} · {post.time}
          </span>
        </div>

        <button className="more-button">•••</button>
      </div>

      <div className="post-content">
        <p>{post.content}</p>

        {post.image && (
          <img src={post.image} alt="Post" className="post-image" />
        )}
      </div>

      <div className="post-stats">
        <span>❤️ {post.likes}</span>

        <div>
          <span>{post.comments} comments</span>
          <span>{post.shares} shares</span>
        </div>
      </div>

      <div className="post-actions">
        <button
          className={post.liked ? "liked" : ""}
          onClick={() => toggleLike(post.id)}
        >
          {post.liked ? "❤️" : "♡"} Like
        </button>

        <button>💬 Comment</button>

        <button>↗ Share</button>

        <button>🔖 Save</button>
      </div>

      <div className="comment-box">
        <div className="small-comment-avatar">AG</div>

        <input type="text" placeholder="Write a comment..." />

        <button>➤</button>
      </div>
    </article>
  );
}

function ProfilePage({ posts, toggleLike }) {
  return (
    <div className="profile-page">
      <div className="profile-cover">
        <div className="profile-cover-pattern"></div>
      </div>

      <div className="profile-main">
        <div className="profile-large-avatar">AG</div>

        <div className="profile-details">
          <h2>Alekhya Gorthi</h2>
          <p>@hsnalekhya</p>
          <span>Web Developer • React • Django • Frontend Enthusiast</span>
        </div>

        <button className="edit-profile">Edit Profile</button>
      </div>

      <div className="profile-tabs">
        <button className="selected">Posts</button>
        <button>About</button>
        <button>Friends</button>
        <button>Photos</button>
      </div>

      <div className="profile-content">
        <div className="about-card">
          <h3>About Me</h3>

          <p>
            Passionate about building modern and responsive web applications
            and learning new technologies.
          </p>

          <div className="about-item">💼 Web Developer</div>
          <div className="about-item">📍 India</div>
          <div className="about-item">🎓 B.Tech</div>
        </div>

        <div className="profile-posts">
          {posts
            .filter((post) => post.author === "Alekhya Gorthi")
            .map((post) => (
              <Post
                key={post.id}
                post={post}
                toggleLike={toggleLike}
              />
            ))}

          {posts.filter((post) => post.author === "Alekhya Gorthi").length ===
            0 && (
            <div className="empty-posts">
              <div>📝</div>
              <h3>No posts yet</h3>
              <p>Create your first post from the Home Feed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FriendsPage() {
  return (
    <div className="friends-page">
      <div className="page-title">
        <div>
          <h2>Friends</h2>
          <p>Connect and interact with your friends.</p>
        </div>
      </div>

      <div className="friends-tabs">
        <button className="selected">All Friends</button>
        <button>Recently Added</button>
        <button>Requests</button>
        <button>Suggestions</button>
      </div>

      <div className="friends-grid">
        {friends.map((friend) => (
          <div className="friend-card" key={friend.id}>
            <div className="friend-card-avatar">
              {friend.avatar}
              {friend.online && <i></i>}
            </div>

            <h3>{friend.name}</h3>
            <p>{friend.username}</p>

            <span>24 mutual friends</span>

            <button className="friend-message">Message</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesPage() {
  return (
    <div className="messages-page">
      <div className="page-title">
        <div>
          <h2>Messages</h2>
          <p>Chat with your friends.</p>
        </div>
      </div>

      <div className="messages-box">
        <div className="conversation-list">
          <h3>Messages</h3>

          {friends.slice(0, 4).map((friend, index) => (
            <div
              className={`conversation ${index === 0 ? "selected" : ""}`}
              key={friend.id}
            >
              <div className="friend-avatar">{friend.avatar}</div>

              <div>
                <strong>{friend.name}</strong>
                <p>Hey! How are you doing?</p>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-window">
          <div className="chat-header">
            <div className="friend-avatar">SW</div>
            <div>
              <strong>Sarah Wilson</strong>
              <span>Online</span>
            </div>
          </div>

          <div className="chat-messages">
            <div className="message received">
              Hey! How are you doing?
            </div>

            <div className="message sent">
              I'm doing great! Working on a new React project.
            </div>

            <div className="message received">
              That's awesome! Good luck with it. 🚀
            </div>
          </div>

          <div className="chat-input">
            <input placeholder="Type a message..." />
            <button>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SavedPage() {
  return (
    <div className="saved-page">
      <div className="page-title">
        <div>
          <h2>Saved Posts</h2>
          <p>Posts you saved for later.</p>
        </div>
      </div>

      <div className="empty-posts">
        <div>🔖</div>
        <h3>Your saved posts will appear here</h3>
        <p>Save interesting posts to find them easily later.</p>
      </div>
    </div>
  );
}

export default App;