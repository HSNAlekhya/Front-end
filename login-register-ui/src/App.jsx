import { useState } from "react";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      setMessage("Please fill in all fields.");
      return;
    }

    setMessage("Login successful! This is a frontend-only demo.");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (registerData.password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("Registration successful! This is a frontend-only demo.");
  };

  const switchForm = (login) => {
    setIsLogin(login);
    setMessage("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* Left Side */}

        <div className="auth-info">

          <div className="brand">
            <div className="brand-icon">🔐</div>
            <h1>SecureAuth</h1>
          </div>

          <h2>
            Welcome to your
            <span> secure space.</span>
          </h2>

          <p>
            Create an account or login to continue.
            This is a modern frontend authentication UI
            built with React and Vite.
          </p>

          <div className="features">

            <div className="feature">
              <span>✓</span>
              <p>Simple and secure interface</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Responsive design</p>
            </div>

            <div className="feature">
              <span>✓</span>
              <p>Built with React</p>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="auth-form-container">

          {/* Tabs */}

          <div className="tabs">

            <button
              className={isLogin ? "active" : ""}
              onClick={() => switchForm(true)}
            >
              Login
            </button>

            <button
              className={!isLogin ? "active" : ""}
              onClick={() => switchForm(false)}
            >
              Register
            </button>

          </div>

          {/* Heading */}

          <div className="form-heading">

            <h2>
              {isLogin
                ? "Welcome Back!"
                : "Create Account"}
            </h2>

            <p>
              {isLogin
                ? "Login to access your account"
                : "Fill in the details to create your account"}
            </p>

          </div>

          {/* Login Form */}

          {isLogin ? (

            <form onSubmit={handleLogin}>

              <div className="input-group">

                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                />

              </div>

              <div className="input-group">

                <label>Password</label>

                <div className="password-wrapper">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />

                  <button
                    type="button"
                    className="password-button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>

                </div>

              </div>

              <div className="form-options">

                <label className="remember">

                  <input type="checkbox" />

                  <span>Remember me</span>

                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    setMessage(
                      "Password reset is frontend-only in this demo."
                    )
                  }
                >
                  Forgot password?
                </button>

              </div>

              <button
                type="submit"
                className="submit-button"
              >
                Login
              </button>

            </form>

          ) : (

            /* Register Form */

            <form onSubmit={handleRegister}>

              <div className="input-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                />

              </div>

              <div className="input-group">

                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                />

              </div>

              <div className="input-group">

                <label>Password</label>

                <div className="password-wrapper">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Create a password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                  />

                  <button
                    type="button"
                    className="password-button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>

                </div>

              </div>

              <div className="input-group">

                <label>Confirm Password</label>

                <div className="password-wrapper">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                  />

                  <button
                    type="button"
                    className="password-button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword
                      ? "🙈"
                      : "👁️"}
                  </button>

                </div>

              </div>

              <label className="terms">

                <input type="checkbox" required />

                <span>
                  I agree to the Terms & Conditions
                </span>

              </label>

              <button
                type="submit"
                className="submit-button"
              >
                Create Account
              </button>

            </form>

          )}

          {/* Message */}

          {message && (
            <div className="message">
              {message}
            </div>
          )}

          {/* Bottom Switch */}

          <div className="switch-form">

            {isLogin ? (
              <>
                <span>
                  Don't have an account?
                </span>

                <button
                  onClick={() => switchForm(false)}
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <span>
                  Already have an account?
                </span>

                <button
                  onClick={() => switchForm(true)}
                >
                  Login
                </button>
              </>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;