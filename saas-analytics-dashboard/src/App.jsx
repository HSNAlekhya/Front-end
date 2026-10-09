import { useMemo, useState } from "react";
import "./App.css";

const monthlyData = [
  { month: "Apr", revenue: 18500, users: 820 },
  { month: "May", revenue: 22300, users: 960 },
  { month: "Jun", revenue: 20700, users: 1120 },
  { month: "Jul", revenue: 28600, users: 1290 },
  { month: "Aug", revenue: 31400, users: 1480 },
  { month: "Sep", revenue: 35200, users: 1720 },
  { month: "Oct", revenue: 38900, users: 1950 },
];

const initialCustomers = [
  { id: 1, name: "Olivia Martin", email: "olivia@acme.com", plan: "Enterprise", amount: 299, status: "Active", initials: "OM" },
  { id: 2, name: "Jackson Lee", email: "jackson@orbit.io", plan: "Pro", amount: 99, status: "Active", initials: "JL" },
  { id: 3, name: "Isabella Nguyen", email: "isabella@nova.co", plan: "Starter", amount: 29, status: "Trial", initials: "IN" },
  { id: 4, name: "William Kim", email: "william@pixel.dev", plan: "Pro", amount: 99, status: "Active", initials: "WK" },
  { id: 5, name: "Sofia Patel", email: "sofia@cloud.com", plan: "Enterprise", amount: 299, status: "Cancelled", initials: "SP" },
  { id: 6, name: "Liam Johnson", email: "liam@bright.app", plan: "Starter", amount: 29, status: "Active", initials: "LJ" },
  { id: 7, name: "Ava Thompson", email: "ava@studio.io", plan: "Pro", amount: 99, status: "Trial", initials: "AT" },
  { id: 8, name: "Noah Williams", email: "noah@next.co", plan: "Enterprise", amount: 299, status: "Active", initials: "NW" },
];

const initialSubscriptions = [
  { id: "SUB-1001", customer: "Olivia Martin", plan: "Enterprise", price: 299, billing: "Monthly", status: "Active", date: "Oct 01, 2026" },
  { id: "SUB-1002", customer: "Jackson Lee", plan: "Pro", price: 99, billing: "Monthly", status: "Active", date: "Oct 02, 2026" },
  { id: "SUB-1003", customer: "Isabella Nguyen", plan: "Starter", price: 29, billing: "Monthly", status: "Trial", date: "Oct 03, 2026" },
  { id: "SUB-1004", customer: "William Kim", plan: "Pro", price: 99, billing: "Yearly", status: "Active", date: "Oct 04, 2026" },
  { id: "SUB-1005", customer: "Sofia Patel", plan: "Enterprise", price: 299, billing: "Monthly", status: "Cancelled", date: "Oct 05, 2026" },
  { id: "SUB-1006", customer: "Liam Johnson", plan: "Starter", price: 29, billing: "Yearly", status: "Active", date: "Oct 06, 2026" },
];

const navigation = [
  { label: "Overview", icon: "▦" },
  { label: "Analytics", icon: "◷" },
  { label: "Customers", icon: "♙" },
  { label: "Subscriptions", icon: "▤" },
  { label: "Reports", icon: "▥" },
];

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

function App() {
  const [page, setPage] = useState("Overview");
  const [customers, setCustomers] = useState(initialCustomers);
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [period, setPeriod] = useState("7 months");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [notice, setNotice] = useState("");
  const [settings, setSettings] = useState({
    emailReports: true,
    weeklySummary: true,
    productUpdates: false,
  });

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const activeSubscriptions = subscriptions.filter(
    (subscription) => subscription.status === "Active"
  ).length;

  const monthlyRecurringRevenue = subscriptions
    .filter((subscription) => subscription.status === "Active")
    .reduce((total, subscription) => {
      return total + (
        subscription.billing === "Yearly"
          ? subscription.price / 12
          : subscription.price
      );
    }, 0);

  const visibleData = useMemo(() => {
    if (period === "3 months") return monthlyData.slice(-3);
    if (period === "6 months") return monthlyData.slice(-6);
    return monthlyData;
  }, [period]);

  const visibleCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.plan.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  const visibleSubscriptions = useMemo(() => {
    return subscriptions.filter((subscription) => {
      const matchesSearch =
        subscription.customer.toLowerCase().includes(search.toLowerCase()) ||
        subscription.id.toLowerCase().includes(search.toLowerCase()) ||
        subscription.plan.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || subscription.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [subscriptions, search, statusFilter]);

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  }

  function navigate(label) {
    setPage(label);
    setSearch("");
    setStatusFilter("All");
    setSidebarOpen(false);
  }

  function addCustomer(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const plan = String(form.get("plan") || "Starter");

    if (!name || !email) return;

    const amount = { Starter: 29, Pro: 99, Enterprise: 299 }[plan];

    const newCustomer = {
      id: Date.now(),
      name,
      email,
      plan,
      amount,
      status: "Active",
      initials: name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    };

    setCustomers((previous) => [newCustomer, ...previous]);

    setSubscriptions((previous) => [
      {
        id: `SUB-${Date.now().toString().slice(-6)}`,
        customer: name,
        plan,
        price: amount,
        billing: "Monthly",
        status: "Active",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      },
      ...previous,
    ]);

    setShowAddCustomer(false);
    showNotice("Customer added successfully!");
  }

  function exportReport() {
    const rows = [
      ["Month", "Revenue USD", "Users"],
      ...visibleData.map((item) => [item.month, item.revenue, item.users]),
    ];

    const csv = rows
      .map((row) =>
        row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "saas-analytics-report.csv";
    link.click();
    URL.revokeObjectURL(url);

    showNotice("Analytics report exported!");
  }

  function renderChart(data, key, color, suffix = "") {
    const maximum = Math.max(...data.map((item) => item[key]), 1);

    return (
      <div className="bar-chart">
        {data.map((item) => (
          <div className="bar-column" key={item.month}>
            <div className="bar-space">
              <div
                className={`bar ${color}`}
                style={{ height: `${(item[key] / maximum) * 100}%` }}
                title={`${item.month}: ${item[key].toLocaleString()}${suffix}`}
              />
            </div>
            <span>{item.month}</span>
          </div>
        ))}
      </div>
    );
  }

  function renderCustomerTable() {
    return (
      <section className="panel table-panel">
        <div className="panel-heading">
          <div>
            <h3>{page === "Customers" ? "All Customers" : "Recent Customers"}</h3>
            <p>Manage and review your customer accounts.</p>
          </div>
          <button className="primary-button" onClick={() => setShowAddCustomer(true)}>
            + Add Customer
          </button>
        </div>

        <div className="table-filters">
          <div className="search-input">
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email, plan..."
              aria-label="Search customers"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter customer status"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Trial">Trial</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Plan</th>
                <th>Monthly Value</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {visibleCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-cell">
                      <span className="customer-avatar">{customer.initials}</span>
                      <span>
                        <strong>{customer.name}</strong>
                        <small>{customer.email}</small>
                      </span>
                    </div>
                  </td>
                  <td><span className={`plan-tag ${customer.plan.toLowerCase()}`}>{customer.plan}</span></td>
                  <td>{formatMoney(customer.amount)}</td>
                  <td><StatusBadge status={customer.status} /></td>
                  <td>
                    <button
                      className="table-action"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {visibleCustomers.length === 0 && (
            <div className="empty-state">No matching customers found.</div>
          )}
        </div>

        <div className="table-footer">
          Showing {visibleCustomers.length} of {customers.length} customers
        </div>
      </section>
    );
  }

  function renderSubscriptionTable() {
    return (
      <section className="panel table-panel">
        <div className="panel-heading">
          <div>
            <h3>Subscription Management</h3>
            <p>Review customer plans and billing information.</p>
          </div>
        </div>

        <div className="table-filters">
          <div className="search-input">
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search subscriptions..."
              aria-label="Search subscriptions"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter subscription status"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Trial">Trial</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Subscription ID</th>
                <th>Customer</th>
                <th>Plan</th>
                <th>Price</th>
                <th>Billing</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleSubscriptions.map((subscription) => (
                <tr key={subscription.id}>
                  <td><strong>{subscription.id}</strong></td>
                  <td>{subscription.customer}</td>
                  <td>{subscription.plan}</td>
                  <td>{formatMoney(subscription.price)}</td>
                  <td>{subscription.billing}</td>
                  <td><StatusBadge status={subscription.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {visibleSubscriptions.length === 0 && (
            <div className="empty-state">No matching subscriptions found.</div>
          )}
        </div>

        <div className="table-footer">
          Showing {visibleSubscriptions.length} of {subscriptions.length} subscriptions
        </div>
      </section>
    );
  }

  function renderOverview() {
    return (
      <>
        <section className="welcome-panel">
          <div>
            <span className="eyebrow light-eyebrow">BUSINESS OVERVIEW</span>
            <h2>Good morning, Alekhya 👋</h2>
            <p>Here’s what’s happening with your SaaS business.</p>
            <button className="welcome-action" onClick={() => navigate("Analytics")}>
              Explore analytics <span>→</span>
            </button>
          </div>
          <div className="welcome-art" aria-hidden="true">
            <span>↗</span>
            <div className="art-bars"><i /><i /><i /><i /><i /></div>
          </div>
        </section>

        <div className="stats-grid">
          <StatCard
            icon="$"
            label="Monthly Revenue"
            value={formatMoney(visibleData[visibleData.length - 1].revenue)}
            change="+12.8%"
            tone="violet"
          />
          <StatCard
            icon="♙"
            label="Active Customers"
            value={activeCustomers.toLocaleString()}
            change="+8.2%"
            tone="blue"
          />
          <StatCard
            icon="▤"
            label="Active Subscriptions"
            value={activeSubscriptions.toLocaleString()}
            change="+6.4%"
            tone="green"
          />
          <StatCard
            icon="%"
            label="Churn Rate"
            value="2.4%"
            change="-0.6%"
            tone="orange"
            down
          />
        </div>

        <div className="dashboard-grid">
          <section className="panel chart-panel">
            <div className="panel-heading">
              <div>
                <h3>Revenue Overview</h3>
                <p>Monthly recurring revenue performance</p>
              </div>
              <select
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                aria-label="Select revenue chart period"
              >
                <option>7 months</option>
                <option>6 months</option>
                <option>3 months</option>
              </select>
            </div>

            <div className="chart-legend">
              <span><i className="legend-dot violet-dot" /> Revenue (USD)</span>
              <strong>{formatMoney(visibleData.reduce((sum, item) => sum + item.revenue, 0))}</strong>
            </div>
            {renderChart(visibleData, "revenue", "violet-bar")}
          </section>

          <section className="panel plan-panel">
            <div className="panel-heading">
              <div>
                <h3>Subscription Plans</h3>
                <p>Customer distribution</p>
              </div>
            </div>

            {[
              { name: "Starter", count: customers.filter((c) => c.plan === "Starter").length, color: "starter-fill" },
              { name: "Pro", count: customers.filter((c) => c.plan === "Pro").length, color: "pro-fill" },
              { name: "Enterprise", count: customers.filter((c) => c.plan === "Enterprise").length, color: "enterprise-fill" },
            ].map((plan) => (
              <div className="plan-row" key={plan.name}>
                <div className="plan-row-heading">
                  <span><i className={`legend-dot ${plan.color}`} />{plan.name}</span>
                  <strong>{plan.count}</strong>
                </div>
                <div className="progress-track">
                  <div
                    className={`progress-fill ${plan.color}`}
                    style={{ width: `${(plan.count / Math.max(customers.length, 1)) * 100}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="plan-summary">
              <span>Estimated monthly recurring revenue</span>
              <strong>{formatMoney(monthlyRecurringRevenue)}</strong>
            </div>
          </section>
        </div>

        <div className="section-title-row">
          <div>
            <h2>Customer Activity</h2>
            <p>Recent customer accounts and subscription status.</p>
          </div>
          <button className="text-button" onClick={() => navigate("Customers")}>
            View all customers →
          </button>
        </div>
        {renderCustomerTable()}
      </>
    );
  }

  function renderAnalytics() {
    return (
      <>
        <PageTitle title="Analytics" subtitle="Understand revenue and user growth over time." />
        <div className="stats-grid">
          <StatCard icon="$" label="Total Revenue (sample)" value={formatMoney(visibleData.reduce((sum, item) => sum + item.revenue, 0))} change="Across selected period" tone="violet" />
          <StatCard icon="♙" label="Latest User Count" value={visibleData[visibleData.length - 1].users.toLocaleString()} change="Sample user data" tone="blue" />
          <StatCard icon="↗" label="Revenue Growth" value="+12.8%" change="Illustrative metric" tone="green" />
          <StatCard icon="◷" label="Churn Rate" value="2.4%" change="Illustrative metric" tone="orange" />
        </div>

        <div className="dashboard-grid">
          <section className="panel chart-panel">
            <div className="panel-heading">
              <div><h3>Revenue Trend</h3><p>Revenue by month (USD)</p></div>
              <select value={period} onChange={(event) => setPeriod(event.target.value)}>
                <option>7 months</option><option>6 months</option><option>3 months</option>
              </select>
            </div>
            {renderChart(visibleData, "revenue", "violet-bar")}
          </section>
          <section className="panel chart-panel">
            <div className="panel-heading">
              <div><h3>User Growth</h3><p>Registered users by month</p></div>
            </div>
            {renderChart(visibleData, "users", "blue-bar")}
          </section>
        </div>

        <section className="panel table-panel report-panel">
          <div className="panel-heading">
            <div><h3>Performance Details</h3><p>Monthly sample data</p></div>
            <button className="primary-button" onClick={exportReport}>↓ Export CSV</button>
          </div>
          <div className="table-scroll">
            <table>
              <thead><tr><th>Month</th><th>Revenue</th><th>Users</th><th>Revenue per User</th></tr></thead>
              <tbody>
                {visibleData.map((item) => (
                  <tr key={item.month}>
                    <td><strong>{item.month}</strong></td>
                    <td>{formatMoney(item.revenue)}</td>
                    <td>{item.users.toLocaleString()}</td>
                    <td>{formatMoney(item.revenue / item.users)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
  }

  function renderReports() {
    return (
      <>
        <PageTitle title="Reports" subtitle="Review your sample business performance and export reports." />
        <div className="stats-grid">
          <StatCard icon="$" label="Revenue in Period" value={formatMoney(visibleData.reduce((sum, item) => sum + item.revenue, 0))} change="Selected months" tone="violet" />
          <StatCard icon="♙" label="Latest Users" value={visibleData[visibleData.length - 1].users.toLocaleString()} change="Latest sample month" tone="blue" />
          <StatCard icon="▤" label="Subscriptions" value={subscriptions.length} change="All statuses" tone="green" />
          <StatCard icon="♧" label="Customers" value={customers.length} change="All customer records" tone="orange" />
        </div>

        <section className="panel report-panel">
          <div className="panel-heading">
            <div><h3>Monthly Revenue Report</h3><p>Export this sample report as a CSV file.</p></div>
            <button className="primary-button" onClick={exportReport}>↓ Export CSV</button>
          </div>
          <div className="report-period">
            <label htmlFor="report-period">Report period</label>
            <select id="report-period" value={period} onChange={(event) => setPeriod(event.target.value)}>
              <option>7 months</option><option>6 months</option><option>3 months</option>
            </select>
          </div>
          <div className="table-scroll">
            <table>
              <thead><tr><th>Month</th><th>Revenue</th><th>Users</th><th>Revenue per User</th></tr></thead>
              <tbody>
                {visibleData.map((item) => (
                  <tr key={item.month}>
                    <td><strong>{item.month}</strong></td>
                    <td>{formatMoney(item.revenue)}</td>
                    <td>{item.users.toLocaleString()}</td>
                    <td>{formatMoney(item.revenue / item.users)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
  }

  function renderSettings() {
    return (
      <section className="panel settings-panel">
        <PageTitle title="Settings" subtitle="Customize your dashboard preferences." />
        {[
          ["emailReports", "Email reports", "Receive business report notifications."],
          ["weeklySummary", "Weekly summary", "Review a summary of your activity."],
          ["productUpdates", "Product updates", "Receive updates about new features."],
        ].map(([key, title, description]) => (
          <label className="setting-row" key={key}>
            <span><strong>{title}</strong><small>{description}</small></span>
            <input
              type="checkbox"
              checked={settings[key]}
              onChange={(event) => setSettings((previous) => ({ ...previous, [key]: event.target.checked }))}
            />
          </label>
        ))}
        <button className="primary-button" onClick={() => showNotice("Preferences saved for this session.")}>
          Save Preferences
        </button>
      </section>
    );
  }

  return (
    <div className="app-shell">
      {sidebarOpen && <button className="sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <span className="brand-symbol">S</span>
          <span>metric<span className="brand-purple">flow</span></span>
        </div>

        <div className="workspace">
          <div className="workspace-icon">M</div>
          <div><strong>MetricFlow Inc.</strong><small>Business workspace</small></div>
          <span className="workspace-chevron">⌄</span>
        </div>

        <p className="nav-label">WORKSPACE</p>
        <nav className="main-nav">
          {navigation.map((item) => (
            <button
              key={item.label}
              className={`nav-link ${page === item.label ? "nav-link-active" : ""}`}
              onClick={() => navigate(item.label)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.label === "Customers" && <span className="nav-count">{customers.length}</span>}
            </button>
          ))}
        </nav>

        <p className="nav-label tools-label">PREFERENCES</p>
        <button className={`nav-link ${page === "Settings" ? "nav-link-active" : ""}`} onClick={() => navigate("Settings")}>
          <span className="nav-icon">⚙</span><span>Settings</span>
        </button>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">✦</div>
            <h4>Unlock more insights</h4>
            <p>Explore advanced analytics and reporting features.</p>
            <button onClick={() => showNotice("Upgrade is a demo placeholder.")}>Explore plans →</button>
          </div>
          <div className="sidebar-user">
            <div className="user-avatar">AG</div>
            <div><strong>Alekhya Gorthi</strong><small>Administrator</small></div>
            <button aria-label="Open settings" onClick={() => navigate("Settings")}>•••</button>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open navigation">☰</button>
          <div className="breadcrumbs"><span>Workspace</span><span>/</span><strong>{page}</strong></div>
          <div className="topbar-right">
            <span className="live-indicator"><i /> Demo data</span>
            <button className="top-icon" aria-label="Notifications" onClick={() => showNotice("You are all caught up!")}>♧<i /></button>
            <span className="top-divider" />
            <div className="user-avatar">AG</div>
          </div>
        </header>

        <div className="content">
          {page === "Overview" && renderOverview()}
          {page === "Analytics" && renderAnalytics()}
          {page === "Customers" && (
            <>
              <PageTitle title="Customers" subtitle="Manage your customer relationships and account status." />
              <div className="stats-grid compact-stats">
                <StatCard icon="♙" label="Total Customers" value={customers.length} change="All records" tone="violet" />
                <StatCard icon="✓" label="Active" value={activeCustomers} change="Active accounts" tone="green" />
                <StatCard icon="◷" label="Trial" value={customers.filter((c) => c.status === "Trial").length} change="Trial accounts" tone="blue" />
                <StatCard icon="×" label="Cancelled" value={customers.filter((c) => c.status === "Cancelled").length} change="Cancelled accounts" tone="orange" />
              </div>
              {renderCustomerTable()}
            </>
          )}
          {page === "Subscriptions" && (
            <>
              <PageTitle title="Subscriptions" subtitle="Track subscription plans, billing, and account statuses." />
              <div className="stats-grid compact-stats">
                <StatCard icon="▤" label="All Subscriptions" value={subscriptions.length} change="All records" tone="violet" />
                <StatCard icon="✓" label="Active" value={activeSubscriptions} change="Active subscriptions" tone="green" />
                <StatCard icon="◷" label="Trial" value={subscriptions.filter((s) => s.status === "Trial").length} change="Trial subscriptions" tone="blue" />
                <StatCard icon="×" label="Cancelled" value={subscriptions.filter((s) => s.status === "Cancelled").length} change="Cancelled subscriptions" tone="orange" />
              </div>
              {renderSubscriptionTable()}
            </>
          )}
          {page === "Reports" && renderReports()}
          {page === "Settings" && renderSettings()}
        </div>

        <footer className="footer">
          <span>© 2026 MetricFlow Analytics</span>
          <span>Built for smarter business decisions</span>
        </footer>
      </main>

      {showAddCustomer && (
        <div className="modal-backdrop" onClick={() => setShowAddCustomer(false)}>
          <form className="modal" onSubmit={addCustomer} onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setShowAddCustomer(false)}>×</button>
            <p className="eyebrow">CUSTOMER MANAGEMENT</p>
            <h2>Add a Customer</h2>
            <p className="muted">Create a sample customer record in this dashboard.</p>
            <label>Full name<input name="name" required placeholder="e.g. Priya Sharma" /></label>
            <label>Email address<input name="email" type="email" required placeholder="e.g. priya@example.com" /></label>
            <label>Subscription plan
              <select name="plan" defaultValue="Starter">
                <option>Starter</option><option>Pro</option><option>Enterprise</option>
              </select>
            </label>
            <div className="modal-actions">
              <button type="button" className="secondary-button" onClick={() => setShowAddCustomer(false)}>Cancel</button>
              <button type="submit" className="primary-button">Add Customer</button>
            </div>
          </form>
        </div>
      )}

      {selectedCustomer && (
        <div className="modal-backdrop" onClick={() => setSelectedCustomer(null)}>
          <section className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCustomer(null)}>×</button>
            <div className="customer-avatar modal-avatar">{selectedCustomer.initials}</div>
            <h2>{selectedCustomer.name}</h2>
            <p className="muted">{selectedCustomer.email}</p>
            <div className="detail-row"><span>Plan</span><strong>{selectedCustomer.plan}</strong></div>
            <div className="detail-row"><span>Monthly plan price</span><strong>{formatMoney(selectedCustomer.amount)}</strong></div>
            <div className="detail-row"><span>Status</span><StatusBadge status={selectedCustomer.status} /></div>
            <button className="primary-button full-width" onClick={() => setSelectedCustomer(null)}>Close Details</button>
          </section>
        </div>
      )}

      {notice && <div className="toast" role="status">✓ {notice}</div>}
    </div>
  );
}

function StatCard({ icon, label, value, change, tone, down }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span className={`stat-icon ${tone}`}>{icon}</span>
        <span className={`change-tag ${down ? "change-down" : ""}`}>{down ? "↓" : "↗"} {change}</span>
      </div>
      <p>{label}</p>
      <h3>{value}</h3>
    </article>
  );
}

function StatusBadge({ status }) {
  return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
}

function PageTitle({ title, subtitle }) {
  return (
    <div className="page-title">
      <div><h1>{title}</h1><p>{subtitle}</p></div>
    </div>
  );
}

export default App;