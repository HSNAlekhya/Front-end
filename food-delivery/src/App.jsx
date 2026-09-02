import { useState } from "react";
import "./App.css";

const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    cuisine: "Indian, Biryani, North Indian",
    rating: 4.6,
    time: "30-35 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700",
    offer: "20% OFF",
  },
  {
    id: 2,
    name: "Pizza Corner",
    cuisine: "Pizza, Italian, Fast Food",
    rating: 4.5,
    time: "25-30 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700",
    offer: "30% OFF",
  },
  {
    id: 3,
    name: "Burger House",
    cuisine: "Burgers, Fast Food, Beverages",
    rating: 4.4,
    time: "20-25 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700",
    offer: "15% OFF",
  },
  {
    id: 4,
    name: "Green Bowl",
    cuisine: "Healthy Food, Salads, Vegan",
    rating: 4.7,
    time: "25-30 min",
    price: "₹₹₹",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700",
    offer: "10% OFF",
  },
  {
    id: 5,
    name: "Wok Express",
    cuisine: "Chinese, Asian, Noodles",
    rating: 4.3,
    time: "30-35 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=700",
    offer: "25% OFF",
  },
  {
    id: 6,
    name: "Sweet Treats",
    cuisine: "Desserts, Cakes, Ice Cream",
    rating: 4.8,
    time: "20-25 min",
    price: "₹₹",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=700",
    offer: "20% OFF",
  },
];

const menus = {
  1: [
    {
      id: 101,
      name: "Chicken Biryani",
      description: "Fragrant basmati rice with spiced chicken and herbs.",
      price: 249,
      category: "Biryani",
      image:
        "https://images.unsplash.com/photo-1563379091339-03246963d29a?w=500",
    },
    {
      id: 102,
      name: "Paneer Butter Masala",
      description: "Soft paneer cooked in a rich creamy tomato gravy.",
      price: 219,
      category: "Main Course",
      image:
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
    },
    {
      id: 103,
      name: "Butter Naan",
      description: "Soft Indian bread topped with butter.",
      price: 49,
      category: "Breads",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    },
    {
      id: 104,
      name: "Veg Biryani",
      description: "Aromatic basmati rice cooked with fresh vegetables.",
      price: 179,
      category: "Biryani",
      image:
        "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=500",
    },
  ],

  2: [
    {
      id: 201,
      name: "Margherita Pizza",
      description: "Classic pizza with tomato, mozzarella and basil.",
      price: 299,
      category: "Pizza",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
    },
    {
      id: 202,
      name: "Farmhouse Pizza",
      description: "Loaded with fresh vegetables and mozzarella.",
      price: 399,
      category: "Pizza",
      image:
        "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?w=500",
    },
    {
      id: 203,
      name: "Garlic Bread",
      description: "Crispy garlic bread with herbs and butter.",
      price: 149,
      category: "Sides",
      image:
        "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500",
    },
    {
      id: 204,
      name: "Cheese Burst Pizza",
      description: "Extra cheesy pizza with a delicious cheese crust.",
      price: 449,
      category: "Pizza",
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500",
    },
  ],

  3: [
    {
      id: 301,
      name: "Classic Chicken Burger",
      description: "Crispy chicken patty with fresh lettuce and sauce.",
      price: 199,
      category: "Burgers",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    },
    {
      id: 302,
      name: "Veg Cheese Burger",
      description: "Crispy veggie patty with cheese and fresh vegetables.",
      price: 169,
      category: "Burgers",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
    },
    {
      id: 303,
      name: "French Fries",
      description: "Golden crispy fries served with ketchup.",
      price: 99,
      category: "Sides",
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
    },
    {
      id: 304,
      name: "Chocolate Shake",
      description: "Creamy chocolate milkshake.",
      price: 149,
      category: "Beverages",
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500",
    },
  ],

  4: [
    {
      id: 401,
      name: "Healthy Buddha Bowl",
      description: "Fresh vegetables, grains and delicious dressing.",
      price: 249,
      category: "Bowls",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
    },
    {
      id: 402,
      name: "Avocado Salad",
      description: "Fresh avocado with greens and vegetables.",
      price: 229,
      category: "Salads",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
    },
    {
      id: 403,
      name: "Fruit Bowl",
      description: "Fresh seasonal fruits.",
      price: 159,
      category: "Healthy",
      image:
        "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500",
    },
    {
      id: 404,
      name: "Green Smoothie",
      description: "Fresh spinach, fruits and natural ingredients.",
      price: 179,
      category: "Beverages",
      image:
        "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500",
    },
  ],

  5: [
    {
      id: 501,
      name: "Hakka Noodles",
      description: "Stir-fried noodles with vegetables and sauces.",
      price: 189,
      category: "Noodles",
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500",
    },
    {
      id: 502,
      name: "Veg Manchurian",
      description: "Crispy vegetable balls in spicy Manchurian sauce.",
      price: 199,
      category: "Starters",
      image:
        "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=500",
    },
    {
      id: 503,
      name: "Spring Rolls",
      description: "Crispy rolls filled with fresh vegetables.",
      price: 149,
      category: "Starters",
      image:
        "https://images.unsplash.com/photo-1548507200-1c0e8c3a9a1c?w=500",
    },
    {
      id: 504,
      name: "Fried Rice",
      description: "Aromatic fried rice with vegetables and sauces.",
      price: 179,
      category: "Rice",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500",
    },
  ],

  6: [
    {
      id: 601,
      name: "Chocolate Cake",
      description: "Rich and moist chocolate cake.",
      price: 199,
      category: "Cakes",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    },
    {
      id: 602,
      name: "Strawberry Cake",
      description: "Soft vanilla cake with fresh strawberries.",
      price: 249,
      category: "Cakes",
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500",
    },
    {
      id: 603,
      name: "Chocolate Ice Cream",
      description: "Creamy chocolate ice cream.",
      price: 129,
      category: "Ice Cream",
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
    },
    {
      id: 604,
      name: "Donuts",
      description: "Soft glazed donuts with chocolate topping.",
      price: 149,
      category: "Desserts",
      image:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500",
    },
  ],
};

const foodCategories = [
  "All",
  "Pizza",
  "Burgers",
  "Biryani",
  "Chinese",
  "Healthy",
  "Desserts",
];

function App() {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState(null);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const [showRestaurants, setShowRestaurants] =
    useState(true);

  const currentMenu = selectedRestaurant
    ? menus[selectedRestaurant.id] || []
    : [];

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      restaurant.cuisine
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const filteredMenu = currentMenu.filter((item) => {
    if (category === "All") return true;

    return (
      item.category === category ||
      item.name
        .toLowerCase()
        .includes(category.toLowerCase())
    );
  });

  const addToCart = (item, restaurant) => {
    setCart((previous) => {
      const existing = previous.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existing) {
        return previous.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...previous,
        {
          ...item,
          restaurantName: restaurant.name,
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

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal >= 499 || subtotal === 0
    ? 0
    : 40;

  const total = subtotal + deliveryFee;

  const openRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCategory("All");
    setShowRestaurants(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goHome = () => {
    setSelectedRestaurant(null);
    setShowRestaurants(true);
    setCategory("All");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="food-app">

      {/* Header */}

      <header className="header">

        <div
          className="logo"
          onClick={goHome}
        >
          FOOD<span>EXPRESS</span>
        </div>

        <div className="location">
          📍
          <div>
            <small>DELIVER TO</small>
            <strong>Hyderabad, India</strong>
          </div>
        </div>

        <div className="search">

          🔍

          <input
            type="text"
            placeholder="Search restaurants or dishes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <button className="login-button">
          Login
        </button>

        <button
          className="cart-button"
          onClick={() =>
            setShowCart(true)
          }
        >
          🛒

          {cartCount > 0 && (
            <span>
              {cartCount}
            </span>
          )}
        </button>

      </header>

      {/* Hero */}

      {!selectedRestaurant && (

        <section className="hero">

          <div className="hero-text">

            <p>CRAVINGS? WE'VE GOT YOU.</p>

            <h1>
              Delicious food,
              <br />
              delivered fast.
            </h1>

            <span>
              Order from your favourite restaurants
              and enjoy delicious meals at your doorstep.
            </span>

            <button
              onClick={() =>
                document
                  .getElementById("restaurants")
                  .scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              ORDER NOW →
            </button>

          </div>

          <div className="hero-food">

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000"
              alt="Food"
            />

          </div>

        </section>

      )}

      {/* Main */}

      <main>

        {!selectedRestaurant ? (

          <section
            className="restaurant-section"
            id="restaurants"
          >

            <div className="section-heading">

              <div>
                <small>
                  DISCOVER GREAT FOOD
                </small>

                <h2>
                  Restaurants near you
                </h2>
              </div>

              <span>
                {filteredRestaurants.length} restaurants
              </span>

            </div>

            {/* Categories */}

            <div className="food-categories">

              {foodCategories.map(
                (item) => (

                  <button
                    key={item}
                    onClick={() =>
                      setCategory(item)
                    }
                    className={
                      category === item
                        ? "category active"
                        : "category"
                    }
                  >
                    {item}
                  </button>

                )
              )}

            </div>

            {/* Restaurants */}

            <div className="restaurant-grid">

              {filteredRestaurants.map(
                (restaurant) => (

                  <article
                    className="restaurant-card"
                    key={restaurant.id}
                    onClick={() =>
                      openRestaurant(
                        restaurant
                      )
                    }
                  >

                    <div className="restaurant-image">

                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                      />

                      <span className="offer">
                        {restaurant.offer}
                      </span>

                    </div>

                    <div className="restaurant-info">

                      <h3>
                        {restaurant.name}
                      </h3>

                      <p>
                        {restaurant.cuisine}
                      </p>

                      <div className="restaurant-meta">

                        <span className="rating">
                          ★ {restaurant.rating}
                        </span>

                        <span>
                          •
                        </span>

                        <span>
                          {restaurant.time}
                        </span>

                        <span>
                          •
                        </span>

                        <span>
                          {restaurant.price}
                        </span>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

          </section>

        ) : (

          /* Restaurant Menu */

          <section className="menu-section">

            <button
              className="back-button"
              onClick={goHome}
            >
              ← Back to restaurants
            </button>

            <div className="restaurant-header">

              <img
                src={
                  selectedRestaurant.image
                }
                alt={
                  selectedRestaurant.name
                }
              />

              <div>

                <h1>
                  {selectedRestaurant.name}
                </h1>

                <p>
                  {selectedRestaurant.cuisine}
                </p>

                <div className="menu-meta">

                  <span className="rating">
                    ★ {selectedRestaurant.rating}
                  </span>

                  <span>
                    {selectedRestaurant.time}
                  </span>

                  <span>
                    {selectedRestaurant.price}
                  </span>

                </div>

              </div>

            </div>

            {/* Menu Categories */}

            <div className="food-categories menu-categories">

              {[
                "All",
                ...new Set(
                  currentMenu.map(
                    (item) =>
                      item.category
                  )
                ),
              ].map((item) => (

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

            <h2 className="menu-title">
              Recommended
            </h2>

            <div className="menu-grid">

              {filteredMenu.map((item) => (

                <article
                  className="menu-card"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="menu-info">

                    <small>
                      {item.category}
                    </small>

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                    <div className="menu-bottom">

                      <strong>
                        ₹{item.price}
                      </strong>

                      <button
                        onClick={() =>
                          addToCart(
                            item,
                            selectedRestaurant
                          )
                        }
                      >
                        ADD +
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          </section>

        )}

      </main>

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
                  YOUR CART
                </h2>

                <small>
                  {cartCount} items
                </small>
              </div>

              <button
                onClick={() =>
                  setShowCart(false)
                }
              >
                ×
              </button>

            </div>

            {cart.length === 0 ? (

              <div className="empty-cart">

                <div>
                  🛒
                </div>

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Add delicious food to get started.
                </p>

                <button
                  onClick={() =>
                    setShowCart(false)
                  }
                >
                  EXPLORE FOOD
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

                      <div className="cart-item-details">

                        <small>
                          {item.restaurantName}
                        </small>

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
                        className="delete"
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

                <div className="bill">

                  <div>
                    <span>
                      Subtotal
                    </span>

                    <span>
                      ₹{subtotal}
                    </span>
                  </div>

                  <div>
                    <span>
                      Delivery fee
                    </span>

                    <span>
                      {deliveryFee === 0
                        ? "FREE"
                        : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <hr />

                  <div className="grand-total">

                    <strong>
                      Total
                    </strong>

                    <strong>
                      ₹{total}
                    </strong>

                  </div>

                  <button className="checkout">
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
          FOOD<span>EXPRESS</span>
        </div>

        <p>
          Delicious food delivered to your doorstep.
        </p>

        <div className="footer-links">
          <span>About</span>
          <span>Help</span>
          <span>Terms</span>
          <span>Privacy</span>
        </div>

        <small>
          © 2026 FoodExpress — React + Vite frontend project
        </small>

      </footer>

    </div>
  );
}

export default App;