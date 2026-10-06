import { useMemo, useState } from "react";
import "./App.css";

const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    sku: "WH-1001",
    category: "Electronics",
    supplier: "TechWorld",
    stock: 85,
    minStock: 20,
    price: 2499,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    sku: "MK-1002",
    category: "Electronics",
    supplier: "TechWorld",
    stock: 12,
    minStock: 20,
    price: 3499,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Office Chair",
    sku: "OC-1003",
    category: "Furniture",
    supplier: "ComfortZone",
    stock: 35,
    minStock: 10,
    price: 5999,
    status: "In Stock",
  },
  {
    id: 4,
    name: "Laptop Stand",
    sku: "LS-1004",
    category: "Accessories",
    supplier: "OfficeMart",
    stock: 8,
    minStock: 15,
    price: 1299,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "USB-C Cable",
    sku: "UC-1005",
    category: "Accessories",
    supplier: "TechWorld",
    stock: 0,
    minStock: 25,
    price: 599,
    status: "Out of Stock",
  },
  {
    id: 6,
    name: "Desk Lamp",
    sku: "DL-1006",
    category: "Furniture",
    supplier: "BrightHome",
    stock: 48,
    minStock: 15,
    price: 1899,
    status: "In Stock",
  },
  {
    id: 7,
    name: "Web Camera",
    sku: "WC-1007",
    category: "Electronics",
    supplier: "TechWorld",
    stock: 18,
    minStock: 15,
    price: 2799,
    status: "In Stock",
  },
  {
    id: 8,
    name: "Notebook Pack",
    sku: "NP-1008",
    category: "Stationery",
    supplier: "OfficeMart",
    stock: 6,
    minStock: 15,
    price: 399,
    status: "Low Stock",
  },
];

const suppliers = [
  {
    id: 1,
    name: "TechWorld",
    contact: "Raj Kumar",
    email: "raj@techworld.com",
    products: 38,
    status: "Active",
  },
  {
    id: 2,
    name: "ComfortZone",
    contact: "Priya Sharma",
    email: "priya@comfortzone.com",
    products: 21,
    status: "Active",
  },
  {
    id: 3,
    name: "OfficeMart",
    contact: "Arun Kumar",
    email: "arun@officemart.com",
    products: 17,
    status: "Active",
  },
  {
    id: 4,
    name: "BrightHome",
    contact: "Anjali Rao",
    email: "anjali@brighthome.com",
    products: 12,
    status: "Active",
  },
];

const categories = [
  "All",
  "Electronics",
  "Furniture",
  "Accessories",
  "Stationery",
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [notification, setNotification] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "Electronics",
    supplier: "TechWorld",
    stock: "",
    minStock: "",
    price: "",
  });

  const totalProducts = products.length;

  const totalUnits = products.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  const inventoryValue = products.reduce(
    (sum, product) => sum + product.stock * product.price,
    0
  );

  const lowStock = products.filter(
    (product) => product.stock > 0 && product.stock <= product.minStock
  ).length;

  const outOfStock = products.filter(
    (product) => product.stock === 0
  ).length;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase()) ||
        product.supplier.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 2500);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const stock = Number(newProduct.stock);
    const minStock = Number(newProduct.minStock);
    const price = Number(newProduct.price);

    const product = {
      id: Date.now(),
      name: newProduct.name,
      sku: newProduct.sku,
      category: newProduct.category,
      supplier: newProduct.supplier,
      stock,
      minStock,
      price,
      status:
        stock === 0
          ? "Out of Stock"
          : stock <= minStock
          ? "Low Stock"
          : "In Stock",
    };

    setProducts((current) => [...current, product]);

    setNewProduct({
      name: "",
      sku: "",
      category: "Electronics",
      supplier: "TechWorld",
      stock: "",
      minStock: "",
      price: "",
    });

    setShowAddProduct(false);
    showNotification("Product added successfully");
  };

  const updateStock = (id, amount) => {
    setProducts((current) =>
      current.map((product) => {
        if (product.id !== id) return product;

        const stock = Math.max(0, product.stock + amount);

        return {
          ...product,
          stock,
          status:
            stock === 0
              ? "Out of Stock"
              : stock <= product.minStock
              ? "Low Stock"
              : "In Stock",
        };
      })
    );

    showNotification(amount > 0 ? "Stock increased" : "Stock decreased");
  };

  const navItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Products", icon: "▤" },
    { name: "Stock", icon: "▣" },
    { name: "Suppliers", icon: "♟" },
    { name: "Reports", icon: "▥" },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "Products":
        return (
          <ProductsPage
            products={filteredProducts}
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            onAdd={() => setShowAddProduct(true)}
          />
        );

      case "Stock":
        return (
          <StockPage
            products={products}
            updateStock={updateStock}
          />
        );

      case "Suppliers":
        return <SuppliersPage />;

      case "Reports":
        return <ReportsPage products={products} />;

      default:
        return (
          <Dashboard
            products={products}
            totalProducts={totalProducts}
            totalUnits={totalUnits}
            inventoryValue={inventoryValue}
            lowStock={lowStock}
            outOfStock={outOfStock}
            updateStock={updateStock}
          />
        );
    }
  };

  return (
    <div className="app">
      {mobileMenu && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>
        <div className="logo">
          <div className="logo-icon">I</div>
          <div>
            <strong>Invento</strong>
            <span>Management</span>
          </div>
        </div>

        <nav>
          <p className="menu-title">MAIN MENU</p>

          {navItems.map((item) => (
            <button
              key={item.name}
              className={
                activePage === item.name ? "nav-item active" : "nav-item"
              }
              onClick={() => {
                setActivePage(item.name);
                setMobileMenu(false);
              }}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}

          <p className="menu-title">ACCOUNT</p>

          <button
            className={
              activePage === "Settings" ? "nav-item active" : "nav-item"
            }
            onClick={() => {
              setActivePage("Settings");
              setMobileMenu(false);
            }}
          >
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="user-box">
            <div className="avatar">AG</div>
            <div>
              <strong>Alekhya Gorthi</strong>
              <small>Administrator</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(true)}
          >
            ☰
          </button>

          <div>
            <h1>{activePage}</h1>
            <p>Manage your inventory efficiently</p>
          </div>

          <div className="topbar-actions">
            <button
              className="notification-button"
              onClick={() => showNotification("No new notifications")}
            >
              🔔
              {lowStock > 0 && <span>{lowStock}</span>}
            </button>

            <button
              className="add-button"
              onClick={() => setShowAddProduct(true)}
            >
              + Add Product
            </button>
          </div>
        </header>

        <section className="content">
          {renderPage()}
        </section>
      </main>

      {showAddProduct && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h2>Add New Product</h2>
                <p>Enter product information</p>
              </div>

              <button
                className="close-button"
                onClick={() => setShowAddProduct(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddProduct}>
              <div className="form-grid">
                <label>
                  Product Name
                  <input
                    required
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter product name"
                  />
                </label>

                <label>
                  SKU
                  <input
                    required
                    value={newProduct.sku}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        sku: e.target.value,
                      })
                    }
                    placeholder="SKU-1009"
                  />
                </label>

                <label>
                  Category
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        category: e.target.value,
                      })
                    }
                  >
                    {categories.slice(1).map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Supplier
                  <select
                    value={newProduct.supplier}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        supplier: e.target.value,
                      })
                    }
                  >
                    {suppliers.map((supplier) => (
                      <option key={supplier.id}>{supplier.name}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Current Stock
                  <input
                    required
                    type="number"
                    min="0"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        stock: e.target.value,
                      })
                    }
                    placeholder="0"
                  />
                </label>

                <label>
                  Minimum Stock
                  <input
                    required
                    type="number"
                    min="0"
                    value={newProduct.minStock}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        minStock: e.target.value,
                      })
                    }
                    placeholder="10"
                  />
                </label>

                <label className="full-field">
                  Price
                  <input
                    required
                    type="number"
                    min="0"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: e.target.value,
                      })
                    }
                    placeholder="999"
                  />
                </label>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowAddProduct(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-button">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {notification && (
        <div className="toast">
          ✓ {notification}
        </div>
      )}
    </div>
  );
}

function Dashboard({
  products,
  totalProducts,
  totalUnits,
  inventoryValue,
  lowStock,
  outOfStock,
  updateStock,
}) {
  const recentProducts = products.slice(-5).reverse();

  return (
    <div>
      <div className="stats-grid">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon="▤"
          text="+8.2% this month"
        />

        <StatCard
          title="Total Stock Units"
          value={totalUnits.toLocaleString()}
          icon="▣"
          text="+12.5% this month"
        />

        <StatCard
          title="Inventory Value"
          value={`₹${inventoryValue.toLocaleString()}`}
          icon="₹"
          text="+6.4% this month"
        />

        <StatCard
          title="Low Stock"
          value={lowStock}
          icon="!"
          text={`${outOfStock} out of stock`}
          warning
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel inventory-chart">
          <div className="panel-header">
            <div>
              <h2>Inventory Overview</h2>
              <p>Stock levels by category</p>
            </div>

            <select>
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>

          <div className="chart">
            <div className="chart-y">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="bars">
              <ChartBar height="85%" label="Electronics" />
              <ChartBar height="60%" label="Furniture" />
              <ChartBar height="48%" label="Accessories" />
              <ChartBar height="35%" label="Stationery" />
              <ChartBar height="72%" label="Others" />
            </div>
          </div>
        </section>

        <section className="panel stock-alert">
          <div className="panel-header">
            <div>
              <h2>Stock Alerts</h2>
              <p>Products requiring attention</p>
            </div>
          </div>

          <div className="alert-list">
            {products
              .filter((product) => product.stock <= product.minStock)
              .map((product) => (
                <div className="alert-item" key={product.id}>
                  <div className="alert-icon">
                    {product.stock === 0 ? "!" : "⚠"}
                  </div>

                  <div className="alert-info">
                    <strong>{product.name}</strong>
                    <span>
                      {product.stock === 0
                        ? "Out of stock"
                        : `${product.stock} units remaining`}
                    </span>
                  </div>

                  <button
                    onClick={() => updateStock(product.id, 10)}
                    className="restock-button"
                  >
                    Restock
                  </button>
                </div>
              ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Recent Products</h2>
            <p>Recently added inventory items</p>
          </div>

          <button className="text-button">View All →</button>
        </div>

        <ProductTable products={recentProducts} compact />
      </section>
    </div>
  );
}

function StatCard({ title, value, icon, text, warning }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${warning ? "warning" : ""}`}>{icon}</div>

      <div>
        <p>{title}</p>
        <h2>{value}</h2>
        <small className={warning ? "warning-text" : ""}>{text}</small>
      </div>
    </div>
  );
}

function ChartBar({ height, label }) {
  return (
    <div className="bar-wrapper">
      <div className="bar" style={{ height }} />
      <span>{label}</span>
    </div>
  );
}

function ProductsPage({
  products,
  search,
  setSearch,
  category,
  setCategory,
  onAdd,
}) {
  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Products</h2>
          <p>Manage all products in your inventory</p>
        </div>

        <button className="primary-button" onClick={onAdd}>
          + Add Product
        </button>
      </div>

      <section className="panel">
        <div className="filters">
          <div className="search-box">
            <span>⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, SKU or supplier..."
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

        <ProductTable products={products} />
      </section>
    </div>
  );
}

function ProductTable({ products, compact = false }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Stock</th>
            {!compact && <th>Price</th>}
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <strong>{product.name}</strong>
              </td>

              <td>{product.sku}</td>

              <td>{product.category}</td>

              <td>{product.supplier}</td>

              <td>
                <strong>{product.stock}</strong>
              </td>

              {!compact && (
                <td>₹{product.price.toLocaleString()}</td>
              )}

              <td>
                <span
                  className={`status ${
                    product.status === "In Stock"
                      ? "success"
                      : product.status === "Low Stock"
                      ? "warning"
                      : "danger"
                  }`}
                >
                  {product.status}
                </span>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td colSpan="7" className="empty">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function StockPage({ products, updateStock }) {
  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Stock Management</h2>
          <p>Monitor and update inventory quantities</p>
        </div>
      </div>

      <section className="panel">
        <div className="stock-grid">
          {products.map((product) => (
            <div className="stock-card" key={product.id}>
              <div className="stock-card-top">
                <div>
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <small>{product.sku}</small>
                </div>

                <span
                  className={`status ${
                    product.status === "In Stock"
                      ? "success"
                      : product.status === "Low Stock"
                      ? "warning"
                      : "danger"
                  }`}
                >
                  {product.status}
                </span>
              </div>

              <div className="stock-number">
                {product.stock}
                <span>units</span>
              </div>

              <div className="stock-progress">
                <div
                  style={{
                    width: `${Math.min(
                      100,
                      (product.stock / Math.max(product.minStock * 3, 1)) *
                        100
                    )}%`,
                  }}
                />
              </div>

              <div className="stock-actions">
                <button onClick={() => updateStock(product.id, -1)}>
                  −
                </button>

                <button onClick={() => updateStock(product.id, 1)}>
                  +
                </button>

                <button
                  className="restock-wide"
                  onClick={() => updateStock(product.id, 10)}
                >
                  +10 Restock
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SuppliersPage() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Suppliers</h2>
          <p>Manage your inventory suppliers</p>
        </div>

        <button className="primary-button">+ Add Supplier</button>
      </div>

      <section className="supplier-grid">
        {suppliers.map((supplier) => (
          <div className="supplier-card" key={supplier.id}>
            <div className="supplier-avatar">
              {supplier.name.charAt(0)}
            </div>

            <div className="supplier-info">
              <h3>{supplier.name}</h3>
              <span className="status success">{supplier.status}</span>
            </div>

            <div className="supplier-details">
              <p>
                <strong>Contact:</strong> {supplier.contact}
              </p>

              <p>
                <strong>Email:</strong> {supplier.email}
              </p>

              <p>
                <strong>Products:</strong> {supplier.products}
              </p>
            </div>

            <button className="outline-button">View Supplier</button>
          </div>
        ))}
      </section>
    </div>
  );
}

function ReportsPage({ products }) {
  const categoryData = products.reduce((acc, product) => {
    acc[product.category] =
      (acc[product.category] || 0) + product.stock * product.price;

    return acc;
  }, {});

  return (
    <div>
      <div className="page-heading">
        <div>
          <h2>Inventory Reports</h2>
          <p>Review inventory performance and valuation</p>
        </div>

        <button className="primary-button">↓ Export Report</button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Inventory Items"
          value={products.length}
          icon="▤"
          text="Active products"
        />

        <StatCard
          title="Stock Units"
          value={products
            .reduce((sum, product) => sum + product.stock, 0)
            .toLocaleString()}
          icon="▣"
          text="Current inventory"
        />

        <StatCard
          title="Stock Value"
          value={`₹${products
            .reduce(
              (sum, product) => sum + product.stock * product.price,
              0
            )
            .toLocaleString()}`}
          icon="₹"
          text="Current valuation"
        />

        <StatCard
          title="Categories"
          value={Object.keys(categoryData).length}
          icon="◈"
          text="Product categories"
        />
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Inventory Value by Category</h2>
            <p>Current estimated stock value</p>
          </div>
        </div>

        <div className="report-bars">
          {Object.entries(categoryData).map(([category, value]) => {
            const max = Math.max(...Object.values(categoryData));

            return (
              <div className="report-row" key={category}>
                <div className="report-label">
                  <strong>{category}</strong>
                  <span>₹{value.toLocaleString()}</span>
                </div>

                <div className="report-track">
                  <div
                    style={{
                      width: `${(value / max) * 100}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;