import { useState, useEffect } from "react";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pendingInstitutes, setPendingInstitutes] = useState([]);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    fetchPendingInstitutes();
  }, []);

  const fetchPendingInstitutes = async () => {
    try {
      const res = await api.get("/api/admin/institutes/pending");
      setPendingInstitutes(res.data);
    } catch (error) {
      console.error("Error fetching pending institutes:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/api/admin/institutes/${id}/approve`);
      alert("Institute Approved Successfully!");
      fetchPendingInstitutes();
    } catch (error) {
      console.error("Error approving institute:", error);
      alert("Failed to approve institute");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/api/admin/institutes/${id}/reject`);
      alert("Institute Rejected Successfully!");
      fetchPendingInstitutes();
    } catch (error) {
      console.error("Error rejecting institute:", error);
      alert("Failed to reject institute");
    }
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
          EduHub Admin
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
                  activeSection === "approvals" ? "#d89b2b" : "#1f2937",
                color: "white",
                borderRadius: "10px",
              }}
              onClick={() => setActiveSection("approvals")}
            >
              Approvals
            </li>

            <li
              className="list-group-item border-0"
              style={{
                cursor: "pointer",
                background:
                  activeSection === "reports" ? "#d89b2b" : "#1f2937",
                color: "white",
                borderRadius: "10px",
              }}
              onClick={() => setActiveSection("reports")}
            >
              Reports
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div
          className="col-md-10 p-4"
          style={{ backgroundColor: "#f3f4f6" }}
        >
          <h2 className="fw-bold mb-4" style={{ color: "#1f2937" }}>
            Admin Dashboard
          </h2>

          {/* Dashboard */}
          {activeSection === "dashboard" && (
            <div className="row g-4">
              <div className="col-md-3">
                <div
                  className="card shadow border-0 p-3"
                  style={{
                    borderTop: "4px solid #d89b2b",
                    borderRadius: "14px",
                  }}
                >
                  <h6 style={{ color: "#6b7280" }}>Total Students</h6>
                  <h2 style={{ color: "#1f2937" }}>125</h2>
                </div>
              </div>

              <div className="col-md-3">
                <div
                  className="card shadow border-0 p-3"
                  style={{
                    borderTop: "4px solid #d89b2b",
                    borderRadius: "14px",
                  }}
                >
                  <h6 style={{ color: "#6b7280" }}>Total Institutes</h6>
                  <h2 style={{ color: "#1f2937" }}>15</h2>
                </div>
              </div>

              <div className="col-md-3">
                <div
                  className="card shadow border-0 p-3"
                  style={{
                    borderTop: "4px solid #d89b2b",
                    borderRadius: "14px",
                  }}
                >
                  <h6 style={{ color: "#6b7280" }}>Pending Approvals</h6>
                  <h2 style={{ color: "#1f2937" }}>
                    {pendingInstitutes.length}
                  </h2>
                </div>
              </div>

              <div className="col-md-3">
                <div
                  className="card shadow border-0 p-3"
                  style={{
                    borderTop: "4px solid #d89b2b",
                    borderRadius: "14px",
                  }}
                >
                  <h6 style={{ color: "#6b7280" }}>Total Courses</h6>
                  <h2 style={{ color: "#1f2937" }}>32</h2>
                </div>
              </div>
            </div>
          )}

          {/* Approvals */}
          {activeSection === "approvals" && (
            <div
              className="card shadow border-0 p-4"
              style={{ borderRadius: "16px" }}
            >
              <h4 className="fw-bold mb-4" style={{ color: "#1f2937" }}>
                Pending Institute Approvals
              </h4>

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
                    <th>Contact</th>
                    <th>Address</th>
                    <th>GSTIN</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {pendingInstitutes.length > 0 ? (
                    pendingInstitutes.map((inst) => {
                      const instId = inst.id || inst.userId;
                      return (
                        <tr key={instId}>
                          <td>{inst.name}</td>
                          <td>{inst.email}</td>
                          <td>{inst.contact}</td>
                          <td>{inst.address}</td>
                          <td>{inst.gstin}</td>
                          <td>
                            <button
                              className="btn btn-sm me-2"
                              style={{
                                backgroundColor: "#d89b2b",
                                color: "white",
                                border: "none",
                              }}
                              onClick={() => handleApprove(instId)}
                            >
                              Approve
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleReject(instId)}
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No Pending Approvals
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Reports */}
          {activeSection === "reports" && (
            <div
              className="card shadow border-0 p-4"
              style={{ borderRadius: "16px" }}
            >
              <h4 className="fw-bold">Reports Section</h4>
              <p className="text-muted">Coming Soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;