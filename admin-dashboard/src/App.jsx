import { useMemo, useState } from "react";
import "./App.css";

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    joined: "12 Sep 2026",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "Manager",
    status: "Active",
    joined: "10 Sep 2026",
  },
  {
    id: 3,
    name: "David Brown",
    email: "david@example.com",
    role: "User",
    status: "Inactive",
    joined: "08 Sep 2026",
  },
  {
    id: 4,
    name: "Emily Johnson",
    email: "emily@example.com",
    role: "User",
    status: "Active",
    joined: "05 Sep 2026",
  },
  {
    id: 5,
    name: "Michael Davis",
    email: "michael@example.com",
    role: "Manager",
    status: "Active",
    joined: "02 Sep 2026",
  },
];

const orders = [
  {
    id: "#ORD-1001",
    customer: "John Smith",
    product: "Premium Plan",
    amount: "$249",
    status: "Completed",
  },
  {
    id: "#ORD-1002",
    customer: "Sarah Wilson",
    product: "Business Plan",
    amount: "$399",
    status: "Pending",
  },
  {
    id: "#ORD-1003",
    customer: "David Brown",
    product: "Basic Plan",
    amount: "$99",
    status: "Completed",
  },
  {
    id: "#ORD-1004",
    customer: "Emily Johnson",
    product: "Premium Plan",
    amount: "$249",
    status: "Cancelled",
  },
  {
    id: "#ORD-1005",
    customer: "Michael Davis",
    product: "Business Plan",
    amount: "$399",
    status: "Completed",
  },
];

const salesData = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 55 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 70 },
  { month: "May", value: 62 },
  { month: "Jun", value: 82 },
  { month: "Jul", value: 76 },
  { month: "Aug", value: 95 },
  { month: "Sep", value: 88 },
];

const activities = [
  {
    icon: "👤",
    title: "New user registered",
    description: "Emily Johnson joined the platform",
    time: "10 minutes ago",
  },
  {
    icon: "🛒",
    title: "New order received",
    description: "Order #ORD-1005 was placed",
    time: "35 minutes ago",
  },
  {
    icon: "💳",
    title: "Payment completed",
    description: "Payment of $399 received",
    time: "1 hour ago",
  },
  {
    icon: "⚙️",
    title: "System updated",
    description: "Dashboard settings were updated",
    time: "2 hours ago",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const navigation = [
    { name: "Dashboard", icon: "▦" },
    { name: "Users", icon: "👥" },
    { name: "Orders", icon: "🛒" },
    { name: "Analytics", icon: "📊" },
    { name: "Settings", icon: "⚙️" },
  ];

  const changePage = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  return (
    <div className="app">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="logo">
          <div className="logo-icon">A</div>
          <div>
            <h2>AdminPanel</h2>
            <span>Management</span>
          </div>
        </div>

        <nav className="navigation">
          <p className="menu-title">MAIN MENU</p>

          {navigation.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => changePage(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="support-card">
            <div className="support-icon">?</div>
            <div>
              <strong>Need help?</strong>
              <p>Contact support</p>
            </div>
          </div>

          <button className="logout-button" onClick={() => alert("Logged out")}>
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>

            <div>
              <h1>{activePage}</h1>
              <p>Welcome back, Admin</p>
            </div>
          </div>

          <div className="topbar-right">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="notification">
              🔔
              <span className="notification-dot"></span>
            </button>

            <div className="profile">
              <div className="avatar">AG</div>
              <div className="profile-info">
                <strong>Admin</strong>
                <span>Administrator</span>
              </div>
              <span className="arrow">⌄</span>
            </div>
          </div>
        </header>

        {activePage === "Dashboard" && (
          <Dashboard
            filteredUsers={filteredUsers}
            setActivePage={setActivePage}
          />
        )}

        {activePage === "Users" && (
          <UsersPage users={filteredUsers} search={search} />
        )}

        {activePage === "Orders" && <OrdersPage />}

        {activePage === "Analytics" && <AnalyticsPage />}

        {activePage === "Settings" && <SettingsPage />}
      </main>
    </div>
  );
}

function Dashboard({ filteredUsers, setActivePage }) {
  return (
    <div className="page">
      <section className="stats-grid">
        <StatCard
          title="Total Revenue"
          value="$48,290"
          change="+12.5%"
          icon="💰"
          positive
        />

        <StatCard
          title="Total Users"
          value="12,840"
          change="+8.2%"
          icon="👥"
          positive
        />

        <StatCard
          title="Total Orders"
          value="3,642"
          change="+14.7%"
          icon="🛒"
          positive
        />

        <StatCard
          title="Conversion Rate"
          value="6.24%"
          change="-2.1%"
          icon="📈"
          positive={false}
        />
      </section>

      <section className="dashboard-grid">
        <div className="panel sales-panel">
          <div className="panel-header">
            <div>
              <h2>Sales Overview</h2>
              <p>Monthly revenue performance</p>
            </div>

            <select defaultValue="2026">
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>

          <SalesChart />
        </div>

        <div className="panel activity-panel">
          <div className="panel-header">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest system activities</p>
            </div>
          </div>

          <div className="activity-list">
            {activities.map((activity, index) => (
              <div className="activity-item" key={index}>
                <div className="activity-icon">{activity.icon}</div>

                <div className="activity-content">
                  <strong>{activity.title}</strong>
                  <p>{activity.description}</p>
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-grid second-row">
        <div className="panel users-panel">
          <div className="panel-header">
            <div>
              <h2>Recent Users</h2>
              <p>Recently registered users</p>
            </div>

            <button
              className="view-button"
              onClick={() => setActivePage("Users")}
            >
              View All
            </button>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.slice(0, 5).map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-cell">
                        <div className="small-avatar">
                          {getInitials(user.name)}
                        </div>

                        <div>
                          <strong>{user.name}</strong>
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>{user.role}</td>

                    <td>
                      <StatusBadge status={user.status} />
                    </td>

                    <td>{user.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel orders-panel">
          <div className="panel-header">
            <div>
              <h2>Order Summary</h2>
              <p>Latest orders</p>
            </div>

            <button
              className="view-button"
              onClick={() => setActivePage("Orders")}
            >
              View All
            </button>
          </div>

          <div className="order-summary">
            <div className="summary-box">
              <span className="summary-icon">🛍️</span>
              <div>
                <strong>1,284</strong>
                <span>Completed</span>
              </div>
            </div>

            <div className="summary-box">
              <span className="summary-icon">⏳</span>
              <div>
                <strong>286</strong>
                <span>Pending</span>
              </div>
            </div>

            <div className="summary-box">
              <span className="summary-icon">❌</span>
              <div>
                <strong>84</strong>
                <span>Cancelled</span>
              </div>
            </div>
          </div>

          <div className="mini-progress">
            <div className="progress-header">
              <span>Monthly Target</span>
              <strong>78%</strong>
            </div>

            <div className="progress-bar">
              <div style={{ width: "78%" }}></div>
            </div>

            <p>$78,000 of $100,000 target</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, change, icon, positive }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div>
          <p>{title}</p>
          <h2>{value}</h2>
        </div>

        <div className="stat-icon">{icon}</div>
      </div>

      <div className={`stat-change ${positive ? "positive" : "negative"}`}>
        <span>{positive ? "↗" : "↘"}</span>
        {change}
        <small>vs last month</small>
      </div>
    </div>
  );
}

function SalesChart() {
  const maxValue = Math.max(...salesData.map((item) => item.value));

  return (
    <div className="chart">
      <div className="chart-y-axis">
        <span>$100k</span>
        <span>$75k</span>
        <span>$50k</span>
        <span>$25k</span>
        <span>$0</span>
      </div>

      <div className="chart-area">
        <div className="grid-lines">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="bars">
          {salesData.map((item) => (
            <div className="bar-container" key={item.month}>
              <div
                className="bar"
                style={{
                  height: `${(item.value / maxValue) * 90}%`,
                }}
                title={`${item.month}: $${item.value}k`}
              ></div>
              <span>{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsersPage({ users, search }) {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h2>Users Management</h2>
          <p>Manage and monitor all registered users.</p>
        </div>

        <button className="primary-button">+ Add User</button>
      </div>

      <div className="panel full-panel">
        <div className="table-toolbar">
          <div>
            <strong>All Users</strong>
            <span>{users.length} users found</span>
          </div>

          <button className="filter-button">☰ Filter</button>
        </div>

        {search && (
          <div className="search-result">
            Showing results for: <strong>{search}</strong>
          </div>
        )}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className="small-avatar">
                        {getInitials(user.name)}
                      </div>

                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>{user.role}</td>

                  <td>
                    <StatusBadge status={user.status} />
                  </td>

                  <td>{user.joined}</td>

                  <td>
                    <button className="action-button">•••</button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OrdersPage() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h2>Orders Management</h2>
          <p>Track and manage customer orders.</p>
        </div>

        <button className="primary-button">+ New Order</button>
      </div>

      <div className="panel full-panel">
        <div className="table-toolbar">
          <div>
            <strong>Recent Orders</strong>
            <span>{orders.length} recent orders</span>
          </div>

          <button className="filter-button">☰ Filter</button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.id}</strong>
                  </td>

                  <td>{order.customer}</td>

                  <td>{order.product}</td>

                  <td>
                    <strong>{order.amount}</strong>
                  </td>

                  <td>
                    <StatusBadge status={order.status} />
                  </td>

                  <td>
                    <button className="action-button">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h2>Analytics</h2>
          <p>Monitor business performance and growth.</p>
        </div>

        <select className="date-select">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
        </select>
      </div>

      <section className="stats-grid">
        <StatCard
          title="Page Views"
          value="284.6K"
          change="+18.4%"
          icon="👁️"
          positive
        />

        <StatCard
          title="New Customers"
          value="2,482"
          change="+11.2%"
          icon="👤"
          positive
        />

        <StatCard
          title="Average Order"
          value="$184"
          change="+6.8%"
          icon="💵"
          positive
        />

        <StatCard
          title="Bounce Rate"
          value="32.4%"
          change="-4.6%"
          icon="📉"
          positive
        />
      </section>

      <div className="panel analytics-panel">
        <div className="panel-header">
          <div>
            <h2>Performance Overview</h2>
            <p>Illustrative monthly performance data</p>
          </div>
        </div>

        <div className="large-bars">
          {salesData.map((item) => (
            <div className="large-bar-item" key={item.month}>
              <span>{item.month}</span>

              <div className="large-bar-track">
                <div
                  className="large-bar"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>

              <strong>{item.value}%</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h2>Settings</h2>
          <p>Manage your admin dashboard preferences.</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="panel settings-card">
          <h3>Profile Settings</h3>

          <label>Name</label>
          <input type="text" defaultValue="Admin" />

          <label>Email</label>
          <input type="email" defaultValue="admin@example.com" />

          <button className="primary-button">Save Changes</button>
        </div>

        <div className="panel settings-card">
          <h3>Notifications</h3>

          <div className="setting-row">
            <div>
              <strong>Email Notifications</strong>
              <p>Receive important account updates.</p>
            </div>

            <input type="checkbox" defaultChecked />
          </div>

          <div className="setting-row">
            <div>
              <strong>Order Notifications</strong>
              <p>Get notified about new orders.</p>
            </div>

            <input type="checkbox" defaultChecked />
          </div>

          <div className="setting-row">
            <div>
              <strong>Marketing Emails</strong>
              <p>Receive product and marketing updates.</p>
            </div>

            <input type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusClass = status.toLowerCase();

  return <span className={`status ${statusClass}`}>{status}</span>;
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}

export default App;