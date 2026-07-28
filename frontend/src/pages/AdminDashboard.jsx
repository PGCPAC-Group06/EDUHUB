import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { authApi, courseApi } from "../services/api";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pendingInstitutes, setPendingInstitutes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    fetchPendingInstitutes();
    fetchCourses();
  }, []);

  const fetchPendingInstitutes = async () => {
    try {
      const res = await authApi.get("/admin/institutes/pending");
      setPendingInstitutes(res.data);
    } catch (error) {
      console.error("Error fetching pending institutes:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await courseApi.get("/courses");
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleApproveInstitute = async (id) => {
    try {
      await authApi.put(`/admin/institutes/${id}/approve`);
      alert("Institute Approved");
      fetchPendingInstitutes();
    } catch (error) {
      console.error("Approval error:", error);
      alert("Failed to approve institute");
    }
  };

  const handleRejectInstitute = async (id) => {
    try {
      await authApi.put(`/admin/institutes/${id}/reject`);
      alert("Institute Rejected");
      fetchPendingInstitutes();
    } catch (error) {
      console.error("Rejection error:", error);
      alert("Failed to reject institute");
    }
  };

  const handleApproveCourse = async (courseId) => {
    try {
      await courseApi.put(`/courses/${courseId}/approval?status=APPROVED`);
      alert("Course Approved Successfully");
      fetchCourses();
    } catch (error) {
      console.error("Course approval error:", error);
    }
  };

  const handleRejectCourse = async (courseId) => {
    try {
      await courseApi.put(`/courses/${courseId}/approval?status=REJECTED`);
      alert("Course Rejected");
      fetchCourses();
    } catch (error) {
      console.error("Course rejection error:", error);
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
          EduHub Admin Portal
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
              ["approvals", "Institute Approvals"],
              ["courses", "Course Approvals"],
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
            Admin Dashboard
          </h2>

          {/* Dashboard Metrics */}
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
                  <h6 style={{ color: "#6b7280" }}>Pending Institute Approvals</h6>
                  <h2 style={{ color: "#1f2937" }}>
                    {pendingInstitutes.length}
                  </h2>
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
                  <h6 style={{ color: "#6b7280" }}>Total Platform Courses</h6>
                  <h2 style={{ color: "#1f2937" }}>{courses.length}</h2>
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
                  <h6 style={{ color: "#6b7280" }}>Microservices Status</h6>
                  <h5 className="text-success fw-bold">3 / 3 Active</h5>
                </div>
              </div>
            </div>
          )}

          {/* Pending Institute Approvals */}
          {activeSection === "approvals" && (
            <div
              className="card shadow border-0 p-4"
              style={{ borderRadius: "16px" }}
            >
              <h4 className="fw-bold mb-4" style={{ color: "#1f2937" }}>
                Pending Institute Approvals (auth-service & institute-service)
              </h4>

              <table className="table table-hover">
                <thead
                  style={{
                    backgroundColor: "#1f2937",
                    color: "white",
                  }}
                >
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {pendingInstitutes.length > 0 ? (
                    pendingInstitutes.map((inst) => (
                      <tr key={inst.userId}>
                        <td>{inst.userId}</td>
                        <td>{inst.name}</td>
                        <td>{inst.email}</td>
                        <td>
                          <span className="badge bg-warning text-dark">
                            {inst.approvalStatus || "PENDING"}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm me-2"
                            style={{
                              backgroundColor: "#d89b2b",
                              color: "white",
                              border: "none",
                            }}
                            onClick={() => handleApproveInstitute(inst.userId)}
                          >
                            Approve
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRejectInstitute(inst.userId)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No Pending Institute Approvals
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Course Approvals */}
          {activeSection === "courses" && (
            <div
              className="card shadow border-0 p-4"
              style={{ borderRadius: "16px" }}
            >
              <h4 className="fw-bold mb-4" style={{ color: "#1f2937" }}>
                Course Approvals (course-service)
              </h4>

              <table className="table table-hover">
                <thead
                  style={{
                    backgroundColor: "#1f2937",
                    color: "white",
                  }}
                >
                  <tr>
                    <th>Course ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Approval Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <tr key={course.courseId}>
                        <td>{course.courseId}</td>
                        <td>{course.title}</td>
                        <td>₹{course.price}</td>
                        <td>{course.duration}</td>
                        <td>
                          <span
                            className={`badge ${
                              course.approvalStatus === "APPROVED"
                                ? "bg-success"
                                : course.approvalStatus === "REJECTED"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {course.approvalStatus}
                          </span>
                        </td>
                        <td>
                          {course.approvalStatus !== "APPROVED" && (
                            <button
                              className="btn btn-sm btn-success me-2"
                              onClick={() => handleApproveCourse(course.courseId)}
                            >
                              Approve
                            </button>
                          )}
                          {course.approvalStatus !== "REJECTED" && (
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleRejectCourse(course.courseId)}
                            >
                              Reject
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No Courses Found
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
              <h4 className="fw-bold">Platform Microservice System Reports</h4>
              <p className="text-muted mt-2">
                <strong>auth-service:</strong> Running on port 8080<br />
                <strong>institute-service:</strong> Running on port 8081<br />
                <strong>course-service:</strong> Running on port 8082
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;