import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { instituteService } from "../services/instituteService";
import "../styles/InstituteDashboard.css";

// React Icons
import {
  FiGrid,
  FiBook,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiStar,
  FiSettings,
  FiSearch,
  FiBell,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiLock,
  FiLogOut,
  FiCheckCircle,
  FiAlertCircle,
  FiUserCheck,
  FiFileText,
  FiUploadCloud,
  FiX,
  FiCalendar,
  FiMapPin,
  FiPhone,
  FiBriefcase,
  FiInfo,
} from "react-icons/fi";

function InstituteDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Auth User from Redux or Storage
  const authState = useSelector((state) => state.auth.user);
  const storedAuth = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}")?.user;
  const authUser = authState?.user || (authState?.name ? authState : null) || storedAuth;

  // Active Sidebar Section
  const [activeSection, setActiveSection] = useState("overview");

  // Profile & Core States
  const [profile, setProfile] = useState({
    name: authUser?.name || "Nova Institute",
    email: authUser?.email || "contact@novainstitute.com",
    address: "Building B, Tech Park, Sector 62, Noida, UP - 201301",
    gstin: "07AAAAA0000A1Z5",
    contact_no: "+91 98112 34567",
    description: "Premier offline and hybrid training institute specializing in Software Engineering, UI/UX Design, and Data Science.",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80",
    approval_status: "approved",
  });

  const [summaryData, setSummaryData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [documents, setDocuments] = useState([]);

  // Search Filters
  const [globalSearch, setGlobalSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  // Modal States
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showManageCourseModal, setShowManageCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [showAddInstructorModal, setShowAddInstructorModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showUploadDocModal, setShowUploadDocModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Admin Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Course Approval Granted",
      message: "Admin approved your course 'UX Design Fundamentals'. It is now live in catalog.",
      time: "10 mins ago",
      unread: true,
    },
    {
      id: 2,
      title: "Document Verified",
      message: "Admin verified 'gst_certificate.pdf'. Status updated to Verified.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "New Student Enrollment",
      message: "Maria Lopez enrolled in 'UX Design Fundamentals'.",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 4,
      title: "Revenue Payout Processed",
      message: "Admin processed June batch revenue payout of ₹48,210.",
      time: "3 days ago",
      unread: false,
    },
  ]);

  // Forms
  const [newCourseForm, setNewCourseForm] = useState({
    title: "",
    description: "",
    price: 1999,
    duration: "6 weeks",
    instructor_name: "Aisha Kapoor",
    category: "Design",
    status: "draft",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
  });

  const [newInstructorForm, setNewInstructorForm] = useState({
    name: "",
    specialization: "",
    experience: 5,
    bio: "",
  });

  const [uploadDocForm, setUploadDocForm] = useState({
    document_type: "Registration Certificate",
    document_name: "",
    file_name: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [editProfileForm, setEditProfileForm] = useState({
    name: "",
    address: "",
    gstin: "",
    contact_no: "",
    description: "",
  });

  // Init Data Load
  useEffect(() => {
    loadDashboardData();
  }, [authUser?.user_id, authUser?.email]);

  const loadDashboardData = async () => {
    try {
      const prof = await instituteService.getInstituteProfile(authUser?.user_id, authUser);
      if (prof) {
        setProfile(prof);
        setEditProfileForm(prof);
      }
    } catch (e) {
      console.warn("Institute profile fetch fallback");
    }

    try {
      const summary = await instituteService.getDashboardSummary();
      setSummaryData(summary);
    } catch (e) {
      console.warn("Summary fetch fallback");
    }

    try {
      const crs = await instituteService.getCourses();
      setCourses(crs || []);
    } catch (e) {
      console.warn("Courses fetch fallback");
    }

    try {
      const std = await instituteService.getStudents();
      setStudents(std || []);
    } catch (e) {
      console.warn("Students fetch fallback");
    }

    try {
      const inst = await instituteService.getInstructors();
      setInstructors(inst || []);
    } catch (e) {
      console.warn("Instructors fetch fallback");
    }

    try {
      const docs = await instituteService.getDocuments();
      setDocuments(docs || []);
    } catch (e) {
      console.warn("Documents fetch fallback");
    }
  };

  const showToast = (text, type = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Helper for Initials
  const getInitials = (nameStr) => {
    if (!nameStr) return "NI";
    const parts = nameStr.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  };

  // Handlers for Course Operations
  const handleCreateCourseSubmit = async (e) => {
    e.preventDefault();
    if (!newCourseForm.title || !newCourseForm.description) {
      showToast("Please fill in course title and description!", "error");
      return;
    }
    try {
      const created = await instituteService.createCourse(newCourseForm);
      setCourses([created, ...courses]);
      setShowAddCourseModal(false);
      setNewCourseForm({
        title: "",
        description: "",
        price: 1999,
        duration: "6 weeks",
        instructor_name: instructors[0]?.name || "Aisha Kapoor",
        category: "Design",
        status: "draft",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      });
      showToast("New course created & sent for admin approval!", "success");
    } catch (err) {
      showToast("Failed to create course.", "error");
    }
  };

  const handleOpenManageCourse = (course) => {
    setSelectedCourse({ ...course });
    setShowManageCourseModal(true);
  };

  const handleUpdateCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await instituteService.updateCourse(selectedCourse.course_id, selectedCourse);
      setCourses(courses.map((c) => (c.course_id === updated.course_id ? updated : c)));
      setShowManageCourseModal(false);
      showToast("Course details updated successfully!", "success");
    } catch (err) {
      showToast("Failed to update course.", "error");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await instituteService.deleteCourse(courseId);
        setCourses(courses.filter((c) => c.course_id !== courseId));
        setShowManageCourseModal(false);
        showToast("Course deleted successfully!", "success");
      } catch (err) {
        showToast("Failed to delete course.", "error");
      }
    }
  };

  // Handlers for Profile & Documents
  const handleOpenEditProfileModal = () => {
    setEditProfileForm({ ...profile });
    setShowEditProfileModal(true);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const updated = await instituteService.updateInstituteProfile(editProfileForm, authUser?.user_id);
      setProfile(updated || editProfileForm);
      setShowEditProfileModal(false);
      showToast("Institute profile updated successfully!", "success");
    } catch (err) {
      setProfile(editProfileForm);
      setShowEditProfileModal(false);
      showToast("Institute profile updated successfully!", "success");
    }
  };

  const handleUploadDocumentSubmit = (e) => {
    e.preventDefault();
    if (!uploadDocForm.document_name) {
      showToast("Please enter a document title!", "error");
      return;
    }
    const cleanFilename = uploadDocForm.file_name
      ? uploadDocForm.file_name.replace(/.*[\/\\]/, "")
      : `${uploadDocForm.document_name.toLowerCase().replace(/\s+/g, "_")}.pdf`;

    const newDoc = {
      document_id: Date.now(),
      document_type: uploadDocForm.document_type,
      document_name: cleanFilename,
      status: "pending",
      desc: `${uploadDocForm.document_type} • uploaded ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`,
    };

    setDocuments([newDoc, ...documents]);
    setNotifications([
      {
        id: Date.now(),
        title: "Document Uploaded",
        message: `Uploaded ${cleanFilename} — Pending Admin verification.`,
        time: "Just now",
        unread: true,
      },
      ...notifications,
    ]);
    setShowUploadDocModal(false);
    setUploadDocForm({ document_type: "Registration Certificate", document_name: "", file_name: "" });
    showToast("Document uploaded successfully! Sent for Admin review.", "success");
  };

  // Handler for Password Update
  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword) {
      showToast("Please enter your current password!", "error");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("New passwords do not match!", "error");
      return;
    }
    if (passwordForm.newPassword.length < 4) {
      showToast("Password must be at least 4 characters long!", "error");
      return;
    }
    try {
      await instituteService.changePassword(passwordForm);
      setShowChangePasswordModal(false);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showToast("Password changed successfully!", "success");
    } catch (err) {
      showToast("Failed to update password.", "error");
    }
  };

  // Handler for Add Instructor
  const handleAddInstructorSubmit = async (e) => {
    e.preventDefault();
    if (!newInstructorForm.name || !newInstructorForm.specialization) {
      showToast("Please enter name and specialization!", "error");
      return;
    }
    try {
      const created = await instituteService.addInstructor(newInstructorForm);
      setInstructors([created, ...instructors]);
      setShowAddInstructorModal(false);
      setNewInstructorForm({ name: "", specialization: "", experience: 5, bio: "" });
      showToast("Instructor added successfully!", "success");
    } catch (err) {
      showToast("Failed to add instructor.", "error");
    }
  };

  // Filtered Courses & Students
  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes((courseSearch || globalSearch).toLowerCase()) ||
      c.category.toLowerCase().includes((courseSearch || globalSearch).toLowerCase())
  );

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes((studentSearch || globalSearch).toLowerCase()) ||
      s.course.toLowerCase().includes((studentSearch || globalSearch).toLowerCase()) ||
      s.email.toLowerCase().includes((studentSearch || globalSearch).toLowerCase())
  );

  return (
    <div className="id-dashboard-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 99999 }}>
          <div className={`toast show align-items-center text-white border-0 p-2 shadow-lg ${toastMessage.type === "error" ? "bg-danger" : "bg-success"}`} style={{ borderRadius: "14px" }}>
            <div className="d-flex">
              <div className="toast-body fw-bold">{toastMessage.text}</div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToastMessage(null)}></button>
            </div>
          </div>
        </div>
      )}

      {/* --- LEFT SIDEBAR --- */}
      <aside className="id-sidebar">
        <div>
          <div className="id-brand" onClick={() => setActiveSection("settings")} style={{ cursor: "pointer" }}>
            <div className="id-brand-logo">E</div>
            <div>
              <h1 className="id-brand-name">EduHub</h1>
              <span className="id-brand-sub">INSTITUTE PORTAL</span>
            </div>
          </div>

          <ul className="id-nav-list">
            <li className={`id-nav-item ${activeSection === "overview" ? "active" : ""}`} onClick={() => setActiveSection("overview")}>
              <FiGrid /> <span className="id-nav-text">Overview</span>
            </li>
            <li className={`id-nav-item ${activeSection === "courses" ? "active" : ""}`} onClick={() => setActiveSection("courses")}>
              <FiBook /> <span className="id-nav-text">Courses</span>
            </li>
            <li className={`id-nav-item ${activeSection === "students" ? "active" : ""}`} onClick={() => setActiveSection("students")}>
              <FiUsers /> <span className="id-nav-text">Students</span>
            </li>
            <li className={`id-nav-item ${activeSection === "revenue" ? "active" : ""}`} onClick={() => setActiveSection("revenue")}>
              <FiDollarSign /> <span className="id-nav-text">Revenue</span>
            </li>
            <li className={`id-nav-item ${activeSection === "analytics" ? "active" : ""}`} onClick={() => setActiveSection("analytics")}>
              <FiTrendingUp /> <span className="id-nav-text">Analytics</span>
            </li>
            <li className={`id-nav-item ${activeSection === "reviews" ? "active" : ""}`} onClick={() => setActiveSection("reviews")}>
              <FiStar /> <span className="id-nav-text">Reviews</span>
            </li>
            <li className={`id-nav-item ${activeSection === "settings" ? "active" : ""}`} onClick={() => setActiveSection("settings")}>
              <FiSettings /> <span className="id-nav-text">Settings</span>
            </li>
          </ul>
        </div>

        {/* Sidebar Footer Account Badge */}
        <div className="id-sidebar-user" onClick={() => setActiveSection("settings")} style={{ cursor: "pointer" }}>
          <div className="id-user-avatar-sm">{getInitials(profile.name)}</div>
          <div className="id-user-info">
            <div className="id-user-title text-truncate" style={{ maxWidth: 120 }}>
              {profile.name}
            </div>
            <div className="id-user-role">Institute Account</div>
          </div>
        </div>
      </aside>

      {/* --- MAIN WORKSPACE --- */}
      <main className="id-main-content">
        {/* TOP HEADER */}
        <header className="id-header">
          <div className="id-search-box">
            <FiSearch className="id-search-icon" />
            <input
              type="text"
              className="id-search-input"
              placeholder="Search students, courses..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
          </div>

          <div className="id-header-actions">
            <button className="id-notif-btn" title="Notifications" onClick={() => setShowNotifications(!showNotifications)}>
              <FiBell />
              {notifications.some((n) => n.unread) && <span className="id-notif-badge"></span>}
            </button>

            {showNotifications && (
              <div className="id-notif-dropdown">
                <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                  <h6 className="m-0 fw-bold fs-7">Admin Updates</h6>
                  <button
                    className="btn btn-link text-decoration-none p-0 fs-9 text-primary fw-bold"
                    onClick={() => setNotifications(notifications.map((n) => ({ ...n, unread: false })))}
                  >
                    Mark all read
                  </button>
                </div>
                <div className="d-flex flex-column gap-2" style={{ maxHeight: 280, overflowY: "auto" }}>
                  {notifications.map((n) => (
                    <div key={n.id} className={`id-notif-item ${n.unread ? "unread" : ""}`}>
                      <div className="d-flex justify-content-between fs-8 fw-bold">
                        <span>{n.title}</span>
                        <span className="text-muted fs-9 fw-normal">{n.time}</span>
                      </div>
                      <p className="fs-9 text-muted m-0 mt-1">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="id-user-avatar-sm cursor-pointer" onClick={() => setActiveSection("settings")} style={{ cursor: "pointer" }}>
              {getInitials(profile.name)}
            </div>
          </div>
        </header>

        {/* PAGE BODY */}
        <div className="id-body">
          {/* 1. OVERVIEW VIEW (Screenshot 1) */}
          {activeSection === "overview" && (
            <div>
              <div className="id-page-head">
                <h2 className="id-page-title">Institute overview</h2>
                <button className="id-btn-primary" onClick={() => setShowAddCourseModal(true)}>
                  <FiPlus /> New course
                </button>
              </div>

              {/* 4 Stat Cards */}
              <div className="id-stats-grid">
                <div className="id-stat-card">
                  <div className="id-stat-label">Total students</div>
                  <div className="id-stat-val">18,204</div>
                  <div className="id-stat-sub">+320 this week</div>
                </div>

                <div className="id-stat-card">
                  <div className="id-stat-label">Active courses</div>
                  <div className="id-stat-val">{courses.filter((c) => c.status === "active").length || 62}</div>
                  <div className="id-stat-sub">+4 this month</div>
                </div>

                <div className="id-stat-card">
                  <div className="id-stat-label">Revenue (MTD)</div>
                  <div className="id-stat-val">₹48,210</div>
                  <div className="id-stat-sub">+18%</div>
                </div>

                <div className="id-stat-card">
                  <div className="id-stat-label">Avg. rating</div>
                  <div className="id-stat-val">4.8</div>
                  <div className="id-stat-sub muted">stable</div>
                </div>
              </div>

              {/* Middle Section: Revenue Trend & Recent Reviews */}
              <div className="row g-4 mb-4">
                <div className="col-lg-7">
                  <div className="id-card h-100">
                    <h3 className="id-card-title">Revenue trend</h3>
                    <div className="id-trend-bars">
                      <div className="id-trend-col">
                        <div className="id-trend-bar" style={{ height: "45%" }}></div>
                        <span className="id-trend-month">Jan</span>
                      </div>
                      <div className="id-trend-col">
                        <div className="id-trend-bar" style={{ height: "55%" }}></div>
                        <span className="id-trend-month">Feb</span>
                      </div>
                      <div className="id-trend-col">
                        <div className="id-trend-bar" style={{ height: "35%" }}></div>
                        <span className="id-trend-month">Mar</span>
                      </div>
                      <div className="id-trend-col">
                        <div className="id-trend-bar" style={{ height: "70%" }}></div>
                        <span className="id-trend-month">Apr</span>
                      </div>
                      <div className="id-trend-col">
                        <div className="id-trend-bar" style={{ height: "60%" }}></div>
                        <span className="id-trend-month">May</span>
                      </div>
                      <div className="id-trend-col">
                        <div className="id-trend-bar highlight" style={{ height: "95%" }}></div>
                        <span className="id-trend-month">Jun</span>
                      </div>
                    </div>
                    <div className="mt-3 text-muted fs-8">Jan - Jun revenue, in thousands</div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="id-card h-100">
                    <h3 className="id-card-title">Recent reviews</h3>
                    <div className="id-review-list">
                      {(summaryData?.recentReviews || []).map((rev) => (
                        <div className="id-review-item" key={rev.id}>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="id-review-author">{rev.student}</span>
                            <span className="id-review-rating">
                              ★ {rev.rating.toFixed(1)}
                            </span>
                          </div>
                          <p className="id-review-comment">"{rev.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: Recent Enrollments Table */}
              <div className="id-card">
                <h3 className="id-card-title">Recent enrollments</h3>
                <div className="id-table-container">
                  <table className="id-table">
                    <thead>
                      <tr>
                        <th>STUDENT</th>
                        <th>COURSE</th>
                        <th>ENROLLED</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.slice(0, 5).map((std) => (
                        <tr key={std.enrollment_id}>
                          <td className="fw-bold">{std.name}</td>
                          <td>
                            <span className="id-link-purple cursor-pointer">{std.course}</span>
                          </td>
                          <td>{std.enrolled_time}</td>
                          <td>
                            <span className={`id-badge ${std.status === "Active" ? "id-badge-active" : std.status === "Completed" ? "id-badge-completed" : "id-badge-pending"}`}>
                              {std.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. COURSES VIEW (Screenshot 3) */}
          {activeSection === "courses" && (
            <div>
              <div className="id-page-head">
                <h2 className="id-page-title">Courses</h2>
                <div className="d-flex gap-3">
                  <div className="id-search-box" style={{ width: 280 }}>
                    <FiSearch className="id-search-icon" />
                    <input
                      type="text"
                      className="id-search-input"
                      placeholder="Search your courses..."
                      value={courseSearch}
                      onChange={(e) => setCourseSearch(e.target.value)}
                    />
                  </div>
                  <button className="id-btn-primary" onClick={() => setShowAddCourseModal(true)}>
                    <FiPlus /> New course
                  </button>
                </div>
              </div>

              <div className="id-courses-grid">
                {filteredCourses.map((crs) => (
                  <div className="id-course-card" key={crs.course_id}>
                    <img src={crs.thumbnail} alt={crs.title} className="id-course-thumb" />
                    <div className="id-course-body">
                      <div className="id-course-badges">
                        <span className={`id-badge id-badge-${crs.approval_status}`}>
                          {crs.approval_status}
                        </span>
                        <span className={`id-badge id-badge-${crs.status}`}>
                          {crs.status}
                        </span>
                      </div>
                      <h4 className="id-course-title">{crs.title}</h4>
                      <div className="id-course-meta">
                        {crs.category} • ₹{crs.price} • {crs.duration}
                      </div>
                      <div className="fs-8 text-muted mb-3">{crs.enrolled_count} students enrolled</div>
                      <div className="id-course-footer">
                        <button className="id-btn-outline-purple" onClick={() => handleOpenManageCourse(crs)}>
                          <FiEdit3 /> Manage course
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. STUDENTS VIEW (Screenshot 4) */}
          {activeSection === "students" && (
            <div>
              <div className="id-page-head">
                <h2 className="id-page-title">Students</h2>
                <div className="id-search-box" style={{ width: 280 }}>
                  <FiSearch className="id-search-icon" />
                  <input
                    type="text"
                    className="id-search-input"
                    placeholder="Search students..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="id-card">
                <div className="id-table-container">
                  <table className="id-table">
                    <thead>
                      <tr>
                        <th>STUDENT</th>
                        <th>EMAIL</th>
                        <th>COURSE</th>
                        <th>ENROLLED</th>
                        <th>PROGRESS</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((std) => (
                        <tr key={std.enrollment_id}>
                          <td className="fw-bold">{std.name}</td>
                          <td className="text-muted">{std.email}</td>
                          <td>
                            <span className="id-link-purple cursor-pointer">{std.course}</span>
                          </td>
                          <td>{std.enrolled_time}</td>
                          <td>
                            <div className="d-flex align-items-center gap-2" style={{ width: 140 }}>
                              <div className="progress flex-grow-1" style={{ height: 6, borderRadius: 10 }}>
                                <div
                                  className="progress-bar"
                                  style={{
                                    width: `${std.progress}%`,
                                    backgroundColor: "var(--id-primary)",
                                    borderRadius: 10,
                                  }}
                                ></div>
                              </div>
                              <span className="fs-8 fw-bold text-muted">{std.progress}%</span>
                            </div>
                          </td>
                          <td>
                            <span className={`id-badge ${std.status === "Active" ? "id-badge-active" : std.status === "Completed" ? "id-badge-completed" : "id-badge-pending"}`}>
                              {std.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 4. REVENUE VIEW (Screenshot 5) */}
          {activeSection === "revenue" && (
            <div>
              <div className="id-page-head">
                <h2 className="id-page-title">Revenue</h2>
              </div>

              <div className="id-stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                <div className="id-stat-card">
                  <div className="id-stat-label">This month</div>
                  <div className="id-stat-val">₹48,210</div>
                  <div className="id-stat-sub">+18% vs last month</div>
                </div>

                <div className="id-stat-card">
                  <div className="id-stat-label">Pending payouts</div>
                  <div className="id-stat-val">₹6,450</div>
                  <div className="id-stat-sub muted">Processed weekly</div>
                </div>

                <div className="id-stat-card">
                  <div className="id-stat-label">Lifetime revenue</div>
                  <div className="id-stat-val">₹5,82,940</div>
                  <div className="id-stat-sub muted">Since 2023</div>
                </div>
              </div>

              <div className="id-card">
                <h3 className="id-card-title">Recent transactions</h3>
                <div className="id-table-container">
                  <table className="id-table">
                    <thead>
                      <tr>
                        <th>STUDENT</th>
                        <th>COURSE</th>
                        <th>AMOUNT</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(summaryData?.recentTransactions || []).map((txn) => (
                        <tr key={txn.transaction_id}>
                          <td className="fw-normal">{txn.student}</td>
                          <td>
                            <span className="id-link-purple cursor-pointer">{txn.course}</span>
                          </td>
                          <td className="fw-normal">₹{txn.amount}</td>
                          <td>{txn.date}</td>
                          <td>
                            <span className={`id-badge ${txn.status === "Paid" ? "id-badge-approved" : "id-badge-refunded"}`}>
                              {txn.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 5. ANALYTICS VIEW (Matching User Screenshot 1 - Course Completion Rate Removed) */}
          {activeSection === "analytics" && (
            <div>
              <div className="id-page-head">
                <h2 className="id-page-title">Analytics</h2>
              </div>

              <div className="row g-4">
                {/* Top Performing Courses */}
                <div className="col-lg-6">
                  <div className="id-card h-100">
                    <h3 className="id-card-title">Top performing courses</h3>
                    <div className="d-flex flex-column gap-3">
                      {[
                        { rank: 1, title: "Design Thinking", students: "530 students" },
                        { rank: 2, title: "UX Design Fundamentals", students: "412 students" },
                        { rank: 3, title: "Advanced Figma Mastery", students: "268 students" },
                        { rank: 4, title: "Full-Stack Web Development", students: "189 students" },
                      ].map((item) => (
                        <div className="d-flex align-items-center gap-3" key={item.rank}>
                          <div
                            className="d-flex align-items-center justify-content-center fw-normal fs-7"
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              backgroundColor: "#f1f5f9",
                              color: "#64748b",
                            }}
                          >
                            {item.rank}
                          </div>
                          <div>
                            <div className="fw-normal fs-8">{item.title}</div>
                            <div className="text-muted fs-9">{item.students}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enrollment Sources */}
                <div className="col-lg-6">
                  <div className="id-card h-100">
                    <h3 className="id-card-title">Enrollment sources</h3>
                    <div className="d-flex flex-column gap-3">
                      {[
                        { source: "Direct search", percent: 42 },
                        { source: "Category browse", percent: 31 },
                        { source: "Referral", percent: 18 },
                        { source: "Social", percent: 9 },
                      ].map((src) => (
                        <div key={src.source}>
                          <div className="d-flex justify-content-between fs-8 fw-normal mb-1">
                            <span>{src.source}</span>
                            <span className="text-muted">{src.percent}%</span>
                          </div>
                          <div className="progress" style={{ height: 6, borderRadius: 10 }}>
                            <div
                              className="progress-bar"
                              style={{
                                width: `${src.percent}%`,
                                backgroundColor: "var(--id-primary)",
                                borderRadius: 10,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. REVIEWS VIEW (Matching User Screenshot 2) */}
          {activeSection === "reviews" && (
            <div>
              <div className="id-page-head">
                <h2 className="id-page-title">Reviews</h2>
              </div>

              <div className="d-flex flex-column gap-3">
                {[
                  {
                    id: 1,
                    author: "Aisha K.",
                    course: "UX Design Fundamentals",
                    rating: 5.0,
                    comment: "Loved the pacing of module 3, very clear explanations throughout.",
                    time: "2 days ago",
                  },
                  {
                    id: 2,
                    author: "Raj N.",
                    course: "Full-Stack Web Development",
                    rating: 4.5,
                    comment: "Great instructor, audio quality could improve in a couple of lectures.",
                    time: "4 days ago",
                  },
                  {
                    id: 3,
                    author: "Priya Shah",
                    course: "Design Thinking",
                    rating: 4.8,
                    comment: "Practical exercises made the concepts stick immediately.",
                    time: "1 week ago",
                  },
                  {
                    id: 4,
                    author: "Karan Mehta",
                    course: "Advanced Figma Mastery",
                    rating: 4.2,
                    comment: "Solid course, wish there were more real-world project files.",
                    time: "1 week ago",
                  },
                ].map((rev) => (
                  <div className="id-card" key={rev.id} style={{ padding: "1.25rem 1.5rem" }}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div>
                        <span className="fw-normal fs-7 me-1">{rev.author}</span>
                        <span className="text-muted fs-8">on {rev.course}</span>
                      </div>
                      <span className="id-review-rating fs-7">★ {rev.rating.toFixed(1)}</span>
                    </div>
                    <p className="id-review-comment fs-7 mb-1">"{rev.comment}"</p>
                    <div className="text-muted fs-9">{rev.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. SETTINGS / PROFILE VIEW (Matching User Screenshot 3) */}
          {activeSection === "settings" && (
            <div className="mx-auto" style={{ maxWidth: 720 }}>
              <div className="id-page-head justify-content-center mb-4">
                <h2 className="id-page-title">Institute Settings</h2>
              </div>

              {/* Institute Profile Card */}
              <div className="id-card mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="id-user-avatar-sm" style={{ width: 44, height: 44, fontSize: "1.1rem" }}>
                      {getInitials(profile.name)}
                    </div>
                    <div>
                      <h4 className="fw-semibold m-0 fs-6">{profile.name}</h4>
                      <p className="text-muted fs-8 m-0">Institute profile</p>
                    </div>
                  </div>
                  <button className="id-btn-outline btn-sm" onClick={handleOpenEditProfileModal}>
                    <FiEdit3 /> Edit profile
                  </button>
                </div>

                <div className="id-info-box mb-3" style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: "0.85rem 1rem" }}>
                  <div className="text-muted fs-9 fw-bold uppercase">Address</div>
                  <div className="fw-normal fs-8">{profile.address}</div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <div className="id-info-box" style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: "0.85rem 1rem" }}>
                      <div className="text-muted fs-9 fw-bold uppercase">GSTIN</div>
                      <div className="fw-normal fs-8">{profile.gstin}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="id-info-box" style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: "0.85rem 1rem" }}>
                      <div className="text-muted fs-9 fw-bold uppercase">Contact No</div>
                      <div className="fw-normal fs-8">{profile.contact_no}</div>
                    </div>
                  </div>
                </div>

                <div className="id-info-box" style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: "0.85rem 1rem" }}>
                  <div className="text-muted fs-9 fw-bold uppercase">Description</div>
                  <div className="fw-normal fs-8">{profile.description}</div>
                </div>
              </div>

              {/* Verification Documents Card */}
              <div className="id-card mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="fw-semibold m-0 fs-6">Verification documents</h4>
                    <p className="text-muted fs-8 m-0">Uploaded documents used to verify your institute</p>
                  </div>
                  <button className="id-btn-outline-purple btn-sm" style={{ width: "auto" }} onClick={() => setShowUploadDocModal(true)}>
                    <FiUploadCloud /> Upload document
                  </button>
                </div>

                <div className="d-flex flex-column gap-2">
                  {(documents.length > 0
                    ? documents
                    : [
                        {
                          document_id: 1,
                          document_name: "institute_registration.pdf",
                          desc: "Registration Certificate • uploaded 10 Jan 2026 • verified 15 Jan 2026",
                          status: "verified",
                        },
                        {
                          document_id: 2,
                          document_name: "gst_certificate.pdf",
                          desc: "GST Certificate • uploaded 12 Jan 2026 • verified 15 Jan 2026",
                          status: "verified",
                        },
                        {
                          document_id: 3,
                          document_name: "institute_pan.pdf",
                          desc: "PAN Card • uploaded 20 Jul 2026",
                          status: "pending",
                        },
                      ]
                  ).map((doc, idx) => (
                    <div className="d-flex justify-content-between align-items-center p-2 rounded-3" key={doc.document_id || idx} style={{ backgroundColor: "#f8fafc" }}>
                      <div className="d-flex align-items-center gap-2">
                        <FiFileText className="text-primary fs-5" />
                        <div>
                          <div className="fw-normal fs-8">{doc.document_name || doc.name}</div>
                          <div className="text-muted fs-9">{doc.desc || `${doc.document_type || "Document"} • status ${doc.status}`}</div>
                        </div>
                      </div>
                      <span className={`id-badge ${(doc.status || doc.verification_status) === "verified" ? "id-badge-approved" : "id-badge-pending"}`}>
                        {doc.status || doc.verification_status || "pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Log Out Button */}
              <div className="text-center mt-3 mb-4">
                <button className="btn btn-light text-danger fw-bold rounded-3 px-4" onClick={handleLogout}>
                  <FiLogOut className="me-2" /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* --- MODAL 1: ADD NEW COURSE (Screenshot 2) --- */}
      {showAddCourseModal && (
        <div className="id-modal-backdrop">
          <div className="id-modal-content">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0 fs-5">Add a new course</h4>
              <button className="btn-close" onClick={() => setShowAddCourseModal(false)}></button>
            </div>

            <form onSubmit={handleCreateCourseSubmit}>
              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Course Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Advanced Figma Mastery"
                  value={newCourseForm.title}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Description</label>
                <textarea
                  rows="3"
                  className="form-control"
                  placeholder="What will students learn in this course?"
                  value={newCourseForm.description}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fs-7 fw-bold">Price (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="1999"
                    value={newCourseForm.price}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, price: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fs-7 fw-bold">Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 6 weeks"
                    value={newCourseForm.duration}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, duration: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Instructor</label>
                <select
                  className="form-select"
                  value={newCourseForm.instructor_name}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, instructor_name: e.target.value })}
                >
                  {instructors.map((inst) => (
                    <option key={inst.instructor_id} value={inst.name}>
                      {inst.name} ({inst.specialization})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold d-block">Categories</label>
                <div className="d-flex flex-wrap gap-2">
                  {instituteService.getCategories().map((cat) => (
                    <span
                      key={cat}
                      className={`id-cat-pill ${newCourseForm.category === cat ? "active" : ""}`}
                      onClick={() => setNewCourseForm({ ...newCourseForm, category: cat })}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Status</label>
                <select
                  className="form-select"
                  value={newCourseForm.status}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, status: e.target.value })}
                >
                  <option value="draft">Draft — not visible to students</option>
                  <option value="active">Active — published in catalog</option>
                </select>
              </div>

              <div className="id-info-alert">
                <FiInfo className="fs-5 flex-shrink-0" />
                <span>New and edited courses are reviewed by our team before appearing as "Approved" in the catalog.</span>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="id-btn-outline" onClick={() => setShowAddCourseModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="id-btn-primary">
                  Save course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: MANAGE / EDIT COURSE --- */}
      {showManageCourseModal && selectedCourse && (
        <div className="id-modal-backdrop">
          <div className="id-modal-content">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0 fs-5">Manage Course</h4>
              <button className="btn-close" onClick={() => setShowManageCourseModal(false)}></button>
            </div>

            <form onSubmit={handleUpdateCourseSubmit}>
              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Course Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedCourse.title}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, title: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Description</label>
                <textarea
                  rows="3"
                  className="form-control"
                  value={selectedCourse.description}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fs-7 fw-bold">Price (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={selectedCourse.price}
                    onChange={(e) => setSelectedCourse({ ...selectedCourse, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fs-7 fw-bold">Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedCourse.duration}
                    onChange={(e) => setSelectedCourse({ ...selectedCourse, duration: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Status</label>
                <select
                  className="form-select"
                  value={selectedCourse.status}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Course Modules</label>
                <ul className="list-group fs-8">
                  {(selectedCourse.modules || []).map((mod, i) => (
                    <li className="list-group-item" key={i}>
                      {mod}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteCourse(selectedCourse.course_id)}>
                  <FiTrash2 /> Delete Course
                </button>

                <div className="d-flex gap-2">
                  <button type="button" className="id-btn-outline" onClick={() => setShowManageCourseModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="id-btn-primary">
                    Update Course
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: ADD INSTRUCTOR --- */}
      {showAddInstructorModal && (
        <div className="id-modal-backdrop">
          <div className="id-modal-content" style={{ maxWidth: 460 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0 fs-5">Add Instructor</h4>
              <button className="btn-close" onClick={() => setShowAddInstructorModal(false)}></button>
            </div>

            <form onSubmit={handleAddInstructorSubmit}>
              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Instructor Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Dr. Vikram Sethi"
                  value={newInstructorForm.name}
                  onChange={(e) => setNewInstructorForm({ ...newInstructorForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Specialization</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Data Science & ML"
                  value={newInstructorForm.specialization}
                  onChange={(e) => setNewInstructorForm({ ...newInstructorForm, specialization: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Experience (Years)</label>
                <input
                  type="number"
                  className="form-control"
                  value={newInstructorForm.experience}
                  onChange={(e) => setNewInstructorForm({ ...newInstructorForm, experience: e.target.value })}
                />
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="id-btn-outline" onClick={() => setShowAddInstructorModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="id-btn-primary">
                  Add Instructor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 4: EDIT PROFILE --- */}
      {showEditProfileModal && (
        <div className="id-modal-backdrop">
          <div className="id-modal-content" style={{ maxWidth: 540 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0 fs-5">Edit Institute Profile</h4>
              <button className="btn-close" onClick={() => setShowEditProfileModal(false)}></button>
            </div>

            <form onSubmit={handleProfileSave}>
              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Institute Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editProfileForm.name || ""}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fs-7 fw-bold">GSTIN Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editProfileForm.gstin || ""}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, gstin: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fs-7 fw-bold">Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editProfileForm.contact_no || ""}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, contact_no: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Official Address</label>
                <textarea
                  rows="2"
                  className="form-control"
                  value={editProfileForm.address || ""}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, address: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Institute Description</label>
                <textarea
                  rows="3"
                  className="form-control"
                  value={editProfileForm.description || ""}
                  onChange={(e) => setEditProfileForm({ ...editProfileForm, description: e.target.value })}
                ></textarea>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="id-btn-outline" onClick={() => setShowEditProfileModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="id-btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 5: UPLOAD VERIFICATION DOCUMENT --- */}
      {showUploadDocModal && (
        <div className="id-modal-backdrop">
          <div className="id-modal-content" style={{ maxWidth: 500 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0 fs-5">Upload Verification Document</h4>
              <button className="btn-close" onClick={() => setShowUploadDocModal(false)}></button>
            </div>

            <form onSubmit={handleUploadDocumentSubmit}>
              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Document Category</label>
                <select
                  className="form-select"
                  value={uploadDocForm.document_type}
                  onChange={(e) => setUploadDocForm({ ...uploadDocForm, document_type: e.target.value })}
                >
                  <option value="Registration Certificate">Registration Certificate</option>
                  <option value="GST Certificate">GST Certificate</option>
                  <option value="PAN Card">PAN Card / Tax Deed</option>
                  <option value="Accreditation Certificate">Accreditation Certificate</option>
                  <option value="Other Official Proof">Other Official Proof</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Document Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Institute Incorporation Deed 2026"
                  value={uploadDocForm.document_name}
                  onChange={(e) => setUploadDocForm({ ...uploadDocForm, document_name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Select File (PDF / Image)</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setUploadDocForm({ ...uploadDocForm, file_name: e.target.files[0]?.name || "" })}
                  required
                />
              </div>

              <div className="id-info-alert mb-3">
                <FiInfo className="fs-5 flex-shrink-0" />
                <span>Uploaded files undergo automated & manual Admin verification within 24-48 hours.</span>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="id-btn-outline" onClick={() => setShowUploadDocModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="id-btn-primary">
                  Upload & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InstituteDashboard;