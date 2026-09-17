import { useMemo, useState } from "react";
import "./App.css";

const transactionsData = [
  {
    id: 1,
    name: "Amazon",
    category: "Shopping",
    date: "Sep 16, 2026",
    amount: -1299,
    status: "Completed",
    icon: "🛍️",
  },
  {
    id: 2,
    name: "Salary",
    category: "Income",
    date: "Sep 15, 2026",
    amount: 45000,
    status: "Completed",
    icon: "💼",
  },
  {
    id: 3,
    name: "Netflix",
    category: "Entertainment",
    date: "Sep 14, 2026",
    amount: -649,
    status: "Completed",
    icon: "🎬",
  },
  {
    id: 4,
    name: "Swiggy",
    category: "Food",
    date: "Sep 13, 2026",
    amount: -780,
    status: "Completed",
    icon: "🍔",
  },
  {
    id: 5,
    name: "Freelance Payment",
    category: "Income",
    date: "Sep 12, 2026",
    amount: 12000,
    status: "Completed",
    icon: "💰",
  },
  {
    id: 6,
    name: "Uber",
    category: "Transport",
    date: "Sep 11, 2026",
    amount: -420,
    status: "Completed",
    icon: "🚗",
  },
  {
    id: 7,
    name: "Electricity Bill",
    category: "Bills",
    date: "Sep 10, 2026",
    amount: -1850,
    status: "Completed",
    icon: "⚡",
  },
];

const cardsData = [
  {
    id: 1,
    type: "VISA",
    number: "4582  ****  ****  7821",
    name: "ALEKHYA GORTHI",
    expiry: "09/29",
    balance: "₹72,450.00",
  },
  {
    id: 2,
    type: "MASTERCARD",
    number: "5284  ****  ****  2146",
    name: "ALEKHYA GORTHI",
    expiry: "04/28",
    balance: "₹35,200.00",
  },
];

const spendingData = [
  { month: "Apr", income: 42, expense: 25 },
  { month: "May", income: 48, expense: 31 },
  { month: "Jun", income: 44, expense: 28 },
  { month: "Jul", income: 52, expense: 34 },
  { month: "Aug", income: 49, expense: 30 },
  { month: "Sep", income: 57, expense: 36 },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showTransfer, setShowTransfer] = useState(false);
  const [transferMessage, setTransferMessage] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactionsData.filter((transaction) =>
      `${transaction.name} ${transaction.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const handleNavigation = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
    setTransferMessage("");
  };

  const handleTransfer = (event) => {
    event.preventDefault();
    setTransferMessage("Transfer request submitted successfully.");
    event.target.reset();
  };

  return (
    <div className="app">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">B</div>
          <div>
            <h2>BankFlow</h2>
            <span>Digital Banking</span>
          </div>
        </div>

        <nav className="nav-menu">
          <p className="menu-title">MAIN MENU</p>

          <NavItem
            icon="▦"
            label="Dashboard"
            active={activePage === "Dashboard"}
            onClick={() => handleNavigation("Dashboard")}
          />

          <NavItem
            icon="↔"
            label="Transactions"
            active={activePage === "Transactions"}
            onClick={() => handleNavigation("Transactions")}
          />

          <NavItem
            icon="▣"
            label="My Cards"
            active={activePage === "My Cards"}
            onClick={() => handleNavigation("My Cards")}
          />

          <NavItem
            icon="⇄"
            label="Transfers"
            active={activePage === "Transfers"}
            onClick={() => handleNavigation("Transfers")}
          />

          <p className="menu-title settings-title">ACCOUNT</p>

          <NavItem
            icon="♙"
            label="Profile"
            active={activePage === "Profile"}
            onClick={() => handleNavigation("Profile")}
          />

          <NavItem
            icon="⚙"
            label="Settings"
            active={activePage === "Settings"}
            onClick={() => handleNavigation("Settings")}
          />
        </nav>

        <div className="sidebar-help">
          <div className="help-icon">?</div>
          <div>
            <strong>Need Help?</strong>
            <p>Contact support</p>
          </div>
        </div>

        <div className="user-mini">
          <div className="avatar">AG</div>
          <div className="user-info">
            <strong>Alekhya Gorthi</strong>
            <span>Personal Account</span>
          </div>
          <span className="more">•••</span>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <div className="page-heading">
            <h1>{activePage}</h1>
            <p>
              {activePage === "Dashboard"
                ? "Welcome back, Alekhya 👋"
                : `Manage your ${activePage.toLowerCase()}`}
            </p>
          </div>

          <div className="topbar-actions">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <button className="notification-button">
              🔔
              <span></span>
            </button>

            <div className="top-avatar">AG</div>
          </div>
        </header>

        <div className="page-container">
          {activePage === "Dashboard" && (
            <Dashboard
              cards={cardsData}
              transactions={filteredTransactions}
              onTransfer={() => {
                setActivePage("Transfers");
                setShowTransfer(true);
              }}
              onViewTransactions={() => setActivePage("Transactions")}
            />
          )}

          {activePage === "Transactions" && (
            <TransactionsPage
              transactions={filteredTransactions}
              search={search}
              setSearch={setSearch}
            />
          )}

          {activePage === "My Cards" && <CardsPage cards={cardsData} />}

          {activePage === "Transfers" && (
            <TransfersPage
              showTransfer={showTransfer}
              setShowTransfer={setShowTransfer}
              handleTransfer={handleTransfer}
              transferMessage={transferMessage}
            />
          )}

          {activePage === "Profile" && <ProfilePage />}

          {activePage === "Settings" && <SettingsPage />}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="nav-icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function Dashboard({
  cards,
  transactions,
  onTransfer,
  onViewTransactions,
}) {
  return (
    <>
      <section className="dashboard-grid">
        <div className="balance-card">
          <div className="balance-top">
            <div>
              <span className="balance-label">TOTAL BALANCE</span>
              <h2>₹1,24,850.00</h2>
            </div>
            <div className="balance-wallet">◈</div>
          </div>

          <div className="balance-bottom">
            <div>
              <span>Available Balance</span>
              <strong>₹1,18,420.00</strong>
            </div>
            <div>
              <span>Account Number</span>
              <strong>•••• 7821</strong>
            </div>
          </div>
        </div>

        <StatCard
          title="Monthly Income"
          amount="₹57,000"
          change="+12.5%"
          icon="↗"
          positive
        />

        <StatCard
          title="Monthly Expenses"
          amount="₹36,420"
          change="-4.8%"
          icon="↘"
          positive
        />

        <StatCard
          title="Savings"
          amount="₹20,580"
          change="+18.2%"
          icon="♧"
          positive
        />
      </section>

      <section className="content-grid">
        <div className="panel chart-panel">
          <div className="panel-header">
            <div>
              <h3>Income & Expenses</h3>
              <p>Financial overview for the last 6 months</p>
            </div>

            <select>
              <option>Last 6 months</option>
              <option>This year</option>
              <option>Last year</option>
            </select>
          </div>

          <div className="chart-legend">
            <span>
              <i className="legend income"></i>
              Income
            </span>
            <span>
              <i className="legend expense"></i>
              Expenses
            </span>
          </div>

          <div className="bar-chart">
            <div className="y-axis">
              <span>60K</span>
              <span>45K</span>
              <span>30K</span>
              <span>15K</span>
              <span>0</span>
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
                {spendingData.map((item) => (
                  <div className="bar-group" key={item.month}>
                    <div className="bars-wrapper">
                      <div
                        className="bar income-bar"
                        style={{ height: `${item.income * 1.2}px` }}
                        title={`Income ₹${item.income},000`}
                      ></div>

                      <div
                        className="bar expense-bar"
                        style={{ height: `${item.expense * 1.2}px` }}
                        title={`Expenses ₹${item.expense},000`}
                      ></div>
                    </div>

                    <span>{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="panel quick-panel">
          <div className="panel-header">
            <div>
              <h3>Quick Actions</h3>
              <p>Manage your money quickly</p>
            </div>
          </div>

          <div className="quick-actions">
            <button onClick={onTransfer}>
              <span className="action-icon transfer">⇄</span>
              <span>
                <strong>Transfer Money</strong>
                <small>Send money securely</small>
              </span>
              <b>›</b>
            </button>

            <button>
              <span className="action-icon pay">₹</span>
              <span>
                <strong>Pay Bills</strong>
                <small>Electricity, water & more</small>
              </span>
              <b>›</b>
            </button>

            <button>
              <span className="action-icon add">+</span>
              <span>
                <strong>Add Money</strong>
                <small>Add money to account</small>
              </span>
              <b>›</b>
            </button>

            <button>
              <span className="action-icon qr">▦</span>
              <span>
                <strong>Scan & Pay</strong>
                <small>Pay using QR code</small>
              </span>
              <b>›</b>
            </button>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel transactions-panel">
          <div className="panel-header">
            <div>
              <h3>Recent Transactions</h3>
              <p>Your latest account activity</p>
            </div>

            <button className="text-button" onClick={onViewTransactions}>
              View All →
            </button>
          </div>

          <TransactionTable transactions={transactions.slice(0, 5)} />
        </div>

        <div className="panel cards-panel">
          <div className="panel-header">
            <div>
              <h3>My Cards</h3>
              <p>Your active cards</p>
            </div>

            <button className="text-button">Manage</button>
          </div>

          <div className="mini-cards">
            {cards.map((card) => (
              <BankCard card={card} key={card.id} small />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ title, amount, change, icon, positive }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{title}</span>
        <div className="stat-icon">{icon}</div>
      </div>

      <h3>{amount}</h3>

      <div className={`stat-change ${positive ? "positive" : "negative"}`}>
        {change}
        <span> from last month</span>
      </div>
    </div>
  );
}

function TransactionTable({ transactions }) {
  if (transactions.length === 0) {
    return <div className="empty-state">No transactions found.</div>;
  }

  return (
    <div className="transaction-table-wrapper">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>TRANSACTION</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th>AMOUNT</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                <div className="transaction-name">
                  <div className="transaction-icon">{transaction.icon}</div>
                  <div>
                    <strong>{transaction.name}</strong>
                    <span>{transaction.category}</span>
                  </div>
                </div>
              </td>

              <td>{transaction.date}</td>

              <td>
                <span className="status completed">
                  ● {transaction.status}
                </span>
              </td>

              <td
                className={
                  transaction.amount > 0 ? "amount-income" : "amount-expense"
                }
              >
                {transaction.amount > 0 ? "+" : "-"}₹
                {Math.abs(transaction.amount).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BankCard({ card, small = false }) {
  return (
    <div className={`bank-card ${small ? "small-card" : ""}`}>
      <div className="card-top">
        <span className="chip"></span>
        <strong>{card.type}</strong>
      </div>

      <div className="card-number">{card.number}</div>

      <div className="card-bottom">
        <div>
          <span>CARD HOLDER</span>
          <strong>{card.name}</strong>
        </div>

        <div>
          <span>EXPIRES</span>
          <strong>{card.expiry}</strong>
        </div>
      </div>
    </div>
  );
}

function TransactionsPage({ transactions, search, setSearch }) {
  return (
    <section>
      <div className="page-intro">
        <div>
          <h2>Transaction History</h2>
          <p>View and track all your recent transactions.</p>
        </div>

        <button className="primary-button">Download Statement</button>
      </div>

      <div className="panel full-panel">
        <div className="transaction-filters">
          <div className="large-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select>
            <option>All Transactions</option>
            <option>Income</option>
            <option>Expenses</option>
          </select>

          <select>
            <option>All Time</option>
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>

        <TransactionTable transactions={transactions} />
      </div>
    </section>
  );
}

function CardsPage({ cards }) {
  return (
    <section>
      <div className="page-intro">
        <div>
          <h2>My Cards</h2>
          <p>Manage your debit and credit cards.</p>
        </div>

        <button className="primary-button">+ Add New Card</button>
      </div>

      <div className="cards-page-grid">
        {cards.map((card) => (
          <div className="card-detail-panel panel" key={card.id}>
            <BankCard card={card} />

            <div className="card-details">
              <div>
                <span>Card Balance</span>
                <strong>{card.balance}</strong>
              </div>

              <div>
                <span>Card Type</span>
                <strong>Debit Card</strong>
              </div>

              <div>
                <span>Daily Limit</span>
                <strong>₹50,000</strong>
              </div>

              <div>
                <span>Card Status</span>
                <strong className="active-status">● Active</strong>
              </div>
            </div>

            <div className="card-buttons">
              <button>View Details</button>
              <button>Freeze Card</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TransfersPage({
  showTransfer,
  setShowTransfer,
  handleTransfer,
  transferMessage,
}) {
  return (
    <section>
      <div className="page-intro">
        <div>
          <h2>Money Transfers</h2>
          <p>Send money quickly and securely.</p>
        </div>
      </div>

      <div className="transfer-layout">
        <div className="panel transfer-panel">
          <div className="panel-header">
            <div>
              <h3>Send Money</h3>
              <p>Enter recipient details below.</p>
            </div>
          </div>

          <form className="transfer-form" onSubmit={handleTransfer}>
            <label>
              Recipient Name
              <input
                type="text"
                placeholder="Enter recipient name"
                required
              />
            </label>

            <label>
              Account Number
              <input
                type="text"
                placeholder="Enter account number"
                required
              />
            </label>

            <label>
              IFSC Code
              <input type="text" placeholder="Enter IFSC code" required />
            </label>

            <label>
              Amount
              <div className="amount-input">
                <span>₹</span>
                <input
                  type="number"
                  placeholder="0.00"
                  min="1"
                  required
                />
              </div>
            </label>

            <label>
              Transfer Note
              <textarea
                placeholder="Add a note (optional)"
                rows="3"
              ></textarea>
            </label>

            <button className="primary-button transfer-submit" type="submit">
              Send Money →
            </button>

            {transferMessage && (
              <div className="success-message">{transferMessage}</div>
            )}
          </form>
        </div>

        <div className="panel transfer-info">
          <div className="security-icon">🔒</div>
          <h3>Secure Transfers</h3>
          <p>
            Your transfers are protected with secure banking technology.
          </p>

          <div className="transfer-limit">
            <span>Daily Transfer Limit</span>
            <strong>₹2,00,000</strong>
            <div className="limit-bar">
              <span></span>
            </div>
            <small>₹45,000 used today</small>
          </div>

          <button
            className="secondary-button"
            onClick={() => setShowTransfer(!showTransfer)}
          >
            {showTransfer ? "Transfer Form Open" : "Start Transfer"}
          </button>
        </div>
      </div>
    </section>
  );
}

function ProfilePage() {
  return (
    <section>
      <div className="page-intro">
        <div>
          <h2>My Profile</h2>
          <p>Manage your personal banking information.</p>
        </div>

        <button className="primary-button">Edit Profile</button>
      </div>

      <div className="profile-layout">
        <div className="panel profile-card">
          <div className="large-avatar">AG</div>
          <h3>Alekhya Gorthi</h3>
          <p>Personal Banking Customer</p>

          <div className="profile-account">
            <span>Account Number</span>
            <strong>XXXX XXXX 7821</strong>
          </div>

          <div className="profile-account">
            <span>Account Type</span>
            <strong>Savings Account</strong>
          </div>
        </div>

        <div className="panel profile-details">
          <h3>Personal Information</h3>

          <div className="details-grid">
            <div>
              <span>Full Name</span>
              <strong>Alekhya Gorthi</strong>
            </div>

            <div>
              <span>Email Address</span>
              <strong>alekhya@example.com</strong>
            </div>

            <div>
              <span>Phone Number</span>
              <strong>+91 98765 43210</strong>
            </div>

            <div>
              <span>Date of Birth</span>
              <strong>15 August 2002</strong>
            </div>

            <div>
              <span>City</span>
              <strong>Andhra Pradesh</strong>
            </div>

            <div>
              <span>Member Since</span>
              <strong>January 2025</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SettingsPage() {
  return (
    <section>
      <div className="page-intro">
        <div>
          <h2>Settings</h2>
          <p>Manage your account and notification preferences.</p>
        </div>
      </div>

      <div className="settings-layout">
        <div className="panel settings-panel">
          <h3>Account Settings</h3>

          <div className="setting-row">
            <div>
              <strong>Email Notifications</strong>
              <span>Receive account updates by email</span>
            </div>

            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span></span>
            </label>
          </div>

          <div className="setting-row">
            <div>
              <strong>Transaction Alerts</strong>
              <span>Get notified about every transaction</span>
            </div>

            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span></span>
            </label>
          </div>

          <div className="setting-row">
            <div>
              <strong>Security Alerts</strong>
              <span>Important security notifications</span>
            </div>

            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span></span>
            </label>
          </div>

          <div className="setting-row">
            <div>
              <strong>Marketing Emails</strong>
              <span>Receive promotional offers and updates</span>
            </div>

            <label className="switch">
              <input type="checkbox" />
              <span></span>
            </label>
          </div>
        </div>

        <div className="panel settings-panel">
          <h3>Security</h3>

          <button className="setting-button">
            <span>🔐</span>
            <div>
              <strong>Change Password</strong>
              <small>Update your account password</small>
            </div>
            <b>›</b>
          </button>

          <button className="setting-button">
            <span>📱</span>
            <div>
              <strong>Two-Factor Authentication</strong>
              <small>Protect your account with 2FA</small>
            </div>
            <b>›</b>
          </button>

          <button className="setting-button">
            <span>🔑</span>
            <div>
              <strong>Login Activity</strong>
              <small>Review recent account logins</small>
            </div>
            <b>›</b>
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;