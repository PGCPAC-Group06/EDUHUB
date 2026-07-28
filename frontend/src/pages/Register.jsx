import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [role, setRole] = useState("Student");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [gstin, setGstin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // RegisterRequest expected by backend: { name, email, password, role }
      const userData = {
        name,
        email,
        password,
        role: role === "student" ? "Student" : role === "institute" ? "Institute" : role,
      };

      const response = await api.post("/auth/register", userData);

      const successMsg = typeof response.data === "string" ? response.data : "User Registered Successfully";
      setMessage(successMsg);
      setMessageType("success");

      setName("");
      setContact("");
      setAddress("");
      setGstin("");
      setEmail("");
      setPassword("");
      setRole("Student");

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration Error:", error);
      const serverError = error.response?.data;
      if (typeof serverError === "string") {
        setMessage(serverError);
      } else if (serverError?.message) {
        setMessage(serverError.message);
      } else {
        setMessage("Registration failed. Please try again.");
      }
      setMessageType("danger");
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
          "linear-gradient(rgba(31,41,55,0.75), rgba(31,41,55,0.75)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070') center/cover",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "430px",
          borderRadius: "18px",
          backgroundColor: "rgba(255,255,255,0.97)",
        }}
      >
        <div className="text-center mb-2">
          <h2 className="fw-bold mb-1" style={{ color: "#1f2937" }}>
            EduHub
          </h2>
          <p className="mb-0 small" style={{ color: "#6b7280" }}>
            Create Your Account
          </p>
        </div>

        {message && (
          <div className={`alert alert-${messageType} py-2 mb-2 text-center`}>
            {message}
          </div>
        )}

        <form onSubmit={handleRegister}>
          {/* Role */}
          <div className="mb-2">
            <label className="form-label fw-semibold mb-1" style={{ fontSize: "14px", color: "#374151" }}>
              Role
            </label>
            <select
              className="form-select form-select-sm"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "8px" }}
            >
              <option value="Student">Student</option>
              <option value="Institute">Institute Admin</option>
            </select>
          </div>

          {/* Name */}
          <div className="mb-2">
            <label className="form-label fw-semibold mb-1" style={{ fontSize: "14px", color: "#374151" }}>
              {role.toLowerCase() === "institute" ? "Institute Name" : "Full Name"}
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder={
                role.toLowerCase() === "institute"
                  ? "Enter Institute Name"
                  : "Enter Full Name"
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "8px" }}
              required
            />
          </div>

          {role.toLowerCase() === "institute" && (
            <>
              {/* Contact + GSTIN same row */}
              <div className="row">
                <div className="col-6 mb-2">
                  <label className="form-label fw-semibold mb-1" style={{ fontSize: "14px", color: "#374151" }}>
                    Contact
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    style={{ padding: "8px 12px", borderRadius: "8px" }}
                  />
                </div>

                <div className="col-6 mb-2">
                  <label className="form-label fw-semibold mb-1" style={{ fontSize: "14px", color: "#374151" }}>
                    GSTIN
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="GSTIN"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    style={{ padding: "8px 12px", borderRadius: "8px" }}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="mb-2">
                <label className="form-label fw-semibold mb-1" style={{ fontSize: "14px", color: "#374151" }}>
                  Address
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ padding: "8px 12px", borderRadius: "8px" }}
                />
              </div>
            </>
          )}

          {/* Email */}
          <div className="mb-2">
            <label className="form-label fw-semibold mb-1" style={{ fontSize: "14px", color: "#374151" }}>
              Email
            </label>
            <input
              type="email"
              className="form-control form-control-sm"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "8px" }}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold mb-1" style={{ fontSize: "14px", color: "#374151" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-sm"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "8px" }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-100 mb-2"
            style={{
              backgroundColor: "#d89b2b",
              color: "white",
              border: "none",
              padding: "10px",
              fontWeight: "600",
              borderRadius: "10px",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-2">
          <span style={{ color: "#6b7280", fontSize: "14px" }}>
            Already have an account?{" "}
          </span>
          <Link to="/login" style={{ color: "#d89b2b", textDecoration: "none", fontWeight: "600", fontSize: "14px" }}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;