import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { instituteService } from "../services/instituteService";
import api from "../services/api";
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
    name: authUser?.name || "Institute",
    email: authUser?.email || "",
    address: "",
    gstin: "",
    contact_no: "",
    description: "",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80",
    approval_status: "approved",
  });

  const [summaryData, setSummaryData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);

  // Search Filters & Pagination
  const [globalSearch, setGlobalSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [courseCategoryFilter, setCourseCategoryFilter] = useState("");
  const [courseStatusFilter, setCourseStatusFilter] = useState("");
  const [courseCurrentPage, setCourseCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  // Modal States
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showManageCourseModal, setShowManageCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [showAddInstructorModal, setShowAddInstructorModal] = useState(false);
  const [showEditInstructorModal, setShowEditInstructorModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [instructorSearch, setInstructorSearch] = useState("");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showUploadDocModal, setShowUploadDocModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Admin Notifications (Empty by default, fetched if API exists)
  const [notifications, setNotifications] = useState([]);

  // Forms
  const [newCourseForm, setNewCourseForm] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    instructorId: "",
    instructor_name: "",
    categoryId: "",
    category: "",
    status: "pending",
    thumbnail: "",
  });

  const [newInstructorForm, setNewInstructorForm] = useState({
    name: "",
    specialization: "",
    experience: 5,
    bio: "",
    photo: "",
  });

  const [editInstructorForm, setEditInstructorForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    bio: "",
    photo: "",
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

  useEffect(() => {
    loadDashboardData();
  }, [authUser?.user_id, authUser?.email]);

  useEffect(() => {
    if (showAddCourseModal) {
      instituteService.getCategories().then((cats) => {
        setCategories(cats || []);
      }).catch(() => {});
      instituteService.getInstructors().then((inst) => {
        setInstructors(inst || []);
      }).catch(() => {});
    }
  }, [showAddCourseModal]);

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

    try {
      const cats = await instituteService.getCategories();
      setCategories(cats || []);
    } catch (e) {
      console.warn("Categories fetch fallback");
    }
  };

  const showToast = (text, type = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (e) {
      console.error("Logout error", e);
    }
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

  const getDefaultThumbnailByCategory = (categoryName) => {
    const cat = (categoryName || "").toLowerCase();
    if (cat.includes("web") || cat.includes("program") || cat.includes("develop") || cat.includes("cod") || cat.includes("software")) {
      return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80";
    }
    if (cat.includes("data") || cat.includes("ai") || cat.includes("machine") || cat.includes("analytic") || cat.includes("science")) {
      return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80";
    }
    if (cat.includes("cloud") || cat.includes("devops") || cat.includes("network") || cat.includes("security") || cat.includes("cyber")) {
      return "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80";
    }
    if (cat.includes("design") || cat.includes("ui") || cat.includes("ux") || cat.includes("graphic") || cat.includes("art")) {
      return "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80";
    }
    if (cat.includes("business") || cat.includes("finance") || cat.includes("market") || cat.includes("manage") || cat.includes("seo")) {
      return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80";
    }
    if (cat.includes("photo") || cat.includes("video") || cat.includes("media") || cat.includes("music")) {
      return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80";
    }
    return "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80";
  };

  // Handlers for Course Operations
  const handleCreateCourseSubmit = async (e) => {
    e.preventDefault();

    // Validation Checks
    if (!newCourseForm.title || !newCourseForm.title.trim()) {
      showToast("Validation failure: Course Title is empty!", "error");
      return;
    }
    const parsedPrice = parseFloat(newCourseForm.price);
    if (!newCourseForm.price || isNaN(parsedPrice) || parsedPrice <= 0) {
      showToast("Validation failure: Price is invalid!", "error");
      return;
    }
    if (!newCourseForm.categoryId) {
      showToast("Validation failure: Category not selected!", "error");
      return;
    }
    if (!newCourseForm.duration || !newCourseForm.duration.trim()) {
      showToast("Validation failure: Duration is missing!", "error");
      return;
    }

    let selectedInstructorId = newCourseForm.instructorId;
    if (selectedInstructorId === "" || selectedInstructorId === null || selectedInstructorId === undefined) {
      if (instructors.length > 0) {
        selectedInstructorId = instructors[0].instructorId || instructors[0].instructor_id || instructors[0].id;
      } else {
        selectedInstructorId = 0; // Fallback to Default Instructor
      }
    }
    if (selectedInstructorId === "" || selectedInstructorId === null || selectedInstructorId === undefined) {
      showToast("Validation failure: Please select an Instructor!", "error");
      return;
    }

    try {
      const resolvedThumbnail = (newCourseForm.thumbnail && newCourseForm.thumbnail.trim() !== "")
        ? newCourseForm.thumbnail.trim()
        : getDefaultThumbnailByCategory(newCourseForm.category);

      const payload = {
        title: newCourseForm.title.trim(),
        description: newCourseForm.description ? newCourseForm.description.trim() : "",
        price: parsedPrice,
        duration: newCourseForm.duration.trim(),
        instructorId: parseInt(selectedInstructorId),
        categoryId: parseInt(newCourseForm.categoryId),
        category: newCourseForm.category,
        categoryName: newCourseForm.category,
        thumbnail: resolvedThumbnail,
      };

      // Do not show a success message unless the database transaction completes successfully
      const created = await instituteService.createCourse(payload);

      const updatedCourses = await instituteService.getCourses();
      setCourses(updatedCourses && updatedCourses.length > 0 ? updatedCourses : [created, ...courses]);
      setShowAddCourseModal(false);
      setNewCourseForm({
        title: "",
        description: "",
        price: "",
        duration: "",
        instructorId: "",
        instructor_name: "",
        categoryId: "",
        category: "",
        status: "pending",
        thumbnail: "",
      });
      // Automatically redirect to Institute Dashboard -> Courses
      setActiveSection("courses");
      showToast("Course Created Successfully", "success");
      loadDashboardData();
    } catch (err) {
      console.error("Course creation error:", err);
      let errorMsg = err.message || "Server error: Failed to process request.";
      if (typeof err.response?.data === "string" && err.response.data) {
        errorMsg = err.response.data;
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      }

      if (errorMsg.toLowerCase().includes("duplicate")) {
        showToast("Duplicate course: A course with this title already exists in your institute.", "error");
      } else if (errorMsg.toLowerCase().includes("validation")) {
        showToast(`Validation failure: ${errorMsg}`, "error");
      } else if (errorMsg.toLowerCase().includes("database") || errorMsg.toLowerCase().includes("sql") || errorMsg.toLowerCase().includes("insert")) {
        showToast("Database insert failure: Could not save course to MySQL database.", "error");
      } else {
        showToast(`Server error: ${errorMsg}`, "error");
      }
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
      loadDashboardData();
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
        loadDashboardData();
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
      await instituteService.addInstructor({
        ...newInstructorForm,
        experience: Number(newInstructorForm.experience || 0),
        photo: (newInstructorForm.photo && newInstructorForm.photo.trim() !== "") ? newInstructorForm.photo.trim() : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      });
      showToast("Instructor added successfully!", "success");
      setShowAddInstructorModal(false);
      setNewInstructorForm({ name: "", specialization: "", experience: 5, bio: "", photo: "" });
      loadDashboardData();
    } catch (err) {
      console.error("Add instructor failure:", err);
      const errorMsg = err?.response?.data?.message || (typeof err?.response?.data === 'string' ? err.response.data : null) || err?.message || "Failed to add instructor.";
      showToast(errorMsg, "error");
    }
  };

  const handleEditInstructorClick = (inst) => {
    setSelectedInstructor(inst);
    setEditInstructorForm({
      name: inst.name || "",
      specialization: inst.specialization || "",
      experience: inst.experience !== undefined && inst.experience !== null ? inst.experience : 0,
      bio: inst.bio || "",
      photo: inst.photo || "",
    });
    setShowEditInstructorModal(true);
  };

  const handleEditInstructorSubmit = async (e) => {
    e.preventDefault();
    if (!editInstructorForm.name || !editInstructorForm.specialization) {
      showToast("Please enter name and specialization!", "error");
      return;
    }
    try {
      const id = selectedInstructor?.instructorId || selectedInstructor?.instructor_id || selectedInstructor?.id;
      await instituteService.updateInstructor(id, {
        ...editInstructorForm,
        experience: Number(editInstructorForm.experience || 0),
      });
      showToast("Instructor updated successfully!", "success");
      setShowEditInstructorModal(false);
      setSelectedInstructor(null);
      loadDashboardData();
    } catch (err) {
      showToast("Failed to update instructor.", "error");
    }
  };

  const handleDeleteInstructorClick = async (inst) => {
    if (window.confirm(`Are you sure you want to remove instructor ${inst.name}?`)) {
      try {
        const id = inst.instructorId || inst.instructor_id || inst.id;
        await instituteService.deleteInstructor(id);
        showToast("Instructor deleted successfully!", "success");
        loadDashboardData();
      } catch (err) {
        showToast("Failed to delete instructor.", "error");
      }
    }
  };

  // Filtered Courses & Students
  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      (c.title || "").toLowerCase().includes((courseSearch || globalSearch).toLowerCase()) ||
      (c.category || "").toLowerCase().includes((courseSearch || globalSearch).toLowerCase());
    const matchesCategory = !courseCategoryFilter || (c.category || "").toLowerCase() === courseCategoryFilter.toLowerCase();
    const matchesStatus = !courseStatusFilter || (c.status || "").toLowerCase() === courseStatusFilter.toLowerCase() || (c.approval_status || "").toLowerCase() === courseStatusFilter.toLowerCase();
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const indexOfLastCourse = courseCurrentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalCoursePages = Math.ceil(filteredCourses.length / coursesPerPage) || 1;

  const filteredStudents = students.filter(
    (s) =>
      (s.name || "").toLowerCase().includes((studentSearch || globalSearch).toLowerCase()) ||
      (s.course || "").toLowerCase().includes((studentSearch || globalSearch).toLowerCase()) ||
      (s.email || "").toLowerCase().includes((studentSearch || globalSearch).toLowerCase())
  );

  const filteredInstructors = instructors.filter((inst) => {
    const query = (instructorSearch || globalSearch).toLowerCase();
    return (
      (inst.name || "").toLowerCase().includes(query) ||
      (inst.specialization || "").toLowerCase().includes(query) ||
      (inst.bio || "").toLowerCase().includes(query) ||
      String(inst.experience || "").includes(query)
    );
  });

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
            <li className={`id-nav-item ${activeSection === "instructors" ? "active" : ""}`} onClick={() => setActiveSection("instructors")}>
              <FiBriefcase /> <span className="id-nav-text">Instructor</span>
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
          <div className="id-search-box-removed" style={{ flex: 1 }}></div>
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
              </div>

              {/* 4 Stat Cards */}
              <div className="id-stats-grid">
                <div className="id-stat-card">
                  <div className="id-stat-label">Total students</div>
                  <div className="id-stat-val">{summaryData?.stats?.totalStudents ?? students.length ?? 0}</div>
                  <div className="id-stat-sub">{summaryData?.stats?.studentsWeeklyGrowth || "Live database metrics"}</div>
                </div>

                <div className="id-stat-card">
                  <div className="id-stat-label">Active courses</div>
                  <div className="id-stat-val">{summaryData?.stats?.activeCourses ?? courses.filter((c) => (c.status || "").toUpperCase() === "ACTIVE").length ?? 0}</div>
                  <div className="id-stat-sub">Total Courses: {summaryData?.stats?.totalCourses ?? courses.length ?? 0}</div>
                </div>

                <div className="id-stat-card">
                  <div className="id-stat-label">Revenue</div>
                  <div className="id-stat-val">₹{(summaryData?.stats?.revenueMtd ?? 0).toLocaleString()}</div>
                  <div className="id-stat-sub">Lifetime: ₹{(summaryData?.stats?.lifetimeRevenue ?? 0).toLocaleString()}</div>
                </div>

                <div className="id-stat-card">
                  <div className="id-stat-label">Avg. rating</div>
                  <div className="id-stat-val">{Number(summaryData?.stats?.avgRating ?? 0).toFixed(1)}</div>
                  <div className="id-stat-sub muted">Pending Courses: {summaryData?.stats?.pendingCourses ?? 0}</div>
                </div>
              </div>

              {/* Middle Section: Revenue Trend & Recent Reviews */}
              <div className="row g-4 mb-4">
                <div className="col-lg-7">
                  <div className="id-card h-100">
                    <h3 className="id-card-title">Revenue trend</h3>
                    <div className="id-trend-bars">
                      {(summaryData?.revenueTrend && summaryData.revenueTrend.length > 0) ? (
                        summaryData.revenueTrend.map((t, idx) => {
                          const maxRev = Math.max(...summaryData.revenueTrend.map(r => Number(r.revenue || 0)), 1);
                          const heightPct = Math.max(Math.round((Number(t.revenue || 0) / maxRev) * 85), 15);
                          const isLast = idx === summaryData.revenueTrend.length - 1;
                          return (
                            <div className="id-trend-col" key={idx}>
                              <div className={`id-trend-bar ${isLast ? 'highlight' : ''}`} style={{ height: `${heightPct}%` }}></div>
                              <span className="id-trend-month">{t.month}</span>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-muted fs-8 m-auto py-4">No revenue recorded yet.</div>
                      )}
                    </div>
                    <div className="mt-3 text-muted fs-8">Recent monthly revenue progression</div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="id-card h-100">
                    <h3 className="id-card-title">Recent reviews</h3>
                    <div className="id-review-list">
                      {(summaryData?.recentReviews || []).length > 0 ? (
                        (summaryData?.recentReviews || []).map((rev) => (
                          <div className="id-review-item" key={rev.id || rev.review_id}>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="id-review-author">{rev.student || rev.author}</span>
                              <span className="id-review-rating">
                                ★ {Number(rev.rating).toFixed(1)}
                              </span>
                            </div>
                            <p className="id-review-comment">"{rev.comment}"</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-muted fs-8 text-center py-4">No recent reviews available.</div>
                      )}
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
                      {filteredStudents.slice(0, 5).length > 0 ? (
                        filteredStudents.slice(0, 5).map((std) => (
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
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center text-muted py-4">No recent enrollments found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. COURSES VIEW (Screenshot 3) */}
          {activeSection === "courses" && (
            <div>
              <div className="id-page-head flex-wrap gap-2">
                <h2 className="id-page-title">Courses</h2>
                <div className="d-flex flex-wrap gap-2 align-items-center">
                  <div className="id-search-box" style={{ width: 220 }}>
                    <FiSearch className="id-search-icon" />
                    <input
                      type="text"
                      className="id-search-input"
                      placeholder="Search courses..."
                      value={courseSearch}
                      onChange={(e) => { setCourseSearch(e.target.value); setCourseCurrentPage(1); }}
                    />
                  </div>
                  <select
                    className="form-select form-select-sm"
                    style={{ width: 150 }}
                    value={courseCategoryFilter}
                    onChange={(e) => { setCourseCategoryFilter(e.target.value); setCourseCurrentPage(1); }}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat, idx) => {
                      const name = cat.categoryName || cat.category_name || cat.name || cat;
                      return <option key={idx} value={name}>{name}</option>;
                    })}
                  </select>
                  <select
                    className="form-select form-select-sm"
                    style={{ width: 140 }}
                    value={courseStatusFilter}
                    onChange={(e) => { setCourseStatusFilter(e.target.value); setCourseCurrentPage(1); }}
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                  </select>
                  <button className="id-btn-primary" onClick={() => setShowAddCourseModal(true)}>
                    <FiPlus /> New course
                  </button>
                </div>
              </div>

              <div className="id-courses-grid">
                {currentCourses.length > 0 ? (
                  currentCourses.map((crs) => (
                    <div className="id-course-card" key={crs.course_id}>
                      <img src={crs.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80"} alt={crs.title} className="id-course-thumb" />
                      <div className="id-course-body">
                        <div className="id-course-badges">
                          <span className={`id-badge id-badge-${(crs.approval_status || 'pending').toLowerCase()}`}>
                            {crs.approval_status || 'Pending'}
                          </span>
                          <span className={`id-badge id-badge-${(crs.status || 'draft').toLowerCase()}`}>
                            {crs.status || 'Draft'}
                          </span>
                        </div>
                        <h4 className="id-course-title">{crs.title}</h4>
                        <div className="id-course-meta">
                          {crs.category || "Uncategorized"} • ₹{crs.price || 0} • {crs.duration || "N/A"}
                        </div>
                        <div className="fs-8 text-muted mb-3">{crs.enrolled_count ?? crs.students_count ?? students.filter(s => s.course_id === crs.course_id || s.course === crs.title).length ?? 0} students enrolled</div>
                        <div className="id-course-footer">
                          <button className="id-btn-outline-purple" onClick={() => handleOpenManageCourse(crs)}>
                            <FiEdit3 /> Manage course
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-muted fs-7 py-5 col-12 text-center">No courses found matching your criteria.</div>
                )}
              </div>

              {/* Pagination Controls */}
              {filteredCourses.length > coursesPerPage && (
                <div className="d-flex justify-content-between align-items-center mt-4 pt-2 border-top">
                  <span className="fs-8 text-muted">
                    Showing {indexOfFirstCourse + 1} to {Math.min(indexOfLastCourse, filteredCourses.length)} of {filteredCourses.length} courses
                  </span>
                  <div className="d-flex gap-2">
                    <button
                      className="id-btn-outline btn-sm"
                      disabled={courseCurrentPage === 1}
                      onClick={() => setCourseCurrentPage(p => Math.max(p - 1, 1))}
                    >
                      Previous
                    </button>
                    <span className="fs-8 fw-semibold px-2 align-self-center">
                      Page {courseCurrentPage} of {totalCoursePages}
                    </span>
                    <button
                      className="id-btn-outline btn-sm"
                      disabled={courseCurrentPage === totalCoursePages}
                      onClick={() => setCourseCurrentPage(p => Math.min(p + 1, totalCoursePages))}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
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
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((std) => (
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
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center text-muted py-4">No enrolled students found matching criteria.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* INSTRUCTORS VIEW */}
          {activeSection === "instructors" && (
            <div>
              <div className="id-page-head flex-wrap gap-2">
                <h2 className="id-page-title">Manage Instructors</h2>
                <div className="d-flex flex-wrap gap-2 align-items-center">
                  <div className="id-search-box" style={{ width: 280 }}>
                    <FiSearch className="id-search-icon" />
                    <input
                      type="text"
                      className="id-search-input"
                      placeholder="Search instructors..."
                      value={instructorSearch}
                      onChange={(e) => setInstructorSearch(e.target.value)}
                    />
                  </div>
                  <button className="id-btn-primary" onClick={() => setShowAddInstructorModal(true)}>
                    <FiPlus /> Add new instructor
                  </button>
                </div>
              </div>

              <div className="id-card">
                <div className="id-table-container">
                  <table className="id-table">
                    <thead>
                      <tr>
                        <th>PHOTO</th>
                        <th>NAME</th>
                        <th>SPECIALIZATION</th>
                        <th>EXPERIENCE</th>
                        <th>BIO</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInstructors.length > 0 ? (
                        filteredInstructors.map((inst) => {
                          const id = inst.instructorId || inst.instructor_id || inst.id;
                          return (
                            <tr key={id || Math.random()}>
                              <td>
                                <img
                                  src={(!inst.photo || inst.photo.includes("unsplash") || inst.photo.trim() === "") ? "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" : inst.photo}
                                  alt={inst.name}
                                  style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", border: "2px solid #e2e8f0" }}
                                />
                              </td>
                              <td className="fw-bold text-dark">{inst.name}</td>
                              <td>
                                <span className="id-badge id-badge-active">{inst.specialization}</span>
                              </td>
                              <td className="fw-normal">{inst.experience !== undefined && inst.experience !== null ? `${inst.experience} ${inst.experience === 1 ? "year" : "years"}` : "N/A"}</td>
                              <td style={{ maxWidth: "300px", color: "#64748b", fontSize: "13px", lineHeight: "1.4" }}>
                                {inst.bio || <span className="text-muted fst-italic">No bio provided</span>}
                              </td>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1 fw-semibold"
                                    onClick={() => handleEditInstructorClick(inst)}
                                    style={{ borderRadius: "8px" }}
                                  >
                                    <FiEdit3 /> Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger d-inline-flex align-items-center"
                                    onClick={() => handleDeleteInstructorClick(inst)}
                                    style={{ borderRadius: "8px" }}
                                    title="Delete"
                                  >
                                    <FiTrash2 />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center text-muted py-4">No instructors found matching your criteria. Click 'Add new instructor' to create one.</td>
                        </tr>
                      )}
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
                  <div className="id-stat-val">₹{(summaryData?.stats?.revenueMtd ?? 0).toLocaleString()}</div>
                  <div className="id-stat-sub">{summaryData?.stats?.revenueGrowth || "+0% vs last month"}</div>
                </div>

                <div className="id-stat-card">
                  <div className="id-stat-label">Payouts</div>
                  <div className="id-stat-val">₹{(summaryData?.stats?.payouts ?? summaryData?.stats?.pendingPayouts ?? 0).toLocaleString()}</div>
                  <div className="id-stat-sub muted">Monthly commission to admin</div>
                </div>

                <div className="id-stat-card">
                  <div className="id-stat-label">Lifetime revenue</div>
                  <div className="id-stat-val">₹{(summaryData?.stats?.lifetimeRevenue ?? 0).toLocaleString()}</div>
                  <div className="id-stat-sub muted">Live database metrics</div>
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
                      {(summaryData?.recentTransactions || []).length > 0 ? (
                        (summaryData?.recentTransactions || []).map((txn) => (
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
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center text-muted py-4">No recent transactions.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="id-card mt-4">
                <h3 className="id-card-title">Revenue by course</h3>
                <div className="id-table-container">
                  <table className="id-table">
                    <thead>
                      <tr>
                        <th>COURSE NAME</th>
                        <th>STUDENTS ENROLLED</th>
                        <th>TOTAL REVENUE GENERATED</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(summaryData?.topCourses || []).length > 0 ? (
                        (summaryData?.topCourses || []).map((crs, idx) => (
                          <tr key={crs.course_id || idx}>
                            <td className="fw-semibold">{crs.title}</td>
                            <td>{crs.students_count || 0}</td>
                            <td className="fw-normal">₹{(Number(crs.revenue || 0)).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center text-muted py-4">No course revenue data recorded yet.</td>
                        </tr>
                      )}
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
                      {(summaryData?.topCourses || []).length > 0 ? (
                        (summaryData?.topCourses || []).map((item, idx) => (
                          <div className="d-flex align-items-center gap-3" key={item.course_id || idx}>
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
                              {idx + 1}
                            </div>
                            <div>
                              <div className="fw-normal fs-8">{item.title}</div>
                              <div className="text-muted fs-9">{item.students_count} students</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-muted fs-8">No data available yet.</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enrollment Sources */}
                <div className="col-lg-6">
                  <div className="id-card h-100">
                    <h3 className="id-card-title">Enrollment sources</h3>
                    <div className="d-flex flex-column gap-3">
                      {(summaryData?.enrollmentSources || []).length > 0 ? (
                        (summaryData?.enrollmentSources || []).map((src, idx) => (
                          <div key={idx}>
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
                        ))
                      ) : (
                        <div className="text-muted fs-8">No data available yet.</div>
                      )}
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
                {(summaryData?.recentReviews || []).length > 0 ? (
                  (summaryData?.recentReviews || []).map((rev) => (
                    <div className="id-card" key={rev.id || rev.review_id} style={{ padding: "1.25rem 1.5rem" }}>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <div>
                          <span className="fw-normal fs-7 me-1">{rev.author || rev.student_name}</span>
                          <span className="text-muted fs-8">on {rev.course || rev.course_name}</span>
                        </div>
                        <span className="id-review-rating fs-7">★ {Number(rev.rating).toFixed(1)}</span>
                      </div>
                      <p className="id-review-comment fs-7 mb-1">"{rev.comment}"</p>
                      <div className="text-muted fs-9">{rev.time || rev.created_at}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-muted fs-8 text-center mt-4">No reviews available yet.</div>
                )}
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
                  {documents.length > 0 ? (
                    documents.map((doc, idx) => (
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
                    ))
                  ) : (
                    <div className="text-muted fs-9 text-center py-3">No documents uploaded.</div>
                  )}
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
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Instructor</label>
                <select
                  className="form-select"
                  value={(newCourseForm.instructorId !== "" && newCourseForm.instructorId != null) ? newCourseForm.instructorId : ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    const inst = instructors.find(i => (i.instructorId || i.instructor_id || i.id) == val);
                    setNewCourseForm({
                      ...newCourseForm,
                      instructorId: val === "" ? "" : parseInt(val, 10),
                      instructor_name: inst ? inst.name : (val === "0" ? "Default Instructor" : "")
                    });
                  }}
                >
                  <option value="">Select Instructor</option>
                  {instructors.length === 0 && (
                    <option value="0">Default Instructor (General Curriculum)</option>
                  )}
                  {instructors.map((inst) => {
                    const id = inst.instructorId || inst.instructor_id || inst.id;
                    return (
                      <option key={id} value={id}>
                        {inst.name} ({inst.specialization})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Category</label>
                <select
                  className="form-select"
                  value={newCourseForm.categoryId || ""}
                  onChange={(e) => {
                    const selectedCat = categories.find(c => (c.categoryId || c.category_id || c.id) == e.target.value);
                    setNewCourseForm({
                      ...newCourseForm,
                      categoryId: e.target.value ? parseInt(e.target.value) : "",
                      category: selectedCat ? (selectedCat.categoryName || selectedCat.category_name || selectedCat.name || selectedCat) : ""
                    });
                  }}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => {
                    const id = cat.categoryId || cat.category_id || cat.id;
                    const name = cat.categoryName || cat.category_name || cat.name || cat;
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                {categories.length === 0 && <span className="text-muted fs-8">No categories available in database.</span>}
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Thumbnail Image (Choose from Device)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewCourseForm({ ...newCourseForm, thumbnail: reader.result });
                      };
                      reader.readAsDataURL(file);
                    } else {
                      setNewCourseForm({ ...newCourseForm, thumbnail: "" });
                    }
                  }}
                />
                {newCourseForm.thumbnail && (
                  <div className="mt-2 text-center p-2 border rounded" style={{ backgroundColor: "#f8fafc", maxHeight: "180px", overflow: "hidden" }}>
                    <img src={newCourseForm.thumbnail} alt="Thumbnail Preview" style={{ maxHeight: "150px", maxWidth: "100%", objectFit: "cover", borderRadius: "8px" }} />
                    <button
                      type="button"
                      className="btn btn-link text-danger d-block mx-auto mt-1 p-0 fs-9"
                      onClick={() => setNewCourseForm({ ...newCourseForm, thumbnail: "" })}
                    >
                      Remove selected image
                    </button>
                  </div>
                )}
                <small className="text-muted d-block mt-1">Choose an image from your device. Leave blank to assign a default image.</small>
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Status</label>
                <select
                  className="form-select"
                  value={newCourseForm.status || "pending"}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, status: e.target.value })}
                >
                  <option value="pending">Pending — submit for Admin approval</option>
                  <option value="draft">Draft — not visible to students</option>
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

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fs-7 fw-bold">Instructor</label>
                  <select
                    className="form-select"
                    value={(selectedCourse.instructorId !== "" && selectedCourse.instructorId != null) ? selectedCourse.instructorId : ((selectedCourse.instructor_id !== "" && selectedCourse.instructor_id != null) ? selectedCourse.instructor_id : "")}
                    onChange={(e) => {
                      const val = e.target.value;
                      const selInst = instructors.find(i => (i.instructorId || i.instructor_id || i.id) == val);
                      setSelectedCourse({
                        ...selectedCourse,
                        instructorId: val === "" ? "" : parseInt(val, 10),
                        instructor_name: selInst ? selInst.name : (val === "0" ? "Default Instructor" : "")
                      });
                    }}
                  >
                    <option value="">Select Instructor</option>
                    {instructors.length === 0 && (
                      <option value="0">Default Instructor (General Curriculum)</option>
                    )}
                    {instructors.map((inst) => {
                      const id = inst.instructorId || inst.instructor_id || inst.id;
                      return <option key={id} value={id}>{inst.name} ({inst.specialization})</option>;
                    })}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fs-7 fw-bold">Category</label>
                  <select
                    className="form-select"
                    value={selectedCourse.categoryId || selectedCourse.category_id || ""}
                    onChange={(e) => {
                      const selCat = categories.find(c => (c.categoryId || c.category_id || c.id) == e.target.value);
                      setSelectedCourse({
                        ...selectedCourse,
                        categoryId: e.target.value ? parseInt(e.target.value) : "",
                        category: selCat ? (selCat.categoryName || selCat.category_name || selCat.name || selCat) : ""
                      });
                    }}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => {
                      const id = cat.categoryId || cat.category_id || cat.id;
                      const name = cat.categoryName || cat.category_name || cat.name || cat;
                      return <option key={id} value={id}>{name}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Thumbnail Image (Choose from Device)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setSelectedCourse({ ...selectedCourse, thumbnail: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {selectedCourse.thumbnail && (
                  <div className="mt-2 text-center p-2 border rounded" style={{ backgroundColor: "#f8fafc", maxHeight: "180px", overflow: "hidden" }}>
                    <img src={selectedCourse.thumbnail} alt="Thumbnail Preview" style={{ maxHeight: "150px", maxWidth: "100%", objectFit: "cover", borderRadius: "8px" }} />
                    <button
                      type="button"
                      className="btn btn-link text-danger d-block mx-auto mt-1 p-0 fs-9"
                      onClick={() => setSelectedCourse({ ...selectedCourse, thumbnail: "" })}
                    >
                      Remove image
                    </button>
                  </div>
                )}
                <small className="text-muted d-block mt-1">Choose an image from your device to update the thumbnail.</small>
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
          <div className="id-modal-content" style={{ maxWidth: 520 }}>
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
                <label className="form-label fs-7 fw-bold">Experience (in years)</label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  value={newInstructorForm.experience}
                  onChange={(e) => setNewInstructorForm({ ...newInstructorForm, experience: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Bio</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Brief biography and teaching background..."
                  value={newInstructorForm.bio}
                  onChange={(e) => setNewInstructorForm({ ...newInstructorForm, bio: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Photo URL</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://images.unsplash.com/..."
                  value={newInstructorForm.photo}
                  onChange={(e) => setNewInstructorForm({ ...newInstructorForm, photo: e.target.value })}
                />
                <small className="text-muted d-block mt-1">Leave blank to use default gender-neutral avatar.</small>
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

      {/* --- MODAL: EDIT INSTRUCTOR --- */}
      {showEditInstructorModal && selectedInstructor && (
        <div className="id-modal-backdrop">
          <div className="id-modal-content" style={{ maxWidth: 520 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold m-0 fs-5">Edit Instructor</h4>
              <button className="btn-close" onClick={() => { setShowEditInstructorModal(false); setSelectedInstructor(null); }}></button>
            </div>

            <form onSubmit={handleEditInstructorSubmit}>
              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Instructor Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editInstructorForm.name}
                  onChange={(e) => setEditInstructorForm({ ...editInstructorForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Specialization</label>
                <input
                  type="text"
                  className="form-control"
                  value={editInstructorForm.specialization}
                  onChange={(e) => setEditInstructorForm({ ...editInstructorForm, specialization: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Experience (in years)</label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  value={editInstructorForm.experience}
                  onChange={(e) => setEditInstructorForm({ ...editInstructorForm, experience: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Bio</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={editInstructorForm.bio}
                  onChange={(e) => setEditInstructorForm({ ...editInstructorForm, bio: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fs-7 fw-bold">Photo URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={editInstructorForm.photo}
                  onChange={(e) => setEditInstructorForm({ ...editInstructorForm, photo: e.target.value })}
                />
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="id-btn-outline" onClick={() => { setShowEditInstructorModal(false); setSelectedInstructor(null); }}>
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