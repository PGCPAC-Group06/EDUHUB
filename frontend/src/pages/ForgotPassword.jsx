import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend API yaha connect hogi
    alert("Reset password link sent successfully!");
  };

  return (
    <div className="forgot-page">

      <div className="forgot-box">

        <div className="logo">
          <div className="logo-icon">E</div>
          <h2>EduHub</h2>
        </div>

        <h1>Forgot Password?</h1>

        <p>
          Enter your registered email address and we'll send you a password
          reset link.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="reset-btn">
            Send Reset Link
          </button>

        </form>

        <Link to="/login" className="back-login">
          ← Back to Login
        </Link>

      </div>

    </div>
  );
}

export default ForgotPassword;