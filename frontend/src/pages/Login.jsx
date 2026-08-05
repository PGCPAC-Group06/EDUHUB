import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      const userData = response.data;

      // Extract exact role returned from MySQL database via backend API
      let rawRole = userData.user?.role || userData.role || "";
      let finalRole = String(rawRole).toLowerCase().replace(/^role_/, "").trim();

      const formattedUserData = {
        user: {
          user_id: userData.user?.userId || userData.userId || userData.user_id,
          name: userData.user?.name || userData.name,
          email: userData.user?.email || userData.email,
          role: finalRole,
        },
<<<<<<< HEAD
=======
        token: userData.token,
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
      };

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(formattedUserData));
      } else {
        sessionStorage.setItem("user", JSON.stringify(formattedUserData));
      }

      dispatch(loginSuccess(formattedUserData));

      // Navigate dynamically based on role from database
      if (finalRole === "institute") {
        navigate("/institute-dashboard");
      } else if (finalRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      const msg =
        error.response?.data?.message ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : "Login failed. Please check your email and password.");
      setErrorMessage(msg);
    }
  };

  return (
    <div className="login-page">
      {/* LEFT */}

      <div className="login-left">
        <div className="login-box">
          <div className="logo">
            <div className="logo-icon">E</div>
            <h2>EduHub</h2>
          </div>

          <h1>Welcome back</h1>

          <p className="subtitle">
            Log in to continue your learning journey.
          </p>

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email address</label>

              <input
                type="email"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <span
                  className="eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>

              <Link to="/forgot-password" className="forgot">
                Forgot password?
              </Link>
            </div>

            <button className="login-btn" type="submit">
              Log In
            </button>
          </form>

          <div className="signup">
            Don't have an account?
            <Link to="/register">Sign up free</Link>
          </div>
        </div>
      </div>

      {/* RIGHT */}

      <div className="login-right">
        <div className="goal-card">
          <h4>Weekly goal</h4>

          <div className="bars">
            <div></div>
            <div></div>
            <div className="active"></div>
            <div></div>
            <div></div>
          </div>

          <p>You're 22% ahead of your weekly learning goal.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;