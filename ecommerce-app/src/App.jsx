import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 799,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    description:
      "Comfortable and stylish cotton T-shirt perfect for everyday wear.",
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 1499,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
    description:
      "Classic denim jacket with a modern fit for casual occasions.",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 2299,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    description:
      "Lightweight running shoes designed for comfort and performance.",
  },
  {
    id: 4,
    name: "Leather Handbag",
    price: 1899,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
    description:
      "Elegant handbag with a spacious interior and premium finish.",
  },
  {
    id: 5,
    name: "Smart Watch",
    price: 3499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    description:
      "Modern smartwatch with a stylish design for your everyday activities.",
  },
  {
    id: 6,
    name: "Wireless Headphones",
    price: 2799,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    description:
      "Wireless headphones offering clear sound and comfortable listening.",
  },
  {
    id: 7,
    name: "Casual Sneakers",
    price: 1799,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
    description:
      "Versatile sneakers suitable for casual everyday outfits.",
  },
  {
    id: 8,
    name: "Sunglasses",
    price: 999,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    description:
      "Stylish sunglasses with a classic frame and comfortable fit.",
  },
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
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

    setSelectedProduct(null);
  };

  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
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
      previousCart.filter((item) => item.id !== id)
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
    <div className="shop">

      {/* Navigation */}

      <nav className="navbar">

        <div className="logo">
          🛍️ ShopEase
        </div>

        <div className="nav-actions">

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

        </div>

      </nav>

      {/* Hero */}

      <section className="hero">

        <div>
          <p className="hero-small">
            WELCOME TO SHOPEASE
          </p>

          <h1>
            Shop your favorite
            <br />
            products
          </h1>

          <p>
            Discover quality products at
            affordable prices.
          </p>
        </div>

      </section>

      {/* Main */}

      <main className="main">

        <div className="shop-header">

          <div>
            <h2>Our Products</h2>
            <p>
              Find something you love
            </p>
          </div>

          <input
            className="search"
            type="text"
            placeholder="🔎 Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Categories */}

        <div className="categories">

          {categories.map((item) => (

            <button
              key={item}
              className={
                category === item
                  ? "category active"
                  : "category"
              }
              onClick={() =>
                setCategory(item)
              }
            >
              {item}
            </button>

          ))}

        </div>

        {/* Products */}

        {filteredProducts.length === 0 ? (

          <div className="no-products">
            <div>🔎</div>
            <h3>No products found</h3>
            <p>
              Try another search or category.
            </p>
          </div>

        ) : (

          <div className="product-grid">

            {filteredProducts.map((product) => (

              <div
                className="product-card"
                key={product.id}
              >

                <div className="product-image">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                </div>

                <div className="product-info">

                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  <div className="product-bottom">

                    <strong>
                      ₹{product.price.toLocaleString("en-IN")}
                    </strong>

                    <button
                      className="view-button"
                      onClick={() =>
                        setSelectedProduct(product)
                      }
                    >
                      View
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

      {/* Product Details Modal */}

      {selectedProduct && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedProduct(null)
          }
        >

          <div
            className="product-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-button"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ×
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <div className="modal-info">

              <span className="product-category">
                {selectedProduct.category}
              </span>

              <h2>
                {selectedProduct.name}
              </h2>

              <p className="modal-description">
                {selectedProduct.description}
              </p>

              <h3 className="modal-price">
                ₹
                {selectedProduct.price.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <button
                className="add-cart-button"
                onClick={() =>
                  addToCart(selectedProduct)
                }
              >
                🛒 Add to Cart
              </button>

            </div>

          </div>

        </div>

      )}

      {/* Cart */}

      {showCart && (

        <div
          className="cart-overlay"
          onClick={() => setShowCart(false)}
        >

          <div
            className="cart-panel"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="cart-header">

              <div>
                <h2>Your Cart</h2>
                <p>
                  {cartCount}{" "}
                  {cartCount === 1
                    ? "item"
                    : "items"}
                </p>
              </div>

              <button
                className="close-cart"
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
                  Add some products to
                  your cart.
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

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cart-item-info">

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          ₹
                          {item.price.toLocaleString(
                            "en-IN"
                          )}
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
                          removeFromCart(item.id)
                        }
                      >
                        🗑️
                      </button>

                    </div>

                  ))}

                </div>

                <div className="cart-summary">

                  <div>
                    <span>Subtotal</span>

                    <strong>
                      ₹
                      {cartTotal.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>Delivery</span>

                    <strong>Free</strong>
                  </div>

                  <hr />

                  <div className="cart-total">

                    <span>Total</span>

                    <strong>
                      ₹
                      {cartTotal.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>

                  <button className="checkout-button">
                    Proceed to Checkout
                  </button>

                </div>

              </>

            )}

          </div>

        </div>

      )}

      <footer>
        Built with React and Vite
      </footer>

    </div>
  );
}

export default App;