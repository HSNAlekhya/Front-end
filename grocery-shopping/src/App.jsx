import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Fresh Apples",
    price: 120,
    category: "Fruits",
    unit: "1 kg",
    emoji: "🍎",
  },
  {
    id: 2,
    name: "Fresh Bananas",
    price: 60,
    category: "Fruits",
    unit: "1 dozen",
    emoji: "🍌",
  },
  {
    id: 3,
    name: "Fresh Oranges",
    price: 90,
    category: "Fruits",
    unit: "1 kg",
    emoji: "🍊",
  },
  {
    id: 4,
    name: "Tomatoes",
    price: 45,
    category: "Vegetables",
    unit: "1 kg",
    emoji: "🍅",
  },
  {
    id: 5,
    name: "Potatoes",
    price: 40,
    category: "Vegetables",
    unit: "1 kg",
    emoji: "🥔",
  },
  {
    id: 6,
    name: "Carrots",
    price: 55,
    category: "Vegetables",
    unit: "1 kg",
    emoji: "🥕",
  },
  {
    id: 7,
    name: "Fresh Milk",
    price: 32,
    category: "Dairy",
    unit: "500 ml",
    emoji: "🥛",
  },
  {
    id: 8,
    name: "Cheese",
    price: 150,
    category: "Dairy",
    unit: "200 g",
    emoji: "🧀",
  },
  {
    id: 9,
    name: "Fresh Bread",
    price: 45,
    category: "Bakery",
    unit: "1 pack",
    emoji: "🍞",
  },
  {
    id: 10,
    name: "Croissant",
    price: 80,
    category: "Bakery",
    unit: "2 pieces",
    emoji: "🥐",
  },
  {
    id: 11,
    name: "Basmati Rice",
    price: 180,
    category: "Staples",
    unit: "1 kg",
    emoji: "🍚",
  },
  {
    id: 12,
    name: "Wheat Flour",
    price: 65,
    category: "Staples",
    unit: "1 kg",
    emoji: "🌾",
  },
];

const categoryData = [
  {
    name: "All",
    icon: "🛒",
  },
  {
    name: "Fruits",
    icon: "🍎",
  },
  {
    name: "Vegetables",
    icon: "🥕",
  },
  {
    name: "Dairy",
    icon: "🥛",
  },
  {
    name: "Bakery",
    icon: "🍞",
  },
  {
    name: "Staples",
    icon: "🌾",
  },
];

function App() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== id
      )
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="grocery-app">

      {/* Navbar */}

      <nav className="navbar">

        <div className="logo">
          🥬 FreshBasket
        </div>

        <div className="delivery">
          📍 Deliver to your location
        </div>

        <button
          className="cart-button"
          onClick={() => setShowCart(true)}
        >
          🛒 Cart

          {cartCount > 0 && (
            <span className="cart-badge">
              {cartCount}
            </span>
          )}
        </button>

      </nav>

      {/* Hero */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            FRESH & HEALTHY
          </span>

          <h1>
            Fresh groceries,
            <br />
            delivered to you
          </h1>

          <p>
            Shop fresh fruits, vegetables,
            dairy and everyday essentials
            from the comfort of your home.
          </p>

          <button
            className="shop-now"
            onClick={() =>
              document
                .getElementById("products")
                .scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Shop Now →
          </button>

        </div>

        <div className="hero-emoji">
          🥦🍎🥕
        </div>

      </section>

      {/* Main */}

      <main className="main">

        {/* Categories */}

        <section className="category-section">

          <div className="section-title">

            <h2>Shop by Category</h2>

            <p>
              Find everything you need
            </p>

          </div>

          <div className="category-list">

            {categoryData.map((category) => (

              <button
                key={category.name}
                className={
                  selectedCategory ===
                  category.name
                    ? "category-card active"
                    : "category-card"
                }
                onClick={() =>
                  setSelectedCategory(
                    category.name
                  )
                }
              >

                <span>
                  {category.icon}
                </span>

                <strong>
                  {category.name}
                </strong>

              </button>

            ))}

          </div>

        </section>

        {/* Products */}

        <section
          className="products-section"
          id="products"
        >

          <div className="products-header">

            <div>
              <h2>
                {selectedCategory === "All"
                  ? "Popular Groceries"
                  : selectedCategory}
              </h2>

              <p>
                {filteredProducts.length} products
                available
              </p>
            </div>

            <input
              type="text"
              className="search"
              placeholder="🔎 Search groceries..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {filteredProducts.length === 0 ? (

            <div className="no-products">

              <div>🔎</div>

              <h3>
                No products found
              </h3>

              <p>
                Try searching for another
                grocery item.
              </p>

            </div>

          ) : (

            <div className="product-grid">

              {filteredProducts.map(
                (product) => (

                  <div
                    className="product-card"
                    key={product.id}
                  >

                    <div className="product-image">
                      {product.emoji}
                    </div>

                    <div className="product-info">

                      <span className="product-category">
                        {product.category}
                      </span>

                      <h3>
                        {product.name}
                      </h3>

                      <p className="unit">
                        {product.unit}
                      </p>

                      <div className="product-bottom">

                        <strong>
                          ₹
                          {product.price}
                        </strong>

                        <button
                          className="add-button"
                          onClick={() =>
                            addToCart(product)
                          }
                        >
                          + Add
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </main>

      {/* Cart */}

      {showCart && (

        <div
          className="cart-overlay"
          onClick={() => setShowCart(false)}
        >

          <aside
            className="cart-panel"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="cart-header">

              <div>
                <h2>Your Cart 🛒</h2>

                <p>
                  {cartCount}{" "}
                  {cartCount === 1
                    ? "item"
                    : "items"}
                </p>
              </div>

              <button
                className="close-button"
                onClick={() =>
                  setShowCart(false)
                }
              >
                ×
              </button>

            </div>

            {cart.length === 0 ? (

              <div className="empty-cart">

                <div>🛒</div>

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Add some fresh groceries
                  to get started.
                </p>

                <button
                  onClick={() =>
                    setShowCart(false)
                  }
                >
                  Continue Shopping
                </button>

              </div>

            ) : (

              <>

                <div className="cart-items">

                  {cart.map((item) => (

                    <div
                      className="cart-item"
                      key={item.id}
                    >

                      <div className="cart-item-image">
                        {item.emoji}
                      </div>

                      <div className="cart-item-details">

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          ₹{item.price}
                        </p>

                        <div className="quantity">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                          >
                            −
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                      </div>

                      <button
                        className="remove-button"
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }
                      >
                        🗑️
                      </button>

                    </div>

                  ))}

                </div>

                <div className="cart-summary">

                  <div className="summary-row">

                    <span>Subtotal</span>

                    <strong>
                      ₹{cartTotal}
                    </strong>

                  </div>

                  <div className="summary-row">

                    <span>Delivery</span>

                    <strong className="free">
                      FREE
                    </strong>

                  </div>

                  <hr />

                  <div className="total-row">

                    <span>Total</span>

                    <strong>
                      ₹{cartTotal}
                    </strong>

                  </div>

                  <button className="checkout">
                    Proceed to Checkout
                  </button>

                </div>

              </>

            )}

          </aside>

        </div>

      )}

      <footer>
        <p>
          🥬 FreshBasket · Built with React + Vite
        </p>
      </footer>

    </div>
  );
}

export default App;