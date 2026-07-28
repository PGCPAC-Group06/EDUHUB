import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { courseApi } from "../services/api";

function InstituteDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const instituteProfileId = user?.userId;

  const [activeSection, setActiveSection] = useState("dashboard");
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [revenue, setRevenue] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    thumbnail: "",
    status: "ACTIVE",
    categoryIds: [],
  });

  useEffect(() => {
    if (instituteProfileId) {
      fetchCourses();
      fetchEnrollments();
      fetchCategories();
      fetchRevenue();
    }
  }, [instituteProfileId]);

  const fetchCourses = async () => {
    try {
      const res = await courseApi.get(`/courses/institute/${instituteProfileId}`);
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const res = await courseApi.get(`/enrollments/institute/${instituteProfileId}`);
      setEnrollments(res.data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await courseApi.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchRevenue = async () => {
    try {
      const res = await courseApi.get(`/revenue/institute/${instituteProfileId}`);
      setRevenue(res.data);
    } catch (error) {
      console.error("Error fetching revenue:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const resetForm = () => {
    setCourseForm({
      title: "",
      description: "",
      price: "",
      duration: "",
      thumbnail: "",
      status: "ACTIVE",
      categoryIds: [],
    });
    setEditingCourse(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowCourseModal(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      price: course.price,
      duration: course.duration,
      thumbnail: course.thumbnail || "",
      status: course.status || "ACTIVE",
      categoryIds: course.categories ? course.categories.map((c) => c.categoryId) : [],
    });
    setShowCourseModal(true);
  };

  const handleSaveCourse = async () => {
    try {
      const payload = {
        instituteProfileId: instituteProfileId,
        instructorId: instituteProfileId,
        title: courseForm.title,
        description: courseForm.description,
        price: parseFloat(courseForm.price),
        duration: courseForm.duration,
        thumbnail: courseForm.thumbnail || null,
        status: courseForm.status,
        categoryIds: courseForm.categoryIds,
      };

      if (editingCourse) {
        await courseApi.put(`/courses/${editingCourse.courseId}`, payload);
        alert("Course updated successfully!");
      } else {
        await courseApi.post("/courses", payload);
        alert("Course created successfully!");
      }
      setShowCourseModal(false);
      resetForm();
      fetchCourses();
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Failed to save course");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await courseApi.delete(`/courses/${courseId}`);
      alert("Course deleted successfully!");
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course");
    }
  };

  const handleCategoryToggle = (catId) => {
    setCourseForm((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(catId)
        ? prev.categoryIds.filter((id) => id !== catId)
        : [...prev.categoryIds, catId],
    }));
  };

  const approvedCourseCount = courses.filter((c) => c.approvalStatus === "APPROVED").length;

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

        <div className="d-flex align-items-center gap-3">
          <span style={{ color: "#9ca3af" }}>
            {user?.name || "Institute"}
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
        </div>
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
              ["reports", "Revenue"],
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
                  <h2>{courses.length}</h2>
                  <small className="text-muted">{approvedCourseCount} approved</small>
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
                  <h2>{enrollments.length}</h2>
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
                  <h6 style={{ color: "#6b7280" }}>Net Revenue</h6>
                  <h2>
                    ₹{revenue ? Number(revenue.totalInstituteEarnings).toLocaleString("en-IN") : "0"}
                  </h2>
                  <small className="text-muted">Institute share</small>
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
                  onClick={openCreateModal}
                >
                  + Add Course
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
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Approval</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <tr key={course.courseId}>
                        <td>{course.title}</td>
                        <td>₹{course.price}</td>
                        <td>{course.duration}</td>
                        <td>
                          <span className={`badge ${course.status === "ACTIVE" ? "bg-success" : "bg-secondary"}`}>
                            {course.status}
                          </span>
                        </td>
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
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => openEditModal(course)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteCourse(course.courseId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No courses yet. Click "Add Course" to create one.
                      </td>
                    </tr>
                  )}
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
              <h4 className="fw-bold mb-4">Enrolled Students</h4>

              <table className="table table-hover">
                <thead
                  style={{
                    backgroundColor: "#1f2937",
                    color: "white",
                  }}
                >
                  <tr>
                    <th>Student ID</th>
                    <th>Course</th>
                    <th>Enrollment Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.length > 0 ? (
                    enrollments.map((enrollment) => (
                      <tr key={enrollment.enrollmentId}>
                        <td>{enrollment.studentUserId}</td>
                        <td>{enrollment.course?.title || "N/A"}</td>
                        <td>
                          {enrollment.enrollmentDate
                            ? new Date(enrollment.enrollmentDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          <span className={`badge ${enrollment.status === "ACTIVE" ? "bg-success" : "bg-secondary"}`}>
                            {enrollment.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No students enrolled yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Revenue / Reports */}
          {activeSection === "reports" && (
            <div>
              {/* Summary Cards */}
              <div className="row g-4 mb-4">
                <div className="col-md-4">
                  <div
                    className="card shadow border-0 p-3"
                    style={{ borderTop: "4px solid #d89b2b", borderRadius: "14px" }}
                  >
                    <h6 style={{ color: "#6b7280" }}>Total Revenue (Gross)</h6>
                    <h3>₹{revenue ? Number(revenue.totalRevenue).toLocaleString("en-IN") : "0"}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="card shadow border-0 p-3"
                    style={{ borderTop: "4px solid #22c55e", borderRadius: "14px" }}
                  >
                    <h6 style={{ color: "#6b7280" }}>Institute Earnings (Net)</h6>
                    <h3 style={{ color: "#22c55e" }}>
                      ₹{revenue ? Number(revenue.totalInstituteEarnings).toLocaleString("en-IN") : "0"}
                    </h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="card shadow border-0 p-3"
                    style={{ borderTop: "4px solid #3b82f6", borderRadius: "14px" }}
                  >
                    <h6 style={{ color: "#6b7280" }}>Total Transactions</h6>
                    <h3>{revenue ? revenue.totalTransactions : 0}</h3>
                  </div>
                </div>
              </div>

              {/* Course Breakdown */}
              <div
                className="card shadow border-0 p-4"
                style={{ borderRadius: "16px" }}
              >
                <h4 className="fw-bold mb-4">Revenue by Course</h4>
                <table className="table table-hover">
                  <thead style={{ backgroundColor: "#1f2937", color: "white" }}>
                    <tr>
                      <th>Course</th>
                      <th>Enrollments</th>
                      <th>Institute Earnings</th>
                      <th>Transactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenue && revenue.courseBreakdown && revenue.courseBreakdown.length > 0 ? (
                      revenue.courseBreakdown.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.courseTitle}</td>
                          <td>{item.enrollmentCount}</td>
                          <td>₹{Number(item.instituteShare).toLocaleString("en-IN")}</td>
                          <td>{item.transactionCount}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          No revenue data yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Course Create/Edit Modal */}
      {showCourseModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: "16px" }}>
              <div
                className="modal-header"
                style={{ backgroundColor: "#1f2937" }}
              >
                <h5 className="modal-title" style={{ color: "#d89b2b" }}>
                  {editingCourse ? "Edit Course" : "Create New Course"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowCourseModal(false);
                    resetForm();
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={courseForm.title}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, title: e.target.value })
                      }
                      placeholder="Course title"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-bold">Price (₹) *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={courseForm.price}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, price: e.target.value })
                      }
                      placeholder="4999"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-bold">Duration *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={courseForm.duration}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, duration: e.target.value })
                      }
                      placeholder="3 Months"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">Description *</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={courseForm.description}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, description: e.target.value })
                      }
                      placeholder="Course description"
                    ></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Thumbnail URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={courseForm.thumbnail}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, thumbnail: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Status</label>
                    <select
                      className="form-select"
                      value={courseForm.status}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, status: e.target.value })
                      }
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                      <option value="DRAFT">Draft</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">Categories</label>
                    <div className="d-flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <div key={cat.categoryId} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`cat-${cat.categoryId}`}
                            checked={courseForm.categoryIds.includes(cat.categoryId)}
                            onChange={() => handleCategoryToggle(cat.categoryId)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`cat-${cat.categoryId}`}
                          >
                            {cat.categoryName}
                          </label>
                        </div>
                      ))}
                      {categories.length === 0 && (
                        <span className="text-muted">No categories available</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowCourseModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn"
                  style={{ backgroundColor: "#d89b2b", color: "white" }}
                  onClick={handleSaveCourse}
                  disabled={!courseForm.title || !courseForm.description || !courseForm.price || !courseForm.duration}
                >
                  {editingCourse ? "Update Course" : "Create Course"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InstituteDashboard;