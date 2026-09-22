import { useState } from "react";
import "./App.css";

const ordersData = [
  {
    id: "#ORD-1001",
    customer: "Rahul Sharma",
    items: "Chicken Biryani, Coke",
    amount: 520,
    status: "Completed",
    time: "10:30 AM",
  },
  {
    id: "#ORD-1002",
    customer: "Priya Reddy",
    items: "Paneer Butter Masala, Naan",
    amount: 460,
    status: "Preparing",
    time: "10:42 AM",
  },
  {
    id: "#ORD-1003",
    customer: "Arjun Kumar",
    items: "Veg Fried Rice, Manchurian",
    amount: 380,
    status: "Pending",
    time: "11:05 AM",
  },
  {
    id: "#ORD-1004",
    customer: "Sneha Rao",
    items: "Chicken 65, Biryani",
    amount: 650,
    status: "Completed",
    time: "11:20 AM",
  },
  {
    id: "#ORD-1005",
    customer: "Vikram Singh",
    items: "Masala Dosa, Coffee",
    amount: 280,
    status: "Cancelled",
    time: "11:35 AM",
  },
  {
    id: "#ORD-1006",
    customer: "Anjali Patel",
    items: "Pizza, Fresh Lime",
    amount: 590,
    status: "Preparing",
    time: "11:50 AM",
  },
];

const menuData = [
  {
    id: 1,
    name: "Chicken Biryani",
    category: "Main Course",
    price: 280,
    status: "Available",
    orders: 124,
  },
  {
    id: 2,
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 240,
    status: "Available",
    orders: 96,
  },
  {
    id: 3,
    name: "Veg Fried Rice",
    category: "Rice",
    price: 180,
    status: "Available",
    orders: 82,
  },
  {
    id: 4,
    name: "Chicken 65",
    category: "Starters",
    price: 220,
    status: "Available",
    orders: 76,
  },
  {
    id: 5,
    name: "Masala Dosa",
    category: "South Indian",
    price: 120,
    status: "Available",
    orders: 68,
  },
  {
    id: 6,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 350,
    status: "Unavailable",
    orders: 45,
  },
  {
    id: 7,
    name: "Gulab Jamun",
    category: "Desserts",
    price: 90,
    status: "Available",
    orders: 52,
  },
  {
    id: 8,
    name: "Fresh Lime Soda",
    category: "Beverages",
    price: 80,
    status: "Available",
    orders: 91,
  },
];

const tablesData = [
  { id: 1, number: "T-01", seats: 2, status: "Available", order: "-" },
  { id: 2, number: "T-02", seats: 4, status: "Occupied", order: "#ORD-1001" },
  { id: 3, number: "T-03", seats: 4, status: "Reserved", order: "-" },
  { id: 4, number: "T-04", seats: 6, status: "Occupied", order: "#ORD-1002" },
  { id: 5, number: "T-05", seats: 2, status: "Available", order: "-" },
  { id: 6, number: "T-06", seats: 4, status: "Available", order: "-" },
  { id: 7, number: "T-07", seats: 8, status: "Occupied", order: "#ORD-1004" },
  { id: 8, number: "T-08", seats: 6, status: "Cleaning", order: "-" },
  { id: 9, number: "T-09", seats: 4, status: "Available", order: "-" },
  { id: 10, number: "T-10", seats: 2, status: "Reserved", order: "-" },
  { id: 11, number: "T-11", seats: 6, status: "Occupied", order: "#ORD-1006" },
  { id: 12, number: "T-12", seats: 4, status: "Available", order: "-" },
];

const revenueData = [
  { day: "Mon", value: 62 },
  { day: "Tue", value: 75 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 88 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 96 },
  { day: "Sun", value: 82 },
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderSearch, setOrderSearch] = useState("");
  const [menuSearch, setMenuSearch] = useState("");
  const [menuCategory, setMenuCategory] = useState("All");

  const filteredOrders = ordersData.filter(
    (order) =>
      order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.customer.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const filteredMenu = menuData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(menuSearch.toLowerCase());

    const matchesCategory =
      menuCategory === "All" || item.category === menuCategory;

    return matchesSearch && matchesCategory;
  });

  const pageTitles = {
    dashboard: "Dashboard",
    orders: "Orders",
    menu: "Menu Management",
    tables: "Table Management",
    revenue: "Revenue",
    customers: "Customers",
    settings: "Settings",
  };

  return (
    <div className="app">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">🍽️</div>
          <div>
            <strong>FoodHub</strong>
            <span>Restaurant</span>
          </div>
        </div>

        <div className="restaurant-info">
          <div className="restaurant-avatar">FH</div>
          <div>
            <strong>FoodHub Restaurant</strong>
            <span>Downtown Branch</span>
          </div>
        </div>

        <p className="menu-label">MAIN MENU</p>

        <nav className="sidebar-nav">
          <SidebarButton
            icon="📊"
            label="Dashboard"
            page="dashboard"
            activePage={activePage}
            setActivePage={setActivePage}
            closeSidebar={() => setSidebarOpen(false)}
          />

          <SidebarButton
            icon="🧾"
            label="Orders"
            page="orders"
            activePage={activePage}
            setActivePage={setActivePage}
            closeSidebar={() => setSidebarOpen(false)}
            badge="6"
          />

          <SidebarButton
            icon="🍔"
            label="Menu"
            page="menu"
            activePage={activePage}
            setActivePage={setActivePage}
            closeSidebar={() => setSidebarOpen(false)}
          />

          <SidebarButton
            icon="🪑"
            label="Tables"
            page="tables"
            activePage={activePage}
            setActivePage={setActivePage}
          />

          <SidebarButton
            icon="💰"
            label="Revenue"
            page="revenue"
            activePage={activePage}
            setActivePage={setActivePage}
          />

          <SidebarButton
            icon="👥"
            label="Customers"
            page="customers"
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </nav>

        <p className="menu-label">SYSTEM</p>

        <SidebarButton
          icon="⚙️"
          label="Settings"
          page="settings"
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <div className="sidebar-bottom">
          <div className="support-box">
            <span>💬</span>
            <strong>Need Help?</strong>
            <small>Contact support</small>
            <button>Get Support</button>
          </div>
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
          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <div>
            <h1>{pageTitles[activePage]}</h1>
            <p>Welcome back, Admin 👋</p>
          </div>

          <div className="topbar-actions">
            <button className="notification">
              🔔
              <span></span>
            </button>

            <div className="admin-profile">
              <div className="admin-avatar">A</div>
              <div>
                <strong>Admin</strong>
                <small>Manager</small>
              </div>
            </div>
          </div>
        </header>

        {activePage === "dashboard" && (
          <Dashboard
            setActivePage={setActivePage}
            orders={ordersData}
          />
        )}

        {activePage === "orders" && (
          <Orders
            orders={filteredOrders}
            search={orderSearch}
            setSearch={setOrderSearch}
          />
        )}

        {activePage === "menu" && (
          <Menu
            menu={filteredMenu}
            search={menuSearch}
            setSearch={setMenuSearch}
            category={menuCategory}
            setCategory={setMenuCategory}
          />
        )}

        {activePage === "tables" && <Tables />}

        {activePage === "revenue" && <Revenue />}

        {activePage === "customers" && <Customers />}

        {activePage === "settings" && <Settings />}
      </main>
    </div>
  );
}

function SidebarButton({
  icon,
  label,
  page,
  activePage,
  setActivePage,
  closeSidebar,
  badge,
}) {
  return (
    <button
      className={`sidebar-link ${activePage === page ? "active" : ""}`}
      onClick={() => {
        setActivePage(page);
        closeSidebar?.();
      }}
    >
      <span>{icon}</span>
      {label}
      {badge && <b>{badge}</b>}
    </button>
  );
}

function Dashboard({ setActivePage, orders }) {
  return (
    <div className="page-content">
      <section className="stats-grid">
        <StatCard
          icon="💰"
          title="Today's Revenue"
          value="₹48,650"
          change="+12.5%"
          positive
        />

        <StatCard
          icon="🧾"
          title="Total Orders"
          value="156"
          change="+8.2%"
          positive
        />

        <StatCard
          icon="🪑"
          title="Occupied Tables"
          value="18 / 30"
          change="60%"
          positive
        />

        <StatCard
          icon="👥"
          title="Customers"
          value="124"
          change="+15.4%"
          positive
        />
      </section>

      <section className="dashboard-grid">
        <div className="panel revenue-panel">
          <div className="panel-header">
            <div>
              <h2>Revenue Overview</h2>
              <p>Weekly revenue performance</p>
            </div>

            <select>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="chart">
            <div className="chart-lines">
              <span>₹100K</span>
              <span>₹75K</span>
              <span>₹50K</span>
              <span>₹25K</span>
              <span>₹0</span>
            </div>

            <div className="bars">
              {revenueData.map((item) => (
                <div className="bar-wrapper" key={item.day}>
                  <div
                    className="bar"
                    style={{ height: `${item.value}%` }}
                    title={`${item.value}%`}
                  ></div>
                  <span>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel popular-panel">
          <div className="panel-header">
            <div>
              <h2>Popular Items</h2>
              <p>Most ordered dishes</p>
            </div>

            <button onClick={() => setActivePage("menu")}>
              View Menu →
            </button>
          </div>

          <PopularItem
            number="01"
            name="Chicken Biryani"
            orders="124 orders"
            amount="₹34,720"
          />

          <PopularItem
            number="02"
            name="Paneer Butter Masala"
            orders="96 orders"
            amount="₹23,040"
          />

          <PopularItem
            number="03"
            name="Veg Fried Rice"
            orders="82 orders"
            amount="₹14,760"
          />

          <PopularItem
            number="04"
            name="Fresh Lime Soda"
            orders="91 orders"
            amount="₹7,280"
          />
        </div>
      </section>

      <section className="dashboard-grid bottom-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Recent Orders</h2>
              <p>Latest restaurant orders</p>
            </div>

            <button onClick={() => setActivePage("orders")}>
              View All →
            </button>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.id}</strong>
                    </td>
                    <td>{order.customer}</td>
                    <td>₹{order.amount}</td>
                    <td>
                      <Status status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel table-status-panel">
          <div className="panel-header">
            <div>
              <h2>Table Status</h2>
              <p>Current seating status</p>
            </div>

            <button onClick={() => setActivePage("tables")}>
              Manage →
            </button>
          </div>

          <div className="table-summary">
            <div>
              <span className="dot available"></span>
              <strong>12</strong>
              <small>Available</small>
            </div>

            <div>
              <span className="dot occupied"></span>
              <strong>12</strong>
              <small>Occupied</small>
            </div>

            <div>
              <span className="dot reserved"></span>
              <strong>4</strong>
              <small>Reserved</small>
            </div>

            <div>
              <span className="dot cleaning"></span>
              <strong>2</strong>
              <small>Cleaning</small>
            </div>
          </div>

          <div className="occupancy">
            <div className="occupancy-header">
              <span>Table Occupancy</span>
              <strong>60%</strong>
            </div>

            <div className="progress">
              <span style={{ width: "60%" }}></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, title, value, change, positive }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">{icon}</div>

        <span className={positive ? "change positive" : "change"}>
          {change}
        </span>
      </div>

      <p>{title}</p>
      <h2>{value}</h2>
      <small>Compared to last week</small>
    </div>
  );
}

function PopularItem({ number, name, orders, amount }) {
  return (
    <div className="popular-item">
      <div className="food-number">{number}</div>

      <div className="food-info">
        <strong>{name}</strong>
        <span>{orders}</span>
      </div>

      <strong>{amount}</strong>
    </div>
  );
}

function Status({ status }) {
  return (
    <span className={`status ${status.toLowerCase()}`}>
      <i></i>
      {status}
    </span>
  );
}

function Orders({ orders, search, setSearch }) {
  return (
    <div className="page-content">
      <div className="content-toolbar">
        <div>
          <h2>All Orders</h2>
          <p>Manage and track restaurant orders</p>
        </div>

        <button className="primary-btn">+ New Order</button>
      </div>

      <div className="filter-bar">
        <div className="search-input">
          🔍
          <input
            type="text"
            placeholder="Search order or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select>
          <option>All Status</option>
          <option>Completed</option>
          <option>Preparing</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>

        <select>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="panel full-panel">
        <div className="table-wrapper">
          <table className="large-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Time</th>
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
                  <td>{order.items}</td>
                  <td>{order.time}</td>
                  <td>
                    <strong>₹{order.amount}</strong>
                  </td>
                  <td>
                    <Status status={order.status} />
                  </td>
                  <td>
                    <button className="action-btn">•••</button>
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

function Menu({ menu, search, setSearch, category, setCategory }) {
  const categories = [
    "All",
    "Main Course",
    "Rice",
    "Starters",
    "South Indian",
    "Pizza",
    "Desserts",
    "Beverages",
  ];

  return (
    <div className="page-content">
      <div className="content-toolbar">
        <div>
          <h2>Menu Management</h2>
          <p>Manage your restaurant food menu</p>
        </div>

        <button className="primary-btn">+ Add Menu Item</button>
      </div>

      <div className="filter-bar">
        <div className="search-input">
          🔍
          <input
            type="text"
            placeholder="Search menu items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="menu-grid">
        {menu.map((item) => (
          <div className="menu-card" key={item.id}>
            <div className="food-image">
              <span>🍛</span>

              <span
                className={`availability ${
                  item.status === "Available" ? "available-bg" : "unavailable-bg"
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="menu-card-body">
              <div className="menu-category">{item.category}</div>

              <h3>{item.name}</h3>

              <div className="menu-card-footer">
                <strong>₹{item.price}</strong>
                <span>{item.orders} orders</span>
              </div>

              <div className="menu-actions">
                <button>Edit</button>
                <button>•••</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tables() {
  return (
    <div className="page-content">
      <div className="content-toolbar">
        <div>
          <h2>Table Management</h2>
          <p>Monitor restaurant seating and table status</p>
        </div>

        <button className="primary-btn">+ Add Table</button>
      </div>

      <div className="table-legend">
        <span>
          <i className="dot available"></i> Available
        </span>
        <span>
          <i className="dot occupied"></i> Occupied
        </span>
        <span>
          <i className="dot reserved"></i> Reserved
        </span>
        <span>
          <i className="dot cleaning"></i> Cleaning
        </span>
      </div>

      <div className="tables-grid">
        {tablesData.map((table) => (
          <div className={`restaurant-table ${table.status.toLowerCase()}`} key={table.id}>
            <div className="table-number">{table.number}</div>

            <div className="table-icon">🪑</div>

            <h3>{table.seats} Seats</h3>

            <Status status={table.status} />

            <small>
              {table.order !== "-" ? `Order ${table.order}` : "No active order"}
            </small>

            <button>Manage Table</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Revenue() {
  return (
    <div className="page-content">
      <div className="content-toolbar">
        <div>
          <h2>Revenue Analytics</h2>
          <p>Track your restaurant financial performance</p>
        </div>

        <select className="period-select">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="stats-grid">
        <StatCard
          icon="💰"
          title="Total Revenue"
          value="₹3,84,250"
          change="+14.8%"
          positive
        />

        <StatCard
          icon="🧾"
          title="Total Orders"
          value="1,248"
          change="+11.2%"
          positive
        />

        <StatCard
          icon="📊"
          title="Average Order"
          value="₹308"
          change="+5.6%"
          positive
        />

        <StatCard
          icon="💳"
          title="Net Profit"
          value="₹1,42,500"
          change="+9.4%"
          positive
        />
      </div>

      <div className="panel large-revenue-panel">
        <div className="panel-header">
          <div>
            <h2>Revenue Performance</h2>
            <p>Daily revenue for the current week</p>
          </div>
        </div>

        <div className="big-chart">
          {revenueData.map((item) => (
            <div className="big-bar-wrapper" key={item.day}>
              <strong>₹{item.value}K</strong>
              <div
                className="big-bar"
                style={{ height: `${item.value * 3}px` }}
              ></div>
              <span>{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="revenue-cards">
        <div className="panel">
          <h3>Payment Methods</h3>

          <PaymentRow name="UPI" amount="₹1,54,800" percentage="40%" />
          <PaymentRow name="Card" amount="₹1,08,500" percentage="28%" />
          <PaymentRow name="Cash" amount="₹84,500" percentage="22%" />
          <PaymentRow name="Other" amount="₹36,450" percentage="10%" />
        </div>

        <div className="panel">
          <h3>Revenue Summary</h3>

          <div className="summary-row">
            <span>Food Sales</span>
            <strong>₹3,12,450</strong>
          </div>

          <div className="summary-row">
            <span>Beverage Sales</span>
            <strong>₹42,800</strong>
          </div>

          <div className="summary-row">
            <span>Delivery Charges</span>
            <strong>₹18,500</strong>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <strong>₹3,73,750</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentRow({ name, amount, percentage }) {
  return (
    <div className="payment-row">
      <div>
        <strong>{name}</strong>
        <span>{percentage}</span>
      </div>

      <strong>{amount}</strong>
    </div>
  );
}

function Customers() {
  const customers = [
    ["Rahul Sharma", "rahul@email.com", "24", "₹8,450"],
    ["Priya Reddy", "priya@email.com", "19", "₹6,280"],
    ["Arjun Kumar", "arjun@email.com", "17", "₹5,920"],
    ["Sneha Rao", "sneha@email.com", "15", "₹5,140"],
    ["Vikram Singh", "vikram@email.com", "12", "₹4,650"],
    ["Anjali Patel", "anjali@email.com", "11", "₹4,280"],
  ];

  return (
    <div className="page-content">
      <div className="content-toolbar">
        <div>
          <h2>Customers</h2>
          <p>View customer activity and order history</p>
        </div>

        <button className="primary-btn">+ Add Customer</button>
      </div>

      <div className="stats-grid">
        <StatCard
          icon="👥"
          title="Total Customers"
          value="2,845"
          change="+12.4%"
          positive
        />

        <StatCard
          icon="⭐"
          title="Returning Customers"
          value="1,420"
          change="+8.7%"
          positive
        />

        <StatCard
          icon="🆕"
          title="New Customers"
          value="284"
          change="+16.2%"
          positive
        />

        <StatCard
          icon="💰"
          title="Customer Value"
          value="₹1,850"
          change="+6.4%"
          positive
        />
      </div>

      <div className="panel full-panel">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr key={customer[0]}>
                  <td>
                    <div className="customer-cell">
                      <div className="customer-avatar">
                        {customer[0].charAt(0)}
                      </div>
                      <strong>{customer[0]}</strong>
                    </div>
                  </td>

                  <td>{customer[1]}</td>
                  <td>{customer[2]}</td>
                  <td>
                    <strong>{customer[3]}</strong>
                  </td>

                  <td>
                    <span className="status completed">
                      <i></i>
                      Active
                    </span>
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

function Settings() {
  return (
    <div className="page-content">
      <div className="content-toolbar">
        <div>
          <h2>Settings</h2>
          <p>Manage your restaurant dashboard settings</p>
        </div>

        <button className="primary-btn">Save Changes</button>
      </div>

      <div className="settings-grid">
        <div className="panel">
          <h3>Restaurant Information</h3>

          <div className="form-group">
            <label>Restaurant Name</label>
            <input defaultValue="FoodHub Restaurant" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input defaultValue="admin@foodhub.com" />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input defaultValue="+91 98765 43210" />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea defaultValue="MG Road, Downtown, Vijayawada" />
          </div>
        </div>

        <div className="panel">
          <h3>Dashboard Preferences</h3>

          <ToggleRow
            title="Order Notifications"
            description="Receive notifications for new orders"
          />

          <ToggleRow
            title="Table Notifications"
            description="Get notified about table reservations"
          />

          <ToggleRow
            title="Daily Revenue Report"
            description="Receive daily revenue summary"
          />

          <ToggleRow
            title="Customer Updates"
            description="Receive customer activity updates"
          />
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ title, description }) {
  return (
    <div className="toggle-row">
      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <label className="switch">
        <input type="checkbox" defaultChecked />
        <span></span>
      </label>
    </div>
  );
}

export default App;