import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const userData = response.data; // { userId, name, email, role, token }

      dispatch(loginSuccess(userData));

      const normalizedRole = (userData.role || "").toLowerCase();

      if (normalizedRole === "student") {
        navigate("/student-dashboard");
      } else if (normalizedRole === "institute") {
        navigate("/institute-dashboard");
      } else if (normalizedRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);
      const serverError = error.response?.data;
      if (typeof serverError === "string") {
        setErrorMessage(serverError);
      } else if (serverError?.message) {
        setErrorMessage(serverError.message);
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(31,41,55,0.75), rgba(31,41,55,0.75)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071') center/cover",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "420px",
          borderRadius: "18px",
          backgroundColor: "rgba(255,255,255,0.96)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2" style={{ color: "#1f2937" }}>
            EduHub
          </h2>
          <p className="mb-0" style={{ color: "#6b7280" }}>
            Multi Institute Course Platform
          </p>
        </div>

        <h4 className="text-center mb-4" style={{ color: "#1f2937" }}>
          Login
        </h4>

        {errorMessage && (
          <div className="alert alert-danger text-center py-2 mb-3">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#374151" }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ color: "#374151" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-100 mb-3"
            style={{
              backgroundColor: "#d89b2b",
              color: "white",
              border: "none",
              padding: "10px",
              fontWeight: "600",
              borderRadius: "10px",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-2">
          <span style={{ color: "#6b7280", fontSize: "14px" }}>
            Don't have an account?{" "}
          </span>
          <Link to="/register" style={{ color: "#d89b2b", textDecoration: "none", fontWeight: "600", fontSize: "14px" }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;