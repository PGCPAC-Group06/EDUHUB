import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

function StudentDashboard() {
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
          EduHub Student
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
            <li
              className="list-group-item border-0"
              style={{
                cursor: "pointer",
                background:
                  activeSection === "dashboard" ? "#d89b2b" : "#1f2937",
                color: "white",
                borderRadius: "10px",
              }}
              onClick={() => setActiveSection("dashboard")}
            >
              Dashboard
            </li>

            <li
              className="list-group-item border-0"
              style={{
                cursor: "pointer",
                background:
                  activeSection === "courses" ? "#d89b2b" : "#1f2937",
                color: "white",
                borderRadius: "10px",
              }}
              onClick={() => setActiveSection("courses")}
            >
              My Courses
            </li>

            <li
              className="list-group-item border-0"
              style={{
                cursor: "pointer",
                background:
                  activeSection === "profile" ? "#d89b2b" : "#1f2937",
                color: "white",
                borderRadius: "10px",
              }}
              onClick={() => setActiveSection("profile")}
            >
              Profile
            </li>

            <li
              className="list-group-item border-0"
              style={{
                cursor: "pointer",
                background:
                  activeSection === "certificates" ? "#d89b2b" : "#1f2937",
                color: "white",
                borderRadius: "10px",
              }}
              onClick={() => setActiveSection("certificates")}
            >
              Certificates
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div
          className="col-md-10 p-4"
          style={{ backgroundColor: "#f3f4f6" }}
        >
          <h2 className="fw-bold mb-4" style={{ color: "#1f2937" }}>
            Student Dashboard
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
                  <h6 style={{ color: "#6b7280" }}>Enrolled Courses</h6>
                  <h2 style={{ color: "#1f2937" }}>4</h2>
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
                  <h6 style={{ color: "#6b7280" }}>Completed Courses</h6>
                  <h2 style={{ color: "#1f2937" }}>2</h2>
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
                  <h6 style={{ color: "#6b7280" }}>Certificates</h6>
                  <h2 style={{ color: "#1f2937" }}>1</h2>
                </div>
              </div>
            </div>
          )}

          {/* My Courses */}
          {activeSection === "courses" && (
            <div
              className="card shadow border-0 p-4"
              style={{ borderRadius: "16px" }}
            >
              <h4 className="fw-bold mb-4">My Courses</h4>

              <table className="table table-hover">
                <thead
                  style={{
                    backgroundColor: "#1f2937",
                    color: "white",
                  }}
                >
                  <tr>
                    <th>Course Name</th>
                    <th>Institute</th>
                    <th>Progress</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>React Development</td>
                    <td>ABC Institute</td>
                    <td>60%</td>
                  </tr>
                  <tr>
                    <td>Node.js Backend</td>
                    <td>XYZ Academy</td>
                    <td>40%</td>
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
              <h4 className="fw-bold">Profile</h4>
              <p><strong>Name:</strong> Milan</p>
              <p><strong>Email:</strong> milan@gmail.com</p>
              <p><strong>Role:</strong> Student</p>
            </div>
          )}

          {/* Certificates */}
          {activeSection === "certificates" && (
            <div
              className="card shadow border-0 p-4"
              style={{ borderRadius: "16px" }}
            >
              <h4 className="fw-bold">Certificates</h4>
              <p className="text-muted">No Certificates Yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;