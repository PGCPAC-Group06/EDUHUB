import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

function InstituteDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <nav
        className="navbar px-4 py-3 shadow"
        style={{ backgroundColor: "#1f2937" }}
      >
        <span
          className="navbar-brand mb-0 h3 fw-bold"
          style={{ color: "#d89b2b" }}
        >
          EduHub Institute
        </span>

        <button
          className="btn"
          onClick={handleLogout}
          style={{
            border: "1px solid #d89b2b",
            color: "#d89b2b",
          }}
        >
          Logout
        </button>
      </nav>

      <div className="row g-0" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <div
          className="col-md-2 p-4"
          style={{
            backgroundColor: "#111827",
            minHeight: "100vh",
          }}
        >
          <h4 className="mb-4" style={{ color: "#d89b2b" }}>
            Menu
          </h4>

          <ul className="list-group gap-2">
            {[
              ["dashboard", "Dashboard"],
              ["courses", "Manage Courses"],
              ["students", "Students"],
              ["profile", "Profile"],
              ["reports", "Reports"],
            ].map(([key, label]) => (
              <li
                key={key}
                className="list-group-item border-0"
                style={{
                  cursor: "pointer",
                  background:
                    activeSection === key ? "#d89b2b" : "#1f2937",
                  color: "white",
                  borderRadius: "10px",
                }}
                onClick={() => setActiveSection(key)}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div
          className="col-md-10 p-4"
          style={{ backgroundColor: "#f3f4f6" }}
        >
          <h2 className="fw-bold mb-4" style={{ color: "#1f2937" }}>
            Institute Dashboard
          </h2>

          {/* Dashboard */}
          {activeSection === "dashboard" && (
            <div className="row g-4">
              <div className="col-md-4">
                <div
                  className="card shadow border-0 p-3"
                  style={{
                    borderTop: "4px solid #d89b2b",
                    borderRadius: "14px",
                  }}
                >
                  <h6 style={{ color: "#6b7280" }}>Total Courses</h6>
                  <h2>8</h2>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="card shadow border-0 p-3"
                  style={{
                    borderTop: "4px solid #d89b2b",
                    borderRadius: "14px",
                  }}
                >
                  <h6 style={{ color: "#6b7280" }}>Total Students</h6>
                  <h2>125</h2>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="card shadow border-0 p-3"
                  style={{
                    borderTop: "4px solid #d89b2b",
                    borderRadius: "14px",
                  }}
                >
                  <h6 style={{ color: "#6b7280" }}>Revenue</h6>
                  <h2>₹45K</h2>
                </div>
              </div>
            </div>
          )}

          {/* Manage Courses */}
          {activeSection === "courses" && (
            <div
              className="card shadow border-0 p-4"
              style={{ borderRadius: "16px" }}
            >
              <div className="d-flex justify-content-between mb-4">
                <h4 className="fw-bold">Manage Courses</h4>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#d89b2b",
                    color: "white",
                  }}
                >
                  Add Course
                </button>
              </div>

              <table className="table table-hover">
                <thead
                  style={{
                    backgroundColor: "#1f2937",
                    color: "white",
                  }}
                >
                  <tr>
                    <th>Course Name</th>
                    <th>Price</th>
                    <th>Students</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>React Development</td>
                    <td>₹4999</td>
                    <td>50</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2">
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Students */}
          {activeSection === "students" && (
            <div
              className="card shadow border-0 p-4"
              style={{ borderRadius: "16px" }}
            >
              <h4 className="fw-bold mb-4">Student Management</h4>

              <table className="table table-hover">
                <thead
                  style={{
                    backgroundColor: "#1f2937",
                    color: "white",
                  }}
                >
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Milan</td>
                    <td>milan@gmail.com</td>
                    <td>React Development</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Profile */}
          {activeSection === "profile" && (
            <div
              className="card shadow border-0 p-4"
              style={{ borderRadius: "16px" }}
            >
              <h4 className="fw-bold">Institute Profile</h4>
              <p><strong>Name:</strong> ABC Institute</p>
              <p><strong>Email:</strong> abc@gmail.com</p>
              <p><strong>Contact:</strong> 9876543210</p>
            </div>
          )}

          {/* Reports */}
          {activeSection === "reports" && (
            <div
              className="card shadow border-0 p-4"
              style={{ borderRadius: "16px" }}
            >
              <h4 className="fw-bold">Reports</h4>
              <p className="text-muted">Coming Soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InstituteDashboard;