import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { studentService } from "../services/studentService";
import "../styles/StudentDashboard.css";

// Icons from react-icons/fi & fa
import {
  FiGrid,
  FiBookOpen,
  FiCompass,
  FiAward,
  FiUser,
  FiSearch,
  FiBell,
  FiCheckCircle,
  FiStar,
  FiDownload,
  FiLogOut,
  FiEdit3,
  FiLock,
  FiCalendar,
  FiPhone,
  FiBook,
  FiMapPin,
  FiX,
  FiCreditCard,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiUsers,
  FiLayers,
  FiCheck,
  FiDownloadCloud,
  FiInfo,
  FiMessageSquare
} from "react-icons/fi";

function StudentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Redux / Auth (Dynamically retrieved per logged in user)
  const authState = useSelector((state) => state.auth.user);
  const storedAuth = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}")?.user;
  const authUser = authState?.user || (authState?.name ? authState : null) || storedAuth;

  // Section State
  const [activeSection, setActiveSection] = useState("dashboard");

  // Profile State
  const [profile, setProfile] = useState({
    name: authUser?.name || "Student User",
    email: authUser?.email || "student@example.com",
    date_of_birth: "2001-03-14",
    gender: "Male",
    mobile: "+91 98765 43210",
    college_name: "DTU, New Delhi",
    degree: "B.Tech, Computer Science",
    city: "New Delhi",
  });

  // Data States
  const [enrollments, setEnrollments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [catalogCourses, setCatalogCourses] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [categories, setCategories] = useState([]);

  // Catalog Filter & Search States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [browseTab, setBrowseTab] = useState("courses"); // 'courses' or 'institutes'
  const [priceFilter, setPriceFilter] = useState("all");

  // Pagination States
  const [coursePage, setCoursePage] = useState(1);
  const [institutePage, setInstitutePage] = useState(1);
  const itemsPerPage = 6;

  // Modal States
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState(null);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState(null);
  const [detailTab, setDetailTab] = useState("syllabus"); // 'syllabus', 'instructor', 'reviews'
  const [selectedCourseForReview, setSelectedCourseForReview] = useState(null);
  const [selectedCourseForMaterials, setSelectedCourseForMaterials] = useState(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  // Form & Checkout States
  const [paymentMethod, setPaymentMethod] = useState("Credit Card / Debit Card");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const isEnrolled = (courseId) => {
    return enrollments.some((e) => e.course_id === courseId || e.course?.course_id === courseId);
  };
  const [editProfileForm, setEditProfileForm] = useState({
    name: "",
    mobile: "",
    date_of_birth: "",
    gender: "Male",
    college_name: "",
    degree: "",
    city: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Enrollment Confirmed",
      message: "Your offline batch enrollment for UX Design Fundamentals is active.",
      time: "10 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "New Syllabus Uploaded",
      message: "Data Science Hub uploaded new notes for Python Data Analysis.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "Offline Batch Reminder",
      message: "Classroom batch starts tomorrow at 10:00 AM.",
      time: "1 day ago",
      read: true,
    },
  ]);

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Notifications / Alert Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = "success") => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load Data on Mount & when Auth User changes
  useEffect(() => {
    loadStudentData();
  }, [authUser?.user_id, authUser?.email]);

  const loadStudentData = async () => {
    try {
      const profileData = await studentService.getStudentProfile(authUser?.user_id, authUser);
      if (profileData) {
        setProfile(profileData);
        setEditProfileForm(profileData);
      }
    } catch (e) {
      console.warn("Profile fetch fallback");
    }

    let loadedCatalog = [];
    try {
      const rawCatalog = await studentService.getBrowseCatalog();
      if (Array.isArray(rawCatalog)) {
        loadedCatalog = rawCatalog.map((c) => ({
          ...c,
          course_id: c.course_id || c.courseId,
          title: c.title,
          description: c.description,
          price: Number(c.price || 0),
          duration: c.duration || "Self-paced",
          institute_name: c.institute_name || c.instituteName || "Tech Elevate Academy",
          category_name: c.category_name || c.categoryName || "Web Development",
          rating: c.rating || 4.8,
          reviews_count: c.reviews_count || 42,
          thumbnail: c.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
        }));
        setCatalogCourses(loadedCatalog);
      }
    } catch (e) {
      console.warn("Catalog fetch fallback");
    }

    try {
      const rawEnrollments = await studentService.getEnrolledCourses();
      if (Array.isArray(rawEnrollments)) {
        const enriched = rawEnrollments.map((item) => {
          const cId = item.courseId || item.course_id;
          const foundCourse = loadedCatalog.find((c) => (c.course_id || c.courseId) === cId) || item.course || {};
          return {
            ...item,
            enrollment_id: item.enrollmentId || item.enrollment_id || item.id,
            student_user_id: item.studentUserId || item.student_user_id,
            course_id: cId,
            status: item.status || "active",
            progress: item.progress || 0,
            course: {
              title: foundCourse.title || "Course #" + cId,
              description: foundCourse.description || "",
              image: foundCourse.thumbnail || foundCourse.image || "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=200&q=80",
              institute_name: foundCourse.institute_name || "Tech Elevate Academy",
            }
          };
        });
        setEnrollments(enriched);
      }
    } catch (e) {
      console.warn("Enrollments fetch fallback", e);
    }

    try {
      const certsData = await studentService.getCertificates();
      setCertificates((certsData && certsData.length > 0) ? certsData : []);
    } catch (e) {
      console.warn("Certs fetch fallback");
    }

    try {
      const institutesData = await studentService.getInstitutes();
      setInstitutes(institutesData || []);
    } catch (e) {
      console.warn("Institutes fetch fallback");
    }

    setCategories(studentService.getCategories());
  };

  // Filter Courses Handler
  useEffect(() => {
    fetchFilteredCatalog();
  }, [selectedCategory, searchQuery, priceFilter]);

  useEffect(() => {
    if (location.state?.enrollCourseId && catalogCourses.length > 0) {
      const targetCourse = catalogCourses.find(
        (c) => (c.course_id || c.id) === location.state.enrollCourseId
      );
      if (targetCourse) {
        setActiveSection("browse");
        setSelectedCourseForEnroll(targetCourse);
      }
    }
  }, [location.state, catalogCourses]);

  const fetchFilteredCatalog = async () => {
    setCoursePage(1); // Reset page on filter change
    const filters = {
      category: selectedCategory,
      search: searchQuery,
    };
    if (priceFilter === "free") filters.maxPrice = 0;
    if (priceFilter === "under1500") filters.maxPrice = 1500;
    if (priceFilter === "above1500") filters.minPrice = 1501;

    const data = await studentService.getBrowseCatalog(filters);
    setCatalogCourses(data);
  };

  // User Initials helper
  const getInitials = (name) => {
    if (!name) return "JM";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  };

  // Logout Handler
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Pagination Calculations
  const totalCoursePages = Math.ceil(catalogCourses.length / itemsPerPage) || 1;
  const currentCourses = catalogCourses.slice((coursePage - 1) * itemsPerPage, coursePage * itemsPerPage);

  const totalInstitutePages = Math.ceil(institutes.length / 4) || 1;
  const currentInstitutes = institutes.slice((institutePage - 1) * 4, institutePage * 4);

  // Handle Enrollment Payment Submission
  const handleProcessEnrollment = async (e) => {
    e.preventDefault();
    if (!selectedCourseForEnroll) return;

    try {
      const res = await studentService.processEnrollmentAndPayment({
        studentUserId: authUser?.user_id || profile.user_id,
        course: selectedCourseForEnroll,
        paymentMethod: paymentMethod,
      });

      showToast(`Success! Enrolled in "${selectedCourseForEnroll.title}".`, "success");
      setSelectedCourseForEnroll(null);
      loadStudentData();
    } catch (err) {
      showToast(err.message || "Enrollment failed. Please try again.", "error");
    }
  };

  // Handle Review Submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourseForReview) return;

    try {
      await studentService.submitReview({
        enrollmentId: selectedCourseForReview.enrollment_id,
        rating: reviewRating,
        comment: reviewComment,
        studentUserId: authUser?.user_id || profile.user_id,
      });

      showToast("Thank you! Review submitted successfully.", "success");
      setSelectedCourseForReview(null);
      setReviewComment("");
      setReviewRating(5);
      loadStudentData();
    } catch (err) {
      showToast("Failed to submit review.", "error");
    }
  };

  // Open Edit Profile Modal
  const handleOpenEditModal = () => {
    setEditProfileForm({
      name: profile?.name || authUser?.name || "",
      mobile: profile?.mobile || "",
      date_of_birth: profile?.date_of_birth || "",
      gender: profile?.gender || "Male",
      college_name: profile?.college_name || "",
      degree: profile?.degree || "",
      city: profile?.city || "",
    });
    setShowEditProfileModal(true);
  };

  // Open Change Password Modal
  const handleOpenPasswordModal = () => {
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowChangePasswordModal(true);
  };

  // Handle Profile Save
  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const updated = await studentService.updateStudentProfile(editProfileForm, authUser?.user_id);
      setProfile(updated);
      setEditProfileForm(updated);
      setShowEditProfileModal(false);
      showToast("Profile updated successfully!", "success");
    } catch (err) {
      showToast("Failed to update profile.", "error");
    }
  };

  // Handle Password Save
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
      await studentService.changePassword(passwordForm);
      setShowChangePasswordModal(false);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showToast("Password changed successfully!", "success");
    } catch (err) {
      showToast("Failed to update password.", "error");
    }
  };

  return (
    <div className="student-dashboard-container">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <div
            className={`toast show align-items-center text-white border-0 p-2 shadow-lg ${toastMessage.type === "error" ? "bg-danger" : "bg-success"
              }`}
            style={{ borderRadius: "14px" }}
          >
            <div className="d-flex align-items-center">
              <div className="toast-body fw-bold">{toastMessage.text}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToastMessage(null)}
              ></button>
            </div>
          </div>
        </div>
      )}

      <div className="sd-layout">
        {/* SIDEBAR */}
        <aside className="sd-sidebar">
          <div>
            <div className="sd-brand">
              <div className="sd-brand-icon">E</div>
              <span className="sd-brand-title">EduHub</span>
            </div>

            <ul className="sd-nav">
              <li
                className={`sd-nav-item ${activeSection === "dashboard" ? "active" : ""}`}
                onClick={() => setActiveSection("dashboard")}
              >
                <FiGrid className="sd-icon" />
                <span className="sd-nav-text">Dashboard</span>
              </li>

              <li
                className={`sd-nav-item ${activeSection === "courses" ? "active" : ""}`}
                onClick={() => setActiveSection("courses")}
              >
                <FiBookOpen className="sd-icon" />
                <span className="sd-nav-text">My courses</span>
              </li>

              <li
                className={`sd-nav-item ${activeSection === "browse" ? "active" : ""}`}
                onClick={() => setActiveSection("browse")}
              >
                <FiCompass className="sd-icon" />
                <span className="sd-nav-text">Browse</span>
              </li>

              <li
                className={`sd-nav-item ${activeSection === "certificates" ? "active" : ""}`}
                onClick={() => setActiveSection("certificates")}
              >
                <FiAward className="sd-icon" />
                <span className="sd-nav-text">Certificates</span>
              </li>

              <li
                className={`sd-nav-item ${activeSection === "profile" ? "active" : ""}`}
                onClick={() => setActiveSection("profile")}
              >
                <FiUser className="sd-icon" />
                <span className="sd-nav-text">Profile</span>
              </li>
            </ul>
          </div>

          <div
            className="sd-user-footer"
            style={{ cursor: "pointer" }}
            onClick={() => setActiveSection("profile")}
            title="Click to view profile"
          >
            <div className="sd-avatar sd-avatar-clickable">{getInitials(profile.name)}</div>
            <div className="sd-user-info">
              <div className="sd-user-name">{profile.name}</div>
              <div className="sd-user-role">Student Account</div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="sd-main">
          {/* Header Bar */}
          <header className="sd-header">
            <div className="sd-search-box">
              <FiSearch className="sd-search-icon" />
              <input
                type="text"
                className="sd-search-input"
                placeholder="Search courses, institutes..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeSection !== "browse") setActiveSection("browse");
                }}
              />
            </div>

            <div className="sd-header-actions">
              {/* Interactive Notifications Dropdown */}
              <div className="sd-notify-wrapper">
                <button
                  className="sd-notify-btn"
                  title="Notifications"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <FiBell />
                  {unreadCount > 0 && <span className="sd-badge-dot"></span>}
                </button>

                {showNotifications && (
                  <div className="sd-notifications-dropdown">
                    <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                      <h6 className="fw-bold m-0 fs-6">Notifications ({notifications.length})</h6>
                      {unreadCount > 0 && (
                        <button
                          className="btn btn-link btn-sm p-0 text-primary text-decoration-none fw-bold fs-8"
                          onClick={markAllNotificationsRead}
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="d-flex flex-column">
                      {notifications.map((n) => (
                        <div key={n.id} className="sd-notify-item">
                          {!n.read && <div className="sd-notify-unread-dot"></div>}
                          <div className="flex-grow-1">
                            <div className="fw-bold fs-7 text-dark">{n.title}</div>
                            <div className="text-secondary fs-8">{n.message}</div>
                            <div className="text-muted fs-9 mt-1">{n.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Clickable Header Avatar -> Navigates to Profile */}
              <div
                className="sd-avatar sd-avatar-clickable"
                style={{ width: 38, height: 38, fontSize: "0.85rem" }}
                onClick={() => setActiveSection("profile")}
                title="Click to view profile"
              >
                {getInitials(profile.name)}
              </div>
            </div>
          </header>

          {/* Body Content */}
          <div className="sd-body">
            {/* 1. DASHBOARD VIEW */}
            {activeSection === "dashboard" && (
              <div>
                <div className="sd-welcome-banner">
                  <h1 className="sd-welcome-title">
                    Welcome back, {profile.name.split(" ")[0]} 👋
                  </h1>
                  <p className="sd-welcome-sub">Here's where your courses stand today.</p>

                  <div className="sd-pills-row">
                    <div className="sd-banner-pill">
                      <FiBookOpen /> {enrollments.filter((e) => e.progress < 100).length} Courses in progress
                    </div>
                    <div className="sd-banner-pill">
                      <FiAward /> {certificates.length} Certificates earned
                    </div>
                  </div>
                </div>

                <div className="row g-4">
                  <div className="col-lg-7">
                    <div className="sd-card">
                      <h3 className="sd-section-title">Continue Learning</h3>

                      <div className="d-flex flex-column gap-2">
                        {enrollments.length === 0 ? (
                          <div className="text-center py-4 text-muted">
                            <p>No active courses yet. Browse catalog to enroll!</p>
                            <button
                              className="sd-btn-resume style-auto w-auto px-4"
                              onClick={() => setActiveSection("browse")}
                            >
                              Explore Courses
                            </button>
                          </div>
                        ) : (
                          enrollments.slice(0, 3).map((item) => (
                            <div key={item.enrollment_id} className="sd-course-item">
                              <img
                                src={item.course?.image || "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=200&q=80"}
                                alt={item.course?.title}
                                className="sd-course-thumb-sm"
                              />
                              <div className="sd-course-info">
                                <div className="sd-course-title">{item.course?.title}</div>
                                <div className="sd-progress-bar-bg">
                                  <div
                                    className="sd-progress-fill"
                                    style={{
                                      width: `${item.progress}%`,
                                      backgroundColor:
                                        item.progress > 50
                                          ? "#5d4efd"
                                          : item.progress > 20
                                            ? "#0284c7"
                                            : "#ea580c",
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div className="sd-progress-percent">{item.progress}%</div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="sd-card">
                      <h3 className="sd-section-title">Recent Activity</h3>

                      <div className="d-flex flex-column gap-2">
                        {activities.map((act) => (
                          <div key={act.id} className="sd-activity-item">
                            <div
                              className={`sd-activity-icon ${act.type === "lesson" || act.type === "enrollment"
                                  ? "sd-act-check"
                                  : act.type === "review"
                                    ? "sd-act-star"
                                    : "sd-act-cert"
                                }`}
                            >
                              {act.type === "lesson" || act.type === "enrollment" ? (
                                <FiCheckCircle />
                              ) : act.type === "review" ? (
                                <FiStar />
                              ) : (
                                <FiAward />
                              )}
                            </div>
                            <div>
                              <div className="sd-act-title">{act.title}</div>
                              <div className="sd-act-time">{act.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. MY COURSES VIEW */}
            {activeSection === "courses" && (
              <div>
                <h2 className="sd-section-title fs-3 mb-4">My Courses</h2>

                {enrollments.length === 0 ? (
                  <div className="sd-card text-center py-5">
                    <FiBookOpen size={48} className="text-muted mb-3" />
                    <h4>You haven't enrolled in any courses yet</h4>
                    <p className="text-muted">Explore our catalog and boost your skills today.</p>
                    <button
                      className="sd-btn-resume mt-2"
                      style={{ width: "auto" }}
                      onClick={() => setActiveSection("browse")}
                    >
                      Browse Available Courses
                    </button>
                  </div>
                ) : (
                  <div className="sd-courses-grid">
                    {enrollments.map((item) => (
                      <div key={item.enrollment_id} className="sd-course-card">
                        <div className="sd-card-head">
                          <img
                            src={item.course?.image || "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=200&q=80"}
                            alt={item.course?.title}
                            className="sd-course-thumb-sm"
                            style={{ width: 60, height: 60, borderRadius: 16 }}
                          />
                          <div>
                            <h4 className="sd-course-title fs-6 m-0">{item.course?.title}</h4>
                            <span className="sd-badge-in-progress">Offline Batch Active</span>
                            <div className="text-muted fs-8 mt-1">
                              📍 {item.course?.institute_name} ({item.course?.institute_address || "Classroom"})
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="d-flex justify-content-between fs-6 fw-bold mb-2">
                            <span className="text-muted">Classroom Attendance / Progress</span>
                            <span style={{ color: "#5d4efd" }}>{item.progress}%</span>
                          </div>
                          <div className="sd-progress-bar-bg">
                            <div
                              className="sd-progress-fill"
                              style={{
                                width: `${item.progress}%`,
                                backgroundColor: "#5d4efd",
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="d-flex flex-column gap-2">
                          <button
                            className="sd-btn-resume"
                            onClick={() => showToast(`Batch Timetable: Mon-Fri 10:00 AM - 1:00 PM at ${item.course?.institute_name}`)}
                          >
                            View Batch Schedule
                          </button>

                          <div className="d-flex gap-2">
                            <button
                              className="sd-btn-outline flex-grow-1"
                              onClick={() => setSelectedCourseForMaterials(item.course)}
                            >
                              <FiDownloadCloud className="me-1" /> Syllabus & Notes
                            </button>
                            <button
                              className="sd-btn-outline flex-grow-1"
                              onClick={() => setSelectedCourseForReview(item)}
                            >
                              <FiStar className="me-1" /> Review
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. BROWSE CATALOG & INSTITUTES VIEW */}
            {activeSection === "browse" && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                  <h2 className="sd-section-title fs-3 m-0">Browse Catalog</h2>

                  <div className="sd-search-box" style={{ width: 280 }}>
                    <FiSearch className="sd-search-icon" />
                    <input
                      type="text"
                      className="sd-search-input"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Sub Tab Buttons: Courses vs Institutes */}
                <div className="d-flex gap-3 mb-4">
                  <button
                    className={`btn ${browseTab === "courses" ? "btn-primary fw-bold" : "btn-light text-muted"}`}
                    style={{
                      borderRadius: 20,
                      backgroundColor: browseTab === "courses" ? "#5d4efd" : "#f1f5f9",
                      borderColor: "transparent",
                    }}
                    onClick={() => setBrowseTab("courses")}
                  >
                    Courses ({catalogCourses.length})
                  </button>
                  <button
                    className={`btn ${browseTab === "institutes" ? "btn-primary fw-bold" : "btn-light text-muted"}`}
                    style={{
                      borderRadius: 20,
                      backgroundColor: browseTab === "institutes" ? "#5d4efd" : "#f1f5f9",
                      borderColor: "transparent",
                    }}
                    onClick={() => setBrowseTab("institutes")}
                  >
                    Institutes ({institutes.length})
                  </button>
                </div>

                {/* COURSES TAB */}
                {browseTab === "courses" && (
                  <>
                    <div className="sd-filter-pills">
                      <button
                        className={`sd-filter-pill ${selectedCategory === "All" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("All")}
                      >
                        All
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.category_id}
                          className={`sd-filter-pill ${selectedCategory === cat.category_name ? "active" : ""
                            }`}
                          onClick={() => setSelectedCategory(cat.category_name)}
                        >
                          {cat.category_name}
                        </button>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <p className="text-muted m-0 fw-semibold">
                        Showing {currentCourses.length} of {catalogCourses.length} courses
                      </p>

                      <div className="d-flex align-items-center gap-2">
                        <FiFilter className="text-muted" />
                        <select
                          className="form-select form-select-sm border-0 bg-white shadow-sm"
                          style={{ borderRadius: 12, width: 140 }}
                          value={priceFilter}
                          onChange={(e) => setPriceFilter(e.target.value)}
                        >
                          <option value="all">All Prices</option>
                          <option value="under1500">Under ₹1,500</option>
                          <option value="above1500">Above ₹1,500</option>
                        </select>
                      </div>
                    </div>

                    {/* Courses Cards Grid with Real Cover Images */}
                    <div className="sd-courses-grid">
                      {currentCourses.map((course) => (
                        <div key={course.course_id} className="sd-catalog-card">
                          <div className="sd-catalog-img-wrap">
                            <img
                              src={course.image || "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80"}
                              alt={course.title}
                              className="sd-catalog-img"
                            />
                            <span className="sd-catalog-category-badge">{course.category_name}</span>
                          </div>

                          <div className="sd-catalog-body">
                            <div>
                              <h4 className="sd-catalog-title">{course.title}</h4>
                              <div className="sd-catalog-meta">
                                <span>⭐ {course.rating} ({course.reviews_count || 0})</span>
                                <span>👥 {course.enrolled_students_count || 500}+ Enrolled</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted fs-7">{course.institute_name}</span>
                                <span className="fw-extrabold text-primary fs-5">₹{course.price}</span>
                              </div>
                            </div>

                            <div className="d-flex gap-2">
                              {isEnrolled(course.course_id) ? (
                                <button
                                  className="sd-btn-outline flex-grow-1 bg-success-subtle text-success border-success fw-bold"
                                  onClick={() => setActiveSection("courses")}
                                >
                                  Enrolled ✓
                                </button>
                              ) : (
                                <button
                                  className="sd-btn-enroll flex-grow-1"
                                  onClick={() => setSelectedCourseForEnroll(course)}
                                >
                                  Enroll Now
                                </button>
                              )}
                              <button
                                className="sd-btn-outline"
                                onClick={() => {
                                  setSelectedCourseDetail(course);
                                  setDetailTab("syllabus");
                                }}
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Course Pagination Controls */}
                    {totalCoursePages > 1 && (
                      <div className="sd-pagination-container">
                        <button
                          className="sd-pagination-btn"
                          disabled={coursePage === 1}
                          onClick={() => setCoursePage((p) => p - 1)}
                        >
                          <FiChevronLeft /> Previous
                        </button>
                        <div className="sd-pagination-page-pill">
                          Page {coursePage} of {totalCoursePages}
                        </div>
                        <button
                          className="sd-pagination-btn"
                          disabled={coursePage === totalCoursePages}
                          onClick={() => setCoursePage((p) => p + 1)}
                        >
                          Next <FiChevronRight />
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* INSTITUTES TAB */}
                {browseTab === "institutes" && (
                  <>
                    <div className="row g-4">
                      {currentInstitutes.map((inst) => (
                        <div key={inst.institute_profile_id} className="col-md-6">
                          <div className="sd-card">
                            <div className="d-flex align-items-center gap-3 mb-3">
                              <img
                                src={inst.logo}
                                alt={inst.name}
                                style={{ width: 56, height: 56, borderRadius: 14, objectFit: "cover" }}
                              />
                              <div className="flex-grow-1">
                                <h4 className="fw-bold m-0 fs-5">{inst.name}</h4>
                                <p className="text-muted fs-7 m-0">{inst.address}</p>
                              </div>
                              <span className="badge bg-warning text-dark fs-7">⭐ {inst.rating}</span>
                            </div>

                            <p className="text-secondary fs-7 mb-3">{inst.description}</p>

                            <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                              <span className="text-muted fs-7">
                                <FiBook className="me-1" /> {inst.courses_count} Active Courses
                              </span>
                              <span className="text-primary fw-bold fs-7">GST: {inst.gstin}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Institute Pagination Controls */}
                    {totalInstitutePages > 1 && (
                      <div className="sd-pagination-container">
                        <button
                          className="sd-pagination-btn"
                          disabled={institutePage === 1}
                          onClick={() => setInstitutePage((p) => p - 1)}
                        >
                          <FiChevronLeft /> Previous
                        </button>
                        <div className="sd-pagination-page-pill">
                          Page {institutePage} of {totalInstitutePages}
                        </div>
                        <button
                          className="sd-pagination-btn"
                          disabled={institutePage === totalInstitutePages}
                          onClick={() => setInstitutePage((p) => p + 1)}
                        >
                          Next <FiChevronRight />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* 4. CERTIFICATES VIEW */}
            {activeSection === "certificates" && (
              <div>
                <h2 className="sd-section-title fs-3 mb-4">My Certificates</h2>

                {certificates.length === 0 ? (
                  <div className="sd-card text-center py-5">
                    <FiAward size={48} className="text-muted mb-3" />
                    <h4>No Certificates Earned Yet</h4>
                    <p className="text-muted">Complete your active courses to earn verified certificates!</p>
                  </div>
                ) : (
                  <div className="d-flex flex-wrap gap-4">
                    {certificates.map((cert) => (
                      <div key={cert.certificate_id} className="sd-cert-card">
                        <div className="sd-cert-header">
                          <FiAward />
                        </div>
                        <div className="sd-cert-body">
                          <h4 className="sd-cert-title">{cert.title}</h4>
                          <div className="sd-cert-date">Issued {cert.issue_date}</div>

                          <button
                            className="sd-btn-download"
                            onClick={() => showToast(`Downloading verified certificate for "${cert.title}"...`)}
                          >
                            <FiDownload /> Download PDF
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. PROFILE VIEW */}
            {activeSection === "profile" && (
              <div>
                <h2 className="sd-section-title fs-3 mb-4">Student Profile</h2>

                <div className="sd-profile-card">
                  <div className="sd-profile-head">
                    <div className="d-flex align-items-center gap-3">
                      <div className="sd-profile-avatar-xl">{getInitials(profile.name)}</div>
                      <div>
                        <h3 className="fw-bold m-0">{profile.name}</h3>
                        <p className="text-muted m-0">{profile.email}</p>
                      </div>
                    </div>

                    <button
                      className="sd-btn-outline"
                      onClick={handleOpenEditModal}
                    >
                      <FiEdit3 className="me-1" /> Edit profile
                    </button>
                  </div>

                  <div className="sd-profile-grid">
                    <div className="sd-info-box">
                      <FiCalendar className="sd-info-icon" />
                      <div>
                        <div className="sd-info-label">Date of Birth</div>
                        <div className="sd-info-val">{profile.date_of_birth || "14 March 2001"}</div>
                      </div>
                    </div>

                    <div className="sd-info-box">
                      <FiUser className="sd-info-icon" />
                      <div>
                        <div className="sd-info-label">Gender</div>
                        <div className="sd-info-val">{profile.gender || "Male"}</div>
                      </div>
                    </div>

                    <div className="sd-info-box">
                      <FiPhone className="sd-info-icon" />
                      <div>
                        <div className="sd-info-label">Mobile</div>
                        <div className="sd-info-val">{profile.mobile || "+91 98765 43210"}</div>
                      </div>
                    </div>

                    <div className="sd-info-box">
                      <FiBook className="sd-info-icon" />
                      <div>
                        <div className="sd-info-label">College Name</div>
                        <div className="sd-info-val">{profile.college_name || "DTU, New Delhi"}</div>
                      </div>
                    </div>

                    <div className="sd-info-box">
                      <FiAward className="sd-info-icon" />
                      <div>
                        <div className="sd-info-label">Degree</div>
                        <div className="sd-info-val">{profile.degree || "B.Tech, Computer Science"}</div>
                      </div>
                    </div>

                    <div className="sd-info-box">
                      <FiMapPin className="sd-info-icon" />
                      <div>
                        <div className="sd-info-label">City</div>
                        <div className="sd-info-val">{profile.city || "New Delhi"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                    <button
                      className="sd-btn-outline"
                      onClick={handleOpenPasswordModal}
                    >
                      <FiLock className="me-1" /> Change Password
                    </button>

                    <button className="sd-btn-logout-red" onClick={handleLogout}>
                      <FiLogOut /> Log Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* --- RICH COMPREHENSIVE COURSE DETAILS MODAL --- */}
      {selectedCourseDetail && (
        <div className="sd-modal-backdrop">
          <div className="sd-modal-content">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0">{selectedCourseDetail.title}</h4>
              <button
                className="btn-close"
                onClick={() => setSelectedCourseDetail(null)}
              ></button>
            </div>

            {/* Image Header */}
            <div className="sd-detail-img-wrap">
              <img
                src={selectedCourseDetail.image || "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80"}
                alt={selectedCourseDetail.title}
                className="sd-detail-img"
              />
            </div>

            {/* Quick Stats Bar */}
            <div className="sd-detail-stats-bar">
              <div className="sd-stat-item">
                <FiUsers className="text-primary" />
                <span>{selectedCourseDetail.enrolled_students_count || 1200}+ Enrolled</span>
              </div>
              <div className="sd-stat-item">
                <FiStar className="text-warning" />
                <span>{selectedCourseDetail.rating} ({selectedCourseDetail.reviews_count || 0} Reviews)</span>
              </div>
              <div className="sd-stat-item">
                <FiClock className="text-info" />
                <span>{selectedCourseDetail.duration}</span>
              </div>
              <div className="sd-stat-item text-primary fw-extrabold fs-5">
                ₹{selectedCourseDetail.price}
              </div>
            </div>

            {/* Modal Internal Navigation Tabs */}
            <div className="sd-detail-nav-tabs">
              <button
                className={`sd-detail-tab ${detailTab === "syllabus" ? "active" : ""}`}
                onClick={() => setDetailTab("syllabus")}
              >
                <FiLayers className="me-1" /> Syllabus ({selectedCourseDetail.syllabus?.length || 0})
              </button>
              <button
                className={`sd-detail-tab ${detailTab === "instructor" ? "active" : ""}`}
                onClick={() => setDetailTab("instructor")}
              >
                <FiInfo className="me-1" /> Instructor & Institute
              </button>
              <button
                className={`sd-detail-tab ${detailTab === "reviews" ? "active" : ""}`}
                onClick={() => setDetailTab("reviews")}
              >
                <FiMessageSquare className="me-1" /> Reviews ({selectedCourseDetail.reviews?.length || 0})
              </button>
            </div>

            {/* TAB 1: SYLLABUS & CURRICULUM */}
            {detailTab === "syllabus" && (
              <div className="mb-3">
                <p className="text-secondary fs-7 mb-3">{selectedCourseDetail.description}</p>
                <h5 className="fw-bold mb-3 fs-6">Course Modules & Curriculum</h5>
                {selectedCourseDetail.syllabus && selectedCourseDetail.syllabus.length > 0 ? (
                  selectedCourseDetail.syllabus.map((mod) => (
                    <div key={mod.module_number} className="sd-module-card">
                      <div className="sd-module-title">
                        Module {mod.module_number}: {mod.title}
                      </div>
                      {mod.topics &&
                        mod.topics.map((t, idx) => (
                          <div key={idx} className="sd-topic-item">
                            <FiCheck className="text-success" /> {t}
                          </div>
                        ))}
                    </div>
                  ))
                ) : (
                  <p className="text-muted fs-7">Syllabus breakdown will be provided upon enrollment.</p>
                )}
              </div>
            )}

            {/* TAB 2: INSTRUCTOR & INSTITUTE DETAILS (DB SCHEMA MAPPED) */}
            {detailTab === "instructor" && (
              <div className="mb-3">
                {/* Instructor Block */}
                <div className="p-3 bg-light rounded-3 mb-3">
                  <h6 className="text-uppercase text-muted fs-7 fw-bold mb-2">Instructor Profile</h6>
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="sd-avatar" style={{ width: 48, height: 48 }}>
                      {getInitials(selectedCourseDetail.instructor_name)}
                    </div>
                    <div>
                      <h5 className="fw-bold m-0 fs-6">{selectedCourseDetail.instructor_name}</h5>
                      <p className="text-primary fs-7 m-0 fw-semibold">
                        {selectedCourseDetail.instructor_specialization} ({selectedCourseDetail.instructor_experience} Years Exp.)
                      </p>
                    </div>
                  </div>
                  <p className="text-secondary fs-7 m-0">{selectedCourseDetail.instructor_bio}</p>
                </div>

                {/* Institute Block */}
                <div className="p-3 border rounded-3">
                  <h6 className="text-uppercase text-muted fs-7 fw-bold mb-2">Institute Information</h6>
                  <h5 className="fw-bold fs-6 m-0">{selectedCourseDetail.institute_name}</h5>
                  <p className="text-muted fs-7 mb-2">{selectedCourseDetail.institute_address}</p>
                  <span className="badge bg-success-subtle text-success fs-7">Verified Partner Institute</span>
                </div>
              </div>
            )}

            {/* TAB 3: REVIEWS & RATINGS */}
            {detailTab === "reviews" && (
              <div className="mb-3">
                <div className="d-flex align-items-center gap-3 p-3 bg-warning-subtle rounded-3 mb-3">
                  <div className="fs-2 fw-extrabold text-warning">⭐ {selectedCourseDetail.rating}</div>
                  <div>
                    <div className="fw-bold text-dark">Course Rating Breakdown</div>
                    <div className="text-muted fs-7">Based on verified student reviews</div>
                  </div>
                </div>

                {selectedCourseDetail.reviews && selectedCourseDetail.reviews.length > 0 ? (
                  selectedCourseDetail.reviews.map((rev) => (
                    <div key={rev.review_id} className="p-3 border-bottom">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold fs-7">{rev.student_name}</span>
                        <span className="text-warning fs-7">⭐ {rev.rating} / 5</span>
                      </div>
                      <p className="text-secondary fs-7 mb-1">{rev.comment}</p>
                      <span className="text-muted fs-8">{rev.created_at}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted fs-7 py-3 text-center">No student reviews submitted for this course yet.</p>
                )}
              </div>
            )}

            {isEnrolled(selectedCourseDetail.course_id) ? (
              <button
                className="sd-btn-outline w-100 mt-2 bg-success-subtle text-success border-success fw-bold py-2.5"
                onClick={() => {
                  setSelectedCourseDetail(null);
                  setActiveSection("courses");
                }}
              >
                Enrolled ✓ (View in My Courses)
              </button>
            ) : (
              <button
                className="sd-btn-resume w-100 mt-2"
                onClick={() => {
                  const c = selectedCourseDetail;
                  setSelectedCourseDetail(null);
                  setSelectedCourseForEnroll(c);
                }}
              >
                Enroll Now for ₹{selectedCourseDetail.price}
              </button>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL: PAYMENT & ENROLLMENT --- */}
      {selectedCourseForEnroll && (
        <div className="sd-modal-backdrop">
          <div className="sd-modal-content">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0">Course Checkout</h4>
              <button
                className="btn-close"
                onClick={() => setSelectedCourseForEnroll(null)}
              ></button>
            </div>

            <div className="p-3 bg-light rounded-3 mb-3">
              <h5 className="fw-bold text-dark m-0">{selectedCourseForEnroll.title}</h5>
              <p className="text-muted fs-7 mb-2">{selectedCourseForEnroll.institute_name}</p>
              <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                <span className="fw-bold text-muted">Total Amount:</span>
                <span className="fs-4 fw-extrabold text-primary">₹{selectedCourseForEnroll.price}</span>
              </div>
            </div>

            <form onSubmit={handleProcessEnrollment}>
              <div className="mb-3">
                <label className="form-label fw-bold fs-7">Select Payment Method</label>
                <div className="d-flex flex-column gap-2">
                  {["Credit Card / Debit Card", "UPI (Google Pay, PhonePe, Paytm)", "Net Banking"].map(
                    (method) => (
                      <label
                        key={method}
                        className={`d-flex align-items-center gap-2 p-2.5 border rounded-3 ${paymentMethod === method ? "border-primary bg-primary-subtle" : ""
                          }`}
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <FiCreditCard className="text-primary" />
                        <span className="fw-semibold fs-7">{method}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <button type="submit" className="sd-btn-resume w-100 py-3 mt-2">
                Complete Payment & Enroll
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: LEAVE REVIEW --- */}
      {selectedCourseForReview && (
        <div className="sd-modal-backdrop">
          <div className="sd-modal-content">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0">Leave Course Review</h4>
              <button
                className="btn-close"
                onClick={() => setSelectedCourseForReview(null)}
              ></button>
            </div>

            <p className="text-muted fs-7 mb-3">
              Rate your experience for <strong>{selectedCourseForReview.course?.title}</strong>
            </p>

            <form onSubmit={handleReviewSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold fs-7">Select Rating (1 to 5 Stars)</label>
                <div className="d-flex gap-2 fs-3 text-warning mb-2" style={{ cursor: "pointer" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      fill={star <= reviewRating ? "#f59e0b" : "none"}
                      onClick={() => setReviewRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold fs-7">Your Feedback Comment</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Share your thoughts about this course..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="sd-btn-resume w-100">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: STUDY MATERIALS --- */}
      {selectedCourseForMaterials && (
        <div className="sd-modal-backdrop">
          <div className="sd-modal-content">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0">Course Materials</h4>
              <button
                className="btn-close"
                onClick={() => setSelectedCourseForMaterials(null)}
              ></button>
            </div>

            <p className="text-muted fs-7 mb-3">
              Download study files for <strong>{selectedCourseForMaterials.title}</strong>
            </p>

            <div className="d-flex flex-column gap-2 mb-3">
              {selectedCourseForMaterials.materials && selectedCourseForMaterials.materials.length > 0 ? (
                selectedCourseForMaterials.materials.map((mat) => (
                  <div
                    key={mat.id}
                    className="p-3 border rounded-3 d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div className="fw-bold fs-7">{mat.title}</div>
                      <div className="text-muted fs-7">{mat.size}</div>
                    </div>
                    <button
                      className="sd-btn-outline btn-sm py-1 px-3"
                      onClick={() => showToast(`Downloading ${mat.title}...`)}
                    >
                      <FiDownload />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-muted py-3 text-center">No study materials uploaded for this course yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: EDIT PROFILE --- */}
      {showEditProfileModal && (
        <div className="sd-modal-backdrop">
          <div className="sd-modal-content" style={{ maxWidth: 540 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0">Edit Student Profile</h4>
              <button
                className="btn-close"
                onClick={() => setShowEditProfileModal(false)}
              ></button>
            </div>

            <form onSubmit={handleProfileSave}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fs-7 fw-bold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editProfileForm.name || ""}
                    onChange={(e) =>
                      setEditProfileForm({ ...editProfileForm, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fs-7 fw-bold">Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editProfileForm.mobile || ""}
                    onChange={(e) =>
                      setEditProfileForm({ ...editProfileForm, mobile: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fs-7 fw-bold">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={editProfileForm.date_of_birth || ""}
                    onChange={(e) =>
                      setEditProfileForm({ ...editProfileForm, date_of_birth: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fs-7 fw-bold">Gender</label>
                  <select
                    className="form-select"
                    value={editProfileForm.gender || "Male"}
                    onChange={(e) =>
                      setEditProfileForm({ ...editProfileForm, gender: e.target.value })
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fs-7 fw-bold">College Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editProfileForm.college_name || ""}
                    onChange={(e) =>
                      setEditProfileForm({ ...editProfileForm, college_name: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fs-7 fw-bold">Degree</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editProfileForm.degree || ""}
                    onChange={(e) =>
                      setEditProfileForm({ ...editProfileForm, degree: e.target.value })
                    }
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fs-7 fw-bold">City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editProfileForm.city || ""}
                    onChange={(e) =>
                      setEditProfileForm({ ...editProfileForm, city: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mt-4">
                <button type="submit" className="sd-btn-resume w-100">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: CHANGE PASSWORD --- */}
      {showChangePasswordModal && (
        <div className="sd-modal-backdrop">
          <div className="sd-modal-content">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0">Change Password</h4>
              <button
                className="btn-close"
                onClick={() => setShowChangePasswordModal(false)}
              ></button>
            </div>

            <form onSubmit={handlePasswordSave}>
              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordForm.currentPassword || ""}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordForm.newPassword || ""}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordForm.confirmPassword || ""}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>

              <button type="submit" className="sd-btn-resume w-100 mt-2">
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Missing icon helper definition inside file
function FiClock(props) {
  return (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="1em" width="1em" {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}

export default StudentDashboard;