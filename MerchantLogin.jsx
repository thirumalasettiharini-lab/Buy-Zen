import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MerchantLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    const merchantEmail = "merchant@buyzen.com";
    const merchantPassword = "merchant123";

    if (
      email.trim().toLowerCase() === merchantEmail &&
      password === merchantPassword
    ) {
      localStorage.setItem(
        "merchantLoggedIn",
        "true"
      );

      localStorage.setItem(
        "merchantEmail",
        merchantEmail
      );

      navigate("/merchant");
    } else {
      setError(
        "Invalid merchant email or password."
      );
    }
  };

  return (
    <section className="merchant-login-page">

      <div className="merchant-login-card">

        {/* ICON */}

        <div className="merchant-login-icon">
          🏪
        </div>

        {/* LABEL */}

        <span className="merchant-label">
          BUYZEN MERCHANT
        </span>

        {/* TITLE */}

        <h1>
          Merchant Login
        </h1>

        <p>
          Sign in to manage your BuyZen
          catalog, orders and customer demand.
        </p>

        {/* ERROR */}

        {error && (
          <div className="merchant-login-error">
            ⚠️ {error}
          </div>
        )}

        {/* FORM */}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="form-group">

            <label htmlFor="merchant-email">
              Email Address
            </label>

            <input
              id="merchant-email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="merchant@buyzen.com"
              autoComplete="username"
              required
            />

          </div>

          {/* PASSWORD */}

          <div className="form-group">

            <label htmlFor="merchant-password">
              Password
            </label>

            <input
              id="merchant-password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="merchant-login-button"
          >
            Sign In to Dashboard →
          </button>

        </form>

        {/* DEMO ACCOUNT */}

        <div className="merchant-demo">

          <strong>
            Demo Merchant Account
          </strong>

          <p>
            Email: merchant@buyzen.com
          </p>

          <p>
            Password: merchant123
          </p>

        </div>

        {/* BACK */}

        <button
          type="button"
          className="back-store"
          onClick={() => navigate("/")}
        >
          ← Back to BuyZen
        </button>

      </div>

    </section>
  );
}

export default MerchantLogin;