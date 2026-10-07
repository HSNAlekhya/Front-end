import { useMemo, useState } from "react";
import "./App.css";

const initialTickets = [
  {
    id: "TCK-1001",
    subject: "Unable to reset my password",
    user: "Priya Sharma",
    email: "priya@example.com",
    status: "Open",
    priority: "High",
    category: "Account",
    agent: "John Smith",
    date: "Oct 07, 2026",
    message:
      "I have tried resetting my password several times, but I am not receiving the reset email.",
  },
  {
    id: "TCK-1002",
    subject: "Payment failed during checkout",
    user: "Rahul Kumar",
    email: "rahul@example.com",
    status: "Pending",
    priority: "High",
    category: "Payment",
    agent: "Sarah Wilson",
    date: "Oct 07, 2026",
    message:
      "My payment was declined while trying to complete my order.",
  },
  {
    id: "TCK-1003",
    subject: "How can I update my profile?",
    user: "Ananya Reddy",
    email: "ananya@example.com",
    status: "Resolved",
    priority: "Low",
    category: "Account",
    agent: "David Brown",
    date: "Oct 06, 2026",
    message:
      "I wanted to know where I can change my profile information.",
  },
  {
    id: "TCK-1004",
    subject: "Order has not arrived",
    user: "Vikram Rao",
    email: "vikram@example.com",
    status: "Open",
    priority: "Medium",
    category: "Orders",
    agent: "John Smith",
    date: "Oct 06, 2026",
    message:
      "My order was expected yesterday, but it has still not arrived.",
  },
  {
    id: "TCK-1005",
    subject: "Refund request for cancelled order",
    user: "Sneha Patel",
    email: "sneha@example.com",
    status: "Pending",
    priority: "Medium",
    category: "Refund",
    agent: "Sarah Wilson",
    date: "Oct 05, 2026",
    message:
      "I cancelled my order and would like to know when I will receive the refund.",
  },
  {
    id: "TCK-1006",
    subject: "Application is showing an error",
    user: "Arjun Mehta",
    email: "arjun@example.com",
    status: "Resolved",
    priority: "High",
    category: "Technical",
    agent: "David Brown",
    date: "Oct 05, 2026",
    message:
      "The application displays an unexpected error whenever I open the dashboard.",
  },
  {
    id: "TCK-1007",
    subject: "Need help changing my email",
    user: "Meena Devi",
    email: "meena@example.com",
    status: "Open",
    priority: "Low",
    category: "Account",
    agent: "John Smith",
    date: "Oct 04, 2026",
    message:
      "I recently changed my email address and need help updating it.",
  },
  {
    id: "TCK-1008",
    subject: "Subscription cancellation",
    user: "Kiran Kumar",
    email: "kiran@example.com",
    status: "Resolved",
    priority: "Medium",
    category: "Subscription",
    agent: "Sarah Wilson",
    date: "Oct 03, 2026",
    message:
      "Please help me cancel my current subscription.",
  },
];

const users = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya@example.com",
    tickets: 8,
    status: "Active",
    joined: "Jan 12, 2026",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    email: "rahul@example.com",
    tickets: 5,
    status: "Active",
    joined: "Feb 18, 2026",
  },
  {
    id: 3,
    name: "Ananya Reddy",
    email: "ananya@example.com",
    tickets: 12,
    status: "Active",
    joined: "Mar 04, 2026",
  },
  {
    id: 4,
    name: "Vikram Rao",
    email: "vikram@example.com",
    tickets: 4,
    status: "Inactive",
    joined: "Apr 20, 2026",
  },
  {
    id: 5,
    name: "Sneha Patel",
    email: "sneha@example.com",
    tickets: 7,
    status: "Active",
    joined: "May 10, 2026",
  },
];

const messages = [
  {
    id: 1,
    user: "Priya Sharma",
    preview: "I am still unable to reset my password...",
    time: "10:25 AM",
    unread: true,
  },
  {
    id: 2,
    user: "Rahul Kumar",
    preview: "The payment failed again during checkout.",
    time: "09:48 AM",
    unread: true,
  },
  {
    id: 3,
    user: "Ananya Reddy",
    preview: "Thank you for helping me update my profile.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    user: "Vikram Rao",
    preview: "Can you check the delivery status?",
    time: "Yesterday",
    unread: false,
  },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [notification, setNotification] = useState("");

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((ticket) => ticket.status === "Open").length;
  const pendingTickets = tickets.filter(
    (ticket) => ticket.status === "Pending"
  ).length;
  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
        ticket.id.toLowerCase().includes(search.toLowerCase()) ||
        ticket.user.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || ticket.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, search, statusFilter, priorityFilter]);

  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 2500);
  };

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus }
          : ticket
      )
    );

    setSelectedTicket((ticket) =>
      ticket ? { ...ticket, status: newStatus } : ticket
    );

    showNotification(`Ticket status changed to ${newStatus}`);
  };

  const sendMessage = () => {
    if (!messageText.trim()) return;

    showNotification("Message sent successfully");
    setMessageText("");
  };

  const renderPage = () => {
    switch (activePage) {
      case "Tickets":
        return (
          <TicketsPage
            tickets={filteredTickets}
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            onSelect={setSelectedTicket}
          />
        );

      case "Users":
        return <UsersPage />;

      case "Messages":
        return (
          <MessagesPage
            messageText={messageText}
            setMessageText={setMessageText}
            sendMessage={sendMessage}
          />
        );

      case "Reports":
        return (
          <ReportsPage
            totalTickets={totalTickets}
            openTickets={openTickets}
            pendingTickets={pendingTickets}
            resolvedTickets={resolvedTickets}
          />
        );

      case "Settings":
        return <SettingsPage />;

      default:
        return (
          <Dashboard
            totalTickets={totalTickets}
            openTickets={openTickets}
            pendingTickets={pendingTickets}
            resolvedTickets={resolvedTickets}
            tickets={tickets}
            onSelect={setSelectedTicket}
            setActivePage={setActivePage}
          />
        );
    }
  };

  return (
    <div className="app">
      <aside className={`sidebar ${mobileMenu ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">CS</div>
          <div>
            <h2>SupportHub</h2>
            <span>Customer Support</span>
          </div>
        </div>

        <nav>
          <p className="nav-title">MAIN MENU</p>

          <NavItem
            icon="▦"
            label="Dashboard"
            active={activePage === "Dashboard"}
            onClick={() => {
              setActivePage("Dashboard");
              setMobileMenu(false);
            }}
          />

          <NavItem
            icon="🎫"
            label="Tickets"
            active={activePage === "Tickets"}
            badge={openTickets}
            onClick={() => {
              setActivePage("Tickets");
              setMobileMenu(false);
            }}
          />

          <NavItem
            icon="👥"
            label="Users"
            active={activePage === "Users"}
            onClick={() => {
              setActivePage("Users");
              setMobileMenu(false);
            }}
          />

          <NavItem
            icon="💬"
            label="Messages"
            active={activePage === "Messages"}
            badge="4"
            onClick={() => {
              setActivePage("Messages");
              setMobileMenu(false);
            }}
          />

          <p className="nav-title">MANAGEMENT</p>

          <NavItem
            icon="📊"
            label="Reports"
            active={activePage === "Reports"}
            onClick={() => {
              setActivePage("Reports");
              setMobileMenu(false);
            }}
          />

          <NavItem
            icon="⚙"
            label="Settings"
            active={activePage === "Settings"}
            onClick={() => {
              setActivePage("Settings");
              setMobileMenu(false);
            }}
          />
        </nav>

        <div className="agent-card">
          <div className="agent-avatar">AS</div>
          <div>
            <strong>Alex Smith</strong>
            <span>Support Agent</span>
          </div>
        </div>
      </aside>

      {mobileMenu && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <main className="main">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>

          <div>
            <h1>{activePage}</h1>
            <p>Manage your customer support operations</p>
          </div>

          <div className="topbar-actions">
            <button className="icon-button">🔔</button>

            <div className="top-user">
              <div className="avatar">AS</div>
              <div>
                <strong>Alex Smith</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <section className="content">{renderPage()}</section>
      </main>

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          updateStatus={updateTicketStatus}
        />
      )}

      {notification && (
        <div className="notification">
          <span>✓</span>
          {notification}
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, active, badge, onClick }) {
  return (
    <button
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="nav-icon">{icon}</span>
      <span>{label}</span>
      {badge && <small>{badge}</small>}
    </button>
  );
}

function Dashboard({
  totalTickets,
  openTickets,
  pendingTickets,
  resolvedTickets,
  tickets,
  onSelect,
  setActivePage,
}) {
  return (
    <>
      <div className="welcome">
        <div>
          <h2>Good morning, Alex! 👋</h2>
          <p>Here is what's happening with your support team today.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setActivePage("Tickets")}
        >
          + View All Tickets
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Tickets"
          value={totalTickets}
          change="+12.5%"
          icon="🎫"
          type="blue"
        />

        <StatCard
          title="Open Tickets"
          value={openTickets}
          change="+4.2%"
          icon="🔴"
          type="red"
        />

        <StatCard
          title="Pending Tickets"
          value={pendingTickets}
          change="-2.8%"
          icon="⏳"
          type="orange"
        />

        <StatCard
          title="Resolved Tickets"
          value={resolvedTickets}
          change="+8.4%"
          icon="✓"
          type="green"
        />
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Ticket Overview</h3>
              <p>Support ticket activity</p>
            </div>

            <select>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="chart">
            {[55, 75, 48, 82, 65, 90, 70].map((height, index) => (
              <div className="chart-column" key={index}>
                <div
                  className="bar"
                  style={{ height: `${height}%` }}
                ></div>
                <span>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Ticket Status</h3>
              <p>Current distribution</p>
            </div>
          </div>

          <div className="status-overview">
            <StatusCircle
              value={openTickets}
              label="Open"
              className="status-red"
            />

            <StatusCircle
              value={pendingTickets}
              label="Pending"
              className="status-orange"
            />

            <StatusCircle
              value={resolvedTickets}
              label="Resolved"
              className="status-green"
            />
          </div>

          <div className="status-list">
            <div>
              <span><i className="dot red"></i>Open</span>
              <strong>{openTickets}</strong>
            </div>

            <div>
              <span><i className="dot orange"></i>Pending</span>
              <strong>{pendingTickets}</strong>
            </div>

            <div>
              <span><i className="dot green"></i>Resolved</span>
              <strong>{resolvedTickets}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="panel recent-panel">
        <div className="panel-header">
          <div>
            <h3>Recent Tickets</h3>
            <p>Latest customer support requests</p>
          </div>

          <button
            className="text-button"
            onClick={() => setActivePage("Tickets")}
          >
            View All →
          </button>
        </div>

        <TicketTable tickets={tickets.slice(0, 5)} onSelect={onSelect} />
      </div>
    </>
  );
}

function StatCard({ title, value, change, icon, type }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${type}`}>{icon}</div>

      <div className="stat-content">
        <span>{title}</span>
        <h2>{value}</h2>
        <small className={change.startsWith("-") ? "negative" : ""}>
          {change} <span>vs last month</span>
        </small>
      </div>
    </div>
  );
}

function StatusCircle({ value, label, className }) {
  return (
    <div className="status-circle-container">
      <div className={`status-circle ${className}`}>
        <strong>{value}</strong>
      </div>
      <span>{label}</span>
    </div>
  );
}

function TicketsPage({
  tickets,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  onSelect,
}) {
  return (
    <>
      <div className="page-heading">
        <div>
          <h2>Support Tickets</h2>
          <p>Manage and respond to customer support requests.</p>
        </div>

        <button className="primary-button">+ New Ticket</button>
      </div>

      <div className="filter-panel">
        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search ticket, customer or ID..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
        >
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>All Tickets</h3>
            <p>{tickets.length} tickets found</p>
          </div>
        </div>

        <TicketTable tickets={tickets} onSelect={onSelect} />
      </div>
    </>
  );
}

function TicketTable({ tickets, onSelect }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Customer</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Agent</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              onClick={() => onSelect(ticket)}
              className="clickable-row"
            >
              <td>
                <div className="ticket-title">
                  <strong>{ticket.id}</strong>
                  <span>{ticket.subject}</span>
                </div>
              </td>

              <td>
                <div className="customer-cell">
                  <div className="mini-avatar">
                    {ticket.user
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </div>

                  <span>{ticket.user}</span>
                </div>
              </td>

              <td>{ticket.category}</td>

              <td>
                <PriorityBadge priority={ticket.priority} />
              </td>

              <td>{ticket.agent}</td>

              <td>
                <StatusBadge status={ticket.status} />
              </td>

              <td>{ticket.date}</td>
            </tr>
          ))}

          {tickets.length === 0 && (
            <tr>
              <td colSpan="7">
                <div className="empty-state">
                  No tickets found.
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function PriorityBadge({ priority }) {
  return (
    <span className={`priority-badge ${priority.toLowerCase()}`}>
      {priority}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${status.toLowerCase()}`}>
      <i></i>
      {status}
    </span>
  );
}

function UsersPage() {
  return (
    <>
      <div className="page-heading">
        <div>
          <h2>Customers</h2>
          <p>Manage customers and their support activity.</p>
        </div>

        <button className="primary-button">+ Add Customer</button>
      </div>

      <div className="user-stats">
        <div className="user-stat">
          <span>Total Customers</span>
          <strong>1,248</strong>
        </div>

        <div className="user-stat">
          <span>Active Customers</span>
          <strong>1,108</strong>
        </div>

        <div className="user-stat">
          <span>New This Month</span>
          <strong>126</strong>
        </div>

        <div className="user-stat">
          <span>Average Tickets</span>
          <strong>4.8</strong>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Customer List</h3>
            <p>Registered support customers</p>
          </div>

          <div className="search-box small-search">
            <span>⌕</span>
            <input placeholder="Search customers..." />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Tickets</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="customer-cell">
                      <div className="mini-avatar">
                        {user.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </div>
                      <strong>{user.name}</strong>
                    </div>
                  </td>

                  <td>{user.email}</td>
                  <td>{user.tickets}</td>

                  <td>
                    <span
                      className={`user-status ${user.status.toLowerCase()}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>{user.joined}</td>

                  <td>
                    <button className="more-button">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function MessagesPage({
  messageText,
  setMessageText,
  sendMessage,
}) {
  const [activeMessage, setActiveMessage] = useState(messages[0]);

  return (
    <>
      <div className="page-heading">
        <div>
          <h2>Messages</h2>
          <p>Communicate with your customers.</p>
        </div>
      </div>

      <div className="messages-container">
        <div className="conversation-list">
          <div className="conversation-header">
            <h3>Conversations</h3>
            <span>4</span>
          </div>

          <div className="message-search">
            <span>⌕</span>
            <input placeholder="Search messages..." />
          </div>

          {messages.map((message) => (
            <button
              key={message.id}
              className={`conversation ${
                activeMessage.id === message.id ? "selected" : ""
              }`}
              onClick={() => setActiveMessage(message)}
            >
              <div className="mini-avatar">
                {message.user
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>

              <div className="conversation-content">
                <div>
                  <strong>{message.user}</strong>
                  <small>{message.time}</small>
                </div>

                <p>{message.preview}</p>
              </div>

              {message.unread && <i className="unread-dot"></i>}
            </button>
          ))}
        </div>

        <div className="chat-window">
          <div className="chat-header">
            <div className="customer-cell">
              <div className="mini-avatar">
                {activeMessage.user
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>

              <div>
                <strong>{activeMessage.user}</strong>
                <span>Online</span>
              </div>
            </div>

            <div className="chat-actions">
              <button>📞</button>
              <button>⋮</button>
            </div>
          </div>

          <div className="chat-messages">
            <div className="date-divider">
              <span>Today</span>
            </div>

            <div className="message customer-message">
              <p>{activeMessage.preview}</p>
              <small>{activeMessage.time}</small>
            </div>

            <div className="message agent-message">
              <p>
                Hello {activeMessage.user.split(" ")[0]}, thank you for
                contacting our support team. I will be happy to help you with
                this issue.
              </p>
              <small>10:30 AM</small>
            </div>

            <div className="message customer-message">
              <p>
                Thank you. I appreciate your help. Please let me know what I
                should do next.
              </p>
              <small>10:34 AM</small>
            </div>
          </div>

          <div className="message-input">
            <button>📎</button>

            <input
              type="text"
              placeholder="Type your message..."
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button className="send-button" onClick={sendMessage}>
              ➤
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ReportsPage({
  totalTickets,
  openTickets,
  pendingTickets,
  resolvedTickets,
}) {
  const resolutionRate = Math.round(
    (resolvedTickets / totalTickets) * 100
  );

  return (
    <>
      <div className="page-heading">
        <div>
          <h2>Support Reports</h2>
          <p>Analyze your customer support performance.</p>
        </div>

        <button className="primary-button">Export Report</button>
      </div>

      <div className="report-cards">
        <div className="report-card">
          <span>Resolution Rate</span>
          <strong>{resolutionRate}%</strong>
          <div className="progress">
            <span style={{ width: `${resolutionRate}%` }}></span>
          </div>
        </div>

        <div className="report-card">
          <span>Average Response Time</span>
          <strong>18 min</strong>
          <small className="success-text">↓ 12% from last month</small>
        </div>

        <div className="report-card">
          <span>Customer Satisfaction</span>
          <strong>94%</strong>
          <small className="success-text">↑ 5.2% from last month</small>
        </div>

        <div className="report-card">
          <span>Tickets This Month</span>
          <strong>342</strong>
          <small>Across all categories</small>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Ticket Performance</h3>
              <p>Tickets handled over the past week</p>
            </div>
          </div>

          <div className="large-chart">
            {[60, 75, 45, 80, 65, 92, 70].map((height, index) => (
              <div className="chart-column" key={index}>
                <div
                  className="bar"
                  style={{ height: `${height}%` }}
                ></div>
                <span>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Ticket Summary</h3>
              <p>Current ticket status</p>
            </div>
          </div>

          <div className="report-summary">
            <ReportRow
              label="Open"
              value={openTickets}
              percent={Math.round((openTickets / totalTickets) * 100)}
              type="red"
            />

            <ReportRow
              label="Pending"
              value={pendingTickets}
              percent={Math.round((pendingTickets / totalTickets) * 100)}
              type="orange"
            />

            <ReportRow
              label="Resolved"
              value={resolvedTickets}
              percent={Math.round((resolvedTickets / totalTickets) * 100)}
              type="green"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function ReportRow({ label, value, percent, type }) {
  return (
    <div className="report-row">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <div className="report-progress">
        <div className={`progress ${type}`}>
          <span style={{ width: `${percent}%` }}></span>
        </div>
        <small>{percent}%</small>
      </div>
    </div>
  );
}

function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(true);

  return (
    <>
      <div className="page-heading">
        <div>
          <h2>Settings</h2>
          <p>Manage your support dashboard preferences.</p>
        </div>

        <button className="primary-button">Save Changes</button>
      </div>

      <div className="settings-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Account Settings</h3>
              <p>Update your account information.</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              Full Name
              <input value="Alex Smith" readOnly />
            </label>

            <label>
              Email Address
              <input value="alex@example.com" readOnly />
            </label>

            <label>
              Role
              <input value="Administrator" readOnly />
            </label>

            <label>
              Timezone
              <select>
                <option>India Standard Time</option>
                <option>UTC</option>
                <option>Eastern Time</option>
              </select>
            </label>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Notifications</h3>
              <p>Choose how you receive notifications.</p>
            </div>
          </div>

          <div className="setting-option">
            <div>
              <strong>Email Notifications</strong>
              <span>Receive updates about support tickets.</span>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() =>
                  setEmailNotifications(!emailNotifications)
                }
              />
              <span></span>
            </label>
          </div>

          <div className="setting-option">
            <div>
              <strong>Desktop Notifications</strong>
              <span>Show notifications on your desktop.</span>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={desktopNotifications}
                onChange={() =>
                  setDesktopNotifications(!desktopNotifications)
                }
              />
              <span></span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

function TicketModal({ ticket, onClose, updateStatus }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="ticket-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span className="modal-ticket-id">{ticket.id}</span>
            <h2>{ticket.subject}</h2>
          </div>

          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="ticket-meta">
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
          <span>{ticket.category}</span>
        </div>

        <div className="ticket-user">
          <div className="large-avatar">
            {ticket.user
              .split(" ")
              .map((name) => name[0])
              .join("")}
          </div>

          <div>
            <strong>{ticket.user}</strong>
            <span>{ticket.email}</span>
          </div>
        </div>

        <div className="ticket-description">
          <h4>Customer Message</h4>
          <p>{ticket.message}</p>
        </div>

        <div className="ticket-details">
          <div>
            <span>Assigned Agent</span>
            <strong>{ticket.agent}</strong>
          </div>

          <div>
            <span>Created</span>
            <strong>{ticket.date}</strong>
          </div>

          <div>
            <span>Category</span>
            <strong>{ticket.category}</strong>
          </div>
        </div>

        <div className="status-actions">
          <span>Change Status:</span>

          <button
            className={ticket.status === "Open" ? "selected-status" : ""}
            onClick={() => updateStatus(ticket.id, "Open")}
          >
            Open
          </button>

          <button
            className={ticket.status === "Pending" ? "selected-status" : ""}
            onClick={() => updateStatus(ticket.id, "Pending")}
          >
            Pending
          </button>

          <button
            className={ticket.status === "Resolved" ? "selected-status" : ""}
            onClick={() => updateStatus(ticket.id, "Resolved")}
          >
            Resolved
          </button>
        </div>

        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose}>
            Close
          </button>

          <button className="primary-button">
            Reply to Customer
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;