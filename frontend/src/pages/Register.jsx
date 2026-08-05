import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Register.css";

function Register() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [gstin, setGstin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password and Confirm Password do not match");
      setMessageType("danger");
      return;
    }

    try {
      const userData = {
        role,
        name,
        contact,
        address,
        gstin,
        email,
        password,
      };

      const response = await api.post("/api/auth/register", userData);

      const successMsg =
        typeof response.data === "string"
          ? response.data
          : "Registration Successful!";
      setMessage(successMsg);
      setMessageType("success");

      setName("");
      setContact("");
      setAddress("");
      setGstin("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("student");
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : "Registration Failed");
      setMessage(errMsg);
      setMessageType("danger");
    }
  };

  return (
    <div className="register-page">
      {/* LEFT SIDE */}

      <div className="register-left">
        <div className="register-box">
          <div className="logo">
            <div className="logo-icon">E</div>
            <h2>EduHub</h2>
          </div>

          <h1>Create your account</h1>

          <p className="subtitle">
            Join EduHub and start your learning journey.
          </p>

          {message && (
            <div className={`alert alert-${messageType}`}>{message}</div>
          )}

          <form onSubmit={handleRegister}>
            {/* Role */}

            <div className="form-group">
              <label>Register As</label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="institute">Institute</option>
              </select>
            </div>

            {/* Name */}

            <div className="form-group">
              <label>
                {role === "student" ? "Full Name" : "Institute Name"}
              </label>

              <input
                type="text"
                placeholder={
                  role === "student"
                    ? "Enter Full Name"
                    : "Enter Institute Name"
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Institute Fields */}

            {role === "institute" && (
              <>
                <div className="double-input">
                  <div className="form-group">
                    <label>Contact</label>

                    <input
                      type="text"
                      placeholder="Enter Contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>GSTIN</label>

                    <input
                      type="text"
                      placeholder="Enter GSTIN"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>

                  <input
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            {/* Email */}

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}

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

            {/* Confirm Password */}

            <div className="form-group">
              <label>Confirm Password</label>

              <div className="password-box">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <span
                  className="eye"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button type="submit" className="register-btn">
              Register
            </button>
          </form>

          <div className="login-link">
            Already have an account?
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="register-right">
        <div className="welcome-card">
          <h2>Welcome to EduHub</h2>

          <p>
            Connect with top institutes, enroll in courses, learn new skills
            and grow your career with one platform.
          </p>

          <div className="progress-bars">
            <div></div>
            <div></div>
            <div className="active"></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;