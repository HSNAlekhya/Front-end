import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Floral Print Dress",
    brand: "Trendify",
    price: 899,
    oldPrice: 1499,
    category: "Women",
    type: "Dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
  },
  {
    id: 2,
    name: "Slim Fit Casual Shirt",
    brand: "Urban Edge",
    price: 799,
    oldPrice: 1299,
    category: "Men",
    type: "Shirts",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
  },
  {
    id: 3,
    name: "Oversized Graphic T-Shirt",
    brand: "Street Mode",
    price: 599,
    oldPrice: 999,
    category: "Men",
    type: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  },
  {
    id: 4,
    name: "Elegant Women Kurti",
    brand: "Ethnic Aura",
    price: 999,
    oldPrice: 1699,
    category: "Women",
    type: "Ethnic",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600",
  },
  {
    id: 5,
    name: "Classic Denim Jacket",
    brand: "Urban Edge",
    price: 1299,
    oldPrice: 1999,
    category: "Men",
    type: "Jackets",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
  },
  {
    id: 6,
    name: "High Waist Jeans",
    brand: "Denim Culture",
    price: 1099,
    oldPrice: 1799,
    category: "Women",
    type: "Jeans",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600",
  },
  {
    id: 7,
    name: "Kids Casual Outfit",
    brand: "Tiny Trends",
    price: 699,
    oldPrice: 999,
    category: "Kids",
    type: "Kids Wear",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600",
  },
  {
    id: 8,
    name: "Running Sneakers",
    brand: "Step Up",
    price: 1499,
    oldPrice: 2499,
    category: "Accessories",
    type: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 9,
    name: "Leather Handbag",
    brand: "Luxe Carry",
    price: 1199,
    oldPrice: 1999,
    category: "Accessories",
    type: "Bags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
  },
  {
    id: 10,
    name: "Summer Mini Dress",
    brand: "Style Studio",
    price: 849,
    oldPrice: 1399,
    category: "Women",
    type: "Dresses",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600",
  },
  {
    id: 11,
    name: "Casual Polo T-Shirt",
    brand: "Classic Fit",
    price: 649,
    oldPrice: 999,
    category: "Men",
    type: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1625910513413-5fc45e3e1c1b?w=600",
  },
  {
    id: 12,
    name: "Statement Sunglasses",
    brand: "Vision Pro",
    price: 499,
    oldPrice: 899,
    category: "Accessories",
    type: "Accessories",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
  },
];

const categories = [
  "All",
  "Women",
  "Men",
  "Kids",
  "Accessories",
];

function App() {
  const [category, setCategory] = useState("All");

  const [search, setSearch] = useState("");

  const [wishlist, setWishlist] = useState([]);

  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      category === "All" ||
      product.category === category;

    const searchMatch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.brand
        .toLowerCase()
        .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const toggleWishlist = (id) => {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const addToCart = (product) => {
    setCart((previous) => {
      const existing = previous.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previous,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (id) => {
    setCart((previous) =>
      previous.map((item) =>
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
    setCart((previous) =>
      previous
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
    setCart((previous) =>
      previous.filter((item) => item.id !== id)
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
    <div className="fashion-app">

      {/* Top Offer Bar */}

      <div className="offer-bar">
        FREE SHIPPING ON ORDERS ABOVE ₹999
      </div>

      {/* Navbar */}

      <header className="navbar">

        <div className="logo">
          FASHION<span>HUB</span>
        </div>

        <nav className="nav-links">

          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={
                category === item
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              {item}
            </button>
          ))}

        </nav>

        <div className="nav-actions">

          <div className="search-box">
            🔍

            <input
              type="text"
              placeholder="Search fashion..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <button
            className="icon-button"
            onClick={() =>
              setWishlist([])
            }
          >
            ♡
            {wishlist.length > 0 && (
              <span className="number-badge">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            className="icon-button"
            onClick={() =>
              setShowCart(true)
            }
          >
            🛍️
            {cartCount > 0 && (
              <span className="number-badge">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </header>

      {/* Hero */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-small">
            NEW SEASON 2026
          </p>

          <h1>
            STYLE THAT
            <br />
            SPEAKS FOR YOU
          </h1>

          <p className="hero-description">
            Discover the latest fashion trends,
            timeless essentials and statement
            styles made for every occasion.
          </p>

          <button
            className="hero-button"
            onClick={() =>
              document
                .getElementById("products")
                .scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            SHOP NOW →
          </button>

        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000"
            alt="Fashion collection"
          />
        </div>

      </section>

      {/* Category Banner */}

      <section className="category-banner">

        <div>
          <p>EXPLORE THE COLLECTION</p>
          <h2>Fashion for every mood</h2>
        </div>

        <div className="category-buttons">

          {categories.slice(1).map(
            (item) => (
              <button
                key={item}
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>
            )
          )}

        </div>

      </section>

      {/* Products */}

      <main
        className="products-container"
        id="products"
      >

        <div className="products-heading">

          <div>
            <p className="small-heading">
              TRENDING NOW
            </p>

            <h2>
              {category === "All"
                ? "Latest Arrivals"
                : `${category} Collection`}
            </h2>

            <span>
              {filteredProducts.length} products
            </span>
          </div>

          <select>
            <option>Sort: Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>

        </div>

        <div className="product-grid">

          {filteredProducts.map((product) => (

            <article
              className="product-card"
              key={product.id}
            >

              <div
                className="product-image"
                onClick={() =>
                  setSelectedProduct(product)
                }
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <button
                  className={
                    wishlist.includes(product.id)
                      ? "wishlist liked"
                      : "wishlist"
                  }
                  onClick={(e) => {
                    e.stopPropagation();

                    toggleWishlist(
                      product.id
                    );
                  }}
                >
                  {wishlist.includes(
                    product.id
                  )
                    ? "♥"
                    : "♡"}
                </button>

                <span className="discount">
                  {Math.round(
                    ((product.oldPrice -
                      product.price) /
                      product.oldPrice) *
                      100
                  )}
                  % OFF
                </span>

              </div>

              <div className="product-details">

                <p className="brand">
                  {product.brand}
                </p>

                <h3>
                  {product.name}
                </h3>

                <p className="type">
                  {product.type}
                </p>

                <div className="price-row">

                  <strong>
                    ₹{product.price}
                  </strong>

                  <del>
                    ₹{product.oldPrice}
                  </del>

                </div>

                <button
                  className="bag-button"
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  ADD TO BAG
                </button>

              </div>

            </article>

          ))}

        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <div>🔍</div>
            <h3>No products found</h3>
            <p>
              Try a different search or category.
            </p>
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
              className="modal-close"
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

              <p className="brand">
                {selectedProduct.brand}
              </p>

              <h2>
                {selectedProduct.name}
              </h2>

              <p className="type">
                {selectedProduct.type}
              </p>

              <div className="modal-price">
                <strong>
                  ₹{selectedProduct.price}
                </strong>

                <del>
                  ₹{selectedProduct.oldPrice}
                </del>
              </div>

              <p className="description">
                Elevate your everyday wardrobe
                with this stylish and versatile
                fashion essential. Designed for
                comfort and modern style.
              </p>

              <div className="size-title">
                Select Size
              </div>

              <div className="sizes">
                <button>S</button>
                <button>M</button>
                <button>L</button>
                <button>XL</button>
              </div>

              <button
                className="modal-bag"
                onClick={() => {
                  addToCart(
                    selectedProduct
                  );

                  setSelectedProduct(null);

                  setShowCart(true);
                }}
              >
                ADD TO BAG
              </button>

            </div>

          </div>

        </div>

      )}

      {/* Cart */}

      {showCart && (

        <div
          className="cart-overlay"
          onClick={() =>
            setShowCart(false)
          }
        >

          <aside
            className="cart-panel"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="cart-header">

              <div>
                <h2>
                  SHOPPING BAG
                </h2>

                <p>
                  {cartCount} items
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

                <div>🛍️</div>

                <h3>
                  Your bag is empty
                </h3>

                <p>
                  Add something you love!
                </p>

                <button
                  onClick={() =>
                    setShowCart(false)
                  }
                >
                  CONTINUE SHOPPING
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

                        <p className="brand">
                          {item.brand}
                        </p>

                        <h3>
                          {item.name}
                        </h3>

                        <strong>
                          ₹{item.price}
                        </strong>

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
                        className="remove"
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }
                      >
                        🗑
                      </button>

                    </div>

                  ))}

                </div>

                <div className="cart-bottom">

                  <div className="total">

                    <span>
                      TOTAL
                    </span>

                    <strong>
                      ₹{cartTotal}
                    </strong>

                  </div>

                  <p className="shipping">
                    Free shipping on orders
                    above ₹999
                  </p>

                  <button className="checkout-button">
                    PROCEED TO CHECKOUT
                  </button>

                </div>

              </>

            )}

          </aside>

        </div>

      )}

      {/* Footer */}

      <footer>

        <div className="footer-logo">
          FASHION<span>HUB</span>
        </div>

        <p>
          Fashion that fits your lifestyle.
        </p>

        <div className="footer-links">
          <span>About Us</span>
          <span>Contact</span>
          <span>Shipping</span>
          <span>Returns</span>
        </div>

        <small>
          © 2026 FashionHub. Frontend project
          built with React + Vite.
        </small>

      </footer>

    </div>
  );
}

export default App;