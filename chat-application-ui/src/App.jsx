import { useMemo, useState } from "react";
import "./App.css";

const contacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    status: "Online",
    lastMessage: "Sure, see you tomorrow!",
    time: "10:42 AM",
    unread: 2,
    color: "#7c3aed",
  },
  {
    id: 2,
    name: "Michael Brown",
    avatar: "MB",
    status: "Online",
    lastMessage: "Can you send me the file?",
    time: "9:35 AM",
    unread: 0,
    color: "#2563eb",
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "ED",
    status: "Away",
    lastMessage: "Thanks for your help!",
    time: "Yesterday",
    unread: 1,
    color: "#db2777",
  },
  {
    id: 4,
    name: "David Wilson",
    avatar: "DW",
    status: "Offline",
    lastMessage: "Let's discuss it later.",
    time: "Yesterday",
    unread: 0,
    color: "#059669",
  },
  {
    id: 5,
    name: "Jessica Taylor",
    avatar: "JT",
    status: "Online",
    lastMessage: "That looks great!",
    time: "Monday",
    unread: 0,
    color: "#ea580c",
  },
  {
    id: 6,
    name: "Daniel Miller",
    avatar: "DM",
    status: "Offline",
    lastMessage: "Good morning!",
    time: "Sunday",
    unread: 0,
    color: "#0891b2",
  },
];

const initialMessages = {
  1: [
    {
      id: 1,
      sender: "Sarah Johnson",
      text: "Hi! How are you doing?",
      time: "10:35 AM",
      mine: false,
    },
    {
      id: 2,
      sender: "You",
      text: "I'm doing great! How about you?",
      time: "10:36 AM",
      mine: true,
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      text: "I'm doing well. Are you free tomorrow?",
      time: "10:39 AM",
      mine: false,
    },
    {
      id: 4,
      sender: "You",
      text: "Yes, I should be free tomorrow.",
      time: "10:40 AM",
      mine: true,
    },
    {
      id: 5,
      sender: "Sarah Johnson",
      text: "Sure, see you tomorrow!",
      time: "10:42 AM",
      mine: false,
    },
  ],
  2: [
    {
      id: 1,
      sender: "Michael Brown",
      text: "Hey! Can you send me the file?",
      time: "9:30 AM",
      mine: false,
    },
    {
      id: 2,
      sender: "You",
      text: "Sure, I'll send it shortly.",
      time: "9:32 AM",
      mine: true,
    },
    {
      id: 3,
      sender: "Michael Brown",
      text: "Thanks!",
      time: "9:35 AM",
      mine: false,
    },
  ],
  3: [
    {
      id: 1,
      sender: "Emily Davis",
      text: "Could you help me with this project?",
      time: "Yesterday",
      mine: false,
    },
    {
      id: 2,
      sender: "You",
      text: "Of course. What do you need help with?",
      time: "Yesterday",
      mine: true,
    },
    {
      id: 3,
      sender: "Emily Davis",
      text: "Thanks for your help!",
      time: "Yesterday",
      mine: false,
    },
  ],
  4: [
    {
      id: 1,
      sender: "David Wilson",
      text: "Let's discuss the project.",
      time: "Yesterday",
      mine: false,
    },
    {
      id: 2,
      sender: "You",
      text: "Okay, what time works for you?",
      time: "Yesterday",
      mine: true,
    },
    {
      id: 3,
      sender: "David Wilson",
      text: "Let's discuss it later.",
      time: "Yesterday",
      mine: false,
    },
  ],
  5: [
    {
      id: 1,
      sender: "Jessica Taylor",
      text: "I checked the new design.",
      time: "Monday",
      mine: false,
    },
    {
      id: 2,
      sender: "You",
      text: "What do you think?",
      time: "Monday",
      mine: true,
    },
    {
      id: 3,
      sender: "Jessica Taylor",
      text: "That looks great!",
      time: "Monday",
      mine: false,
    },
  ],
  6: [
    {
      id: 1,
      sender: "Daniel Miller",
      text: "Good morning!",
      time: "Sunday",
      mine: false,
    },
    {
      id: 2,
      sender: "You",
      text: "Good morning, Daniel!",
      time: "Sunday",
      mine: true,
    },
  ],
};

function App() {
  const [activeContact, setActiveContact] = useState(1);
  const [activePage, setActivePage] = useState("messages");
  const [search, setSearch] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const selectedContact = contacts.find(
    (contact) => contact.id === activeContact
  );

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const sendMessage = () => {
    const text = messageText.trim();

    if (!text) return;

    const newMessage = {
      id: Date.now(),
      sender: "You",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      mine: true,
    };

    setMessages((previous) => ({
      ...previous,
      [activeContact]: [...(previous[activeContact] || []), newMessage],
    }));

    setMessageText("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const selectContact = (id) => {
    setActiveContact(id);
    setActivePage("messages");
    setMobileSidebar(false);
  };

  return (
    <div className="app">
      <aside className={`sidebar ${mobileSidebar ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">C</div>
          <div>
            <h2>Chatly</h2>
            <span>Messaging App</span>
          </div>
        </div>

        <nav className="main-nav">
          <button
            className={activePage === "messages" ? "nav-item active" : "nav-item"}
            onClick={() => setActivePage("messages")}
          >
            <span>💬</span>
            Messages
          </button>

          <button
            className={activePage === "contacts" ? "nav-item active" : "nav-item"}
            onClick={() => setActivePage("contacts")}
          >
            <span>👥</span>
            Contacts
          </button>

          <button
            className={activePage === "profile" ? "nav-item active" : "nav-item"}
            onClick={() => {
              setActivePage("profile");
              setShowProfile(true);
            }}
          >
            <span>👤</span>
            Profile
          </button>

          <button
            className={activePage === "settings" ? "nav-item active" : "nav-item"}
            onClick={() => setActivePage("settings")}
          >
            <span>⚙️</span>
            Settings
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="mini-profile">
            <div className="avatar my-avatar">AG</div>

            <div>
              <strong>Alekhya</strong>
              <small>Online</small>
            </div>

            <button onClick={() => setShowProfile(true)}>⋮</button>
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
            className="menu-button"
            onClick={() => setMobileSidebar(true)}
          >
            ☰
          </button>

          <div>
            <h1>
              {activePage === "messages"
                ? "Messages"
                : activePage === "contacts"
                ? "Contacts"
                : activePage === "profile"
                ? "Profile"
                : "Settings"}
            </h1>

            <p>Stay connected with your friends</p>
          </div>

          <div className="topbar-actions">
            <button className="icon-button">🔔</button>
            <button
              className="user-button"
              onClick={() => setShowProfile(true)}
            >
              <div className="avatar my-avatar">AG</div>
              <span>Alekhya</span>
            </button>
          </div>
        </header>

        {activePage === "messages" && (
          <section className="chat-layout">
            <aside className="contacts-panel">
              <div className="contacts-header">
                <div>
                  <h2>Conversations</h2>
                  <span>{contacts.length} contacts</span>
                </div>

                <button className="new-chat-button">＋</button>
              </div>

              <div className="search-box">
                <span>⌕</span>
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <div className="contact-list">
                {filteredContacts.map((contact) => (
                  <button
                    className={`contact-item ${
                      activeContact === contact.id ? "selected" : ""
                    }`}
                    key={contact.id}
                    onClick={() => selectContact(contact.id)}
                  >
                    <div
                      className="avatar"
                      style={{ backgroundColor: contact.color }}
                    >
                      {contact.avatar}
                      {contact.status === "Online" && (
                        <span className="online-dot" />
                      )}
                    </div>

                    <div className="contact-info">
                      <div className="contact-top">
                        <strong>{contact.name}</strong>
                        <small>{contact.time}</small>
                      </div>

                      <div className="contact-bottom">
                        <span>{contact.lastMessage}</span>

                        {contact.unread > 0 && (
                          <b className="unread">{contact.unread}</b>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            <section className="conversation">
              <div className="conversation-header">
                <div className="conversation-user">
                  <div
                    className="avatar"
                    style={{ backgroundColor: selectedContact.color }}
                  >
                    {selectedContact.avatar}
                    {selectedContact.status === "Online" && (
                      <span className="online-dot" />
                    )}
                  </div>

                  <div>
                    <h2>{selectedContact.name}</h2>
                    <span>
                      {selectedContact.status === "Online"
                        ? "Active now"
                        : selectedContact.status}
                    </span>
                  </div>
                </div>

                <div className="conversation-actions">
                  <button>📞</button>
                  <button>📹</button>
                  <button>⋮</button>
                </div>
              </div>

              <div className="messages-area">
                <div className="date-divider">
                  <span>Today</span>
                </div>

                {(messages[activeContact] || []).map((message) => (
                  <div
                    className={`message-row ${
                      message.mine ? "mine" : "theirs"
                    }`}
                    key={message.id}
                  >
                    {!message.mine && (
                      <div
                        className="avatar small-avatar"
                        style={{
                          backgroundColor: selectedContact.color,
                        }}
                      >
                        {selectedContact.avatar}
                      </div>
                    )}

                    <div className="message-content">
                      <div className="message-bubble">{message.text}</div>
                      <small>{message.time}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="message-input-area">
                <button className="attachment-button">＋</button>

                <input
                  type="text"
                  placeholder={`Message ${selectedContact.name}...`}
                  value={messageText}
                  onChange={(event) => setMessageText(event.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <button className="emoji-button">😊</button>

                <button className="send-button" onClick={sendMessage}>
                  ➤
                </button>
              </div>
            </section>
          </section>
        )}

        {activePage === "contacts" && (
          <section className="page-content">
            <div className="page-title">
              <div>
                <h2>Contacts</h2>
                <p>Manage your contacts and start conversations.</p>
              </div>

              <button className="primary-button">＋ Add Contact</button>
            </div>

            <div className="contact-grid">
              {contacts.map((contact) => (
                <div className="contact-card" key={contact.id}>
                  <div
                    className="large-avatar"
                    style={{ backgroundColor: contact.color }}
                  >
                    {contact.avatar}
                  </div>

                  <h3>{contact.name}</h3>
                  <span className="status-text">{contact.status}</span>

                  <button
                    className="message-button"
                    onClick={() => selectContact(contact.id)}
                  >
                    💬 Message
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === "settings" && (
          <section className="page-content">
            <div className="page-title">
              <div>
                <h2>Settings</h2>
                <p>Customize your chat application preferences.</p>
              </div>
            </div>

            <div className="settings-card">
              <div className="setting-row">
                <div>
                  <strong>Notifications</strong>
                  <p>Receive notifications for new messages.</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>

              <div className="setting-row">
                <div>
                  <strong>Sound</strong>
                  <p>Play a sound when a new message arrives.</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>

              <div className="setting-row">
                <div>
                  <strong>Read Receipts</strong>
                  <p>Allow contacts to see when you read messages.</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>

              <div className="setting-row">
                <div>
                  <strong>Dark Mode</strong>
                  <p>Use dark mode for the application.</p>
                </div>
                <input type="checkbox" />
              </div>
            </div>
          </section>
        )}
      </main>

      {showProfile && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div
            className="profile-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setShowProfile(false)}
            >
              ×
            </button>

            <div className="profile-avatar">AG</div>

            <h2>Alekhya Gorthi</h2>
            <p className="profile-role">Web Developer</p>

            <div className="profile-details">
              <div>
                <span>📧</span>
                <p>alekhya@example.com</p>
              </div>

              <div>
                <span>📱</span>
                <p>+91 98765 43210</p>
              </div>

              <div>
                <span>📍</span>
                <p>India</p>
              </div>
            </div>

            <button className="primary-button full-width">Edit Profile</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;