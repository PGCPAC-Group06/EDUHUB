import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import api from "../services/api";
import {
  FiGrid,
  FiHome,
  FiUsers,
  FiDollarSign,
  FiPieChart,
  FiSettings,
  FiSearch,
  FiBell,
  FiLogOut,
  FiEdit2,
  FiCheck,
<<<<<<< HEAD
  FiX,
  FiBook
} from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const CommissionSlider = ({ initialCommission, instituteName, onUpdate }) => {
  const [value, setValue] = useState(initialCommission || 15);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setValue(initialCommission || 15);
  }, [initialCommission]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleRelease = (e) => {
    onUpdate(instituteName, e.target.value);
  };

  // Calculate thumb position percentage for tooltip
  const thumbPosition = value;

  return (
    <div 
      style={{ position: "relative", display: "flex", alignItems: "center", width: "120px", height: "30px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div style={{
          position: "absolute",
          top: "-20px",
          left: `calc(${thumbPosition}% - 12px)`, // Approximate centering over thumb
          backgroundColor: "#1e293b",
          color: "white",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "11px",
          fontWeight: "bold",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex: 10,
          transition: "left 0.1s"
        }}>
          {value}%
        </div>
      )}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value}
        onChange={handleChange}
        onMouseUp={handleRelease}
        onTouchEnd={handleRelease}
        style={{ 
          width: "100%", 
          cursor: "pointer",
          accentColor: "#3b82f6",
          margin: "0"
        }}
      />
    </div>
  );
};
=======
  FiX
} from "react-icons/fi";
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState("overview");

  // Search queries
  const [globalSearch, setGlobalSearch] = useState("");
<<<<<<< HEAD
  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const [topRatedInstitute, setTopRatedInstitute] = useState(null);
  const [debugError, setDebugError] = useState("");
  const [instituteSearch, setInstituteSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseSearch, setCourseSearch] = useState("");

  // Filters
  const [instituteFilter, setInstituteFilter] = useState("all");
  const [studentFilter, setStudentFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
=======
  const [instituteSearch, setInstituteSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  // Filters
  const [instituteFilter, setInstituteFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a

  // Profile Edit State (Settings)
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [adminProfile, setAdminProfile] = useState({
<<<<<<< HEAD
    name: "EduHub Admin",
    email: "admin@eduhub.com",
=======
    name: "Sarah Rowe",
    email: "sarah.rowe@eduhub.com",
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
    role: "Platform administrator",
    accessLevel: "Super Admin – full platform access"
  });

  // Platform Toggles State (Settings)
  const [platformSettings, setPlatformSettings] = useState({
<<<<<<< HEAD
    platformName: "",
    commissionPercentage: 15.0,
    supportEmail: ""
  });

  // Sample Institutes Data (Now empty by default, loaded from backend)
  const [institutes, setInstitutes] = useState([]);

  // Reviews Data
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  // Revenue Data
  const [revenueData, setRevenueData] = useState([]);
  const [revenueStats, setRevenueStats] = useState({
    thisMonthRevenue: 0,
    percentageChange: 0,
    lifetimeRevenue: 0
  });
  const [topInstitutes, setTopInstitutes] = useState({
    thisMonth: [],
    lifetime: []
  });
  const [categoryDistribution, setCategoryDistribution] = useState([]);
  
  const [growthDateRange, setGrowthDateRange] = useState({
    startDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      return d.toISOString().split('T')[0];
    })(),
    endDate: new Date().toISOString().split('T')[0]
  });
  const [growthData, setGrowthData] = useState([]);

  // Activity Log
  const [recentActivities, setRecentActivities] = useState([]);

  // Confirmation Modal State for Institute Approve/Reject
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: "", // "approve" or "reject"
    id: null,
    name: ""
  });

  // Confirmation Modal State for Student Suspend/Reactivate
  const [studentConfirmModal, setStudentConfirmModal] = useState({
    isOpen: false,
    action: "", // "suspend" or "reactivate"
    studentId: null,
    name: "",
    currentStatus: ""
  });

  // Modal State for Viewing Multiple Top-Rated Institutes (Tied)
  const [showTopRatedModal, setShowTopRatedModal] = useState(false);
=======
    autoApprove: false,
    maintenanceMode: false,
    emailAlerts: true
  });

  // Sample Institutes Data (Matching screenshots)
  const [institutes, setInstitutes] = useState([
    {
      id: 1,
      name: "Nova Institute",
      city: "Sector 62, Noida, UP",
      gstin: "09ABCDE1234F1Z5",
      courses: 14,
      appliedDate: "20 Jul 2026",
      status: "approved",
      revenue: 284000,
      commission: 42600,
      payoutStatus: "paid"
    },
    {
      id: 2,
      name: "Bright Future Academy",
      city: "Andheri East, Mumbai, MH",
      gstin: "27XYZAB5678G2Z1",
      courses: 6,
      appliedDate: "25 Jul 2026",
      status: "pending",
      revenue: 0,
      commission: 0,
      payoutStatus: "pending"
    },
    {
      id: 3,
      name: "CodeCraft Bootcamp",
      city: "Koramangala, Bengaluru, KA",
      gstin: "29PQRS19988H1Z0",
      courses: 9,
      appliedDate: "23 Jul 2026",
      status: "pending",
      revenue: 0,
      commission: 0,
      payoutStatus: "-"
    },
    {
      id: 4,
      name: "GreenTech Academy",
      city: "Connaught Place, Delhi",
      gstin: "07LMNOP4431K1Z2",
      courses: 11,
      appliedDate: "10 Jul 2026",
      status: "approved",
      revenue: 198000,
      commission: 29700,
      payoutStatus: "paid"
    },
    {
      id: 5,
      name: "Quantum Skills Hub",
      city: "T. Nagar, Chennai, TN",
      gstin: "33GHIJK7712M1Z6",
      courses: 4,
      appliedDate: "18 Jul 2026",
      status: "rejected",
      revenue: 52000,
      commission: 7800,
      payoutStatus: "on_hold"
    }
  ]);

  // Sample Users Data (Matching screenshots)
  const [users, setUsers] = useState([
    {
      id: 101,
      name: "Maria Lopez",
      email: "maria.lopez@example.com",
      role: "Student",
      joined: "14 Jan 2026",
      status: "Active"
    },
    {
      id: 102,
      name: "Aisha Kapoor",
      email: "aisha.kapoor@novainstitute.com",
      role: "Institute Admin",
      joined: "02 Mar 2025",
      status: "Active"
    },
    {
      id: 103,
      name: "Tom Becker",
      email: "tom.becker@example.com",
      role: "Student",
      joined: "28 Feb 2026",
      status: "Active"
    },
    {
      id: 104,
      name: "Rohit Verma",
      email: "rohit.verma@novainstitute.com",
      role: "Institute Admin",
      joined: "14 Apr 2025",
      status: "Active"
    },
    {
      id: 105,
      name: "Priya Shah",
      email: "priya.shah@example.com",
      role: "Student",
      joined: "05 Jul 2026",
      status: "Suspended"
    },
    {
      id: 106,
      name: "S. Rowe",
      email: "sarah.rowe@eduhub.com",
      role: "Admin",
      joined: "01 Jan 2025",
      status: "Active"
    }
  ]);

  // Activity Log
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      event: "Institute approved — GreenTech Academy",
      actor: "Admin: S. Rowe",
      time: "10 min ago"
    },
    {
      id: 2,
      event: "Payout processed — ₹12,400",
      actor: "System",
      time: "1 hour ago"
    },
    {
      id: 3,
      event: "New institute application — Bright Future Academy",
      actor: "System",
      time: "2 days ago"
    }
  ]);
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a

  // Fetch pending institutes from API if backend is running
  useEffect(() => {
    fetchBackendData();
  }, []);

<<<<<<< HEAD
  useEffect(() => {
    fetchGrowthData();
  }, [growthDateRange]);

  const fetchGrowthData = async () => {
    try {
      const res = await api.get(`/api/admin/analytics/category-performance?startDate=${growthDateRange.startDate}&endDate=${growthDateRange.endDate}`);
      if (res && res.data) {
        setGrowthData(res.data);
      }
    } catch (err) {
      console.log("Error fetching category performance data", err);
    }
  };

  const fetchBackendData = async () => {
    try {
      // Fetch institutes
      const resInstitutes = await api.get("/api/admin/institutes").catch(() => null);
      if (resInstitutes && resInstitutes.data) {
        setInstitutes(resInstitutes.data.map((item, idx) => ({
            id: item.userId || item.id || 200 + idx,
            name: item.name || "Institute",
            city: "N/A",
            gstin: "N/A",
            courses: item.courses !== undefined ? item.courses : 0,
            appliedDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recently",
            status: item.approvalStatus ? item.approvalStatus.toLowerCase() : "pending"
        })));
      } else {
        // Fallback pending fetch if general api is missing
        const resPending = await api.get("/api/admin/institutes/pending").catch(() => null);
        if (resPending && resPending.data) {
            setInstitutes(resPending.data.map((item, idx) => ({
                id: item.id || item.userId || 200 + idx,
                name: item.name || "Pending Institute",
                city: item.address || "Location Pending",
                gstin: item.gstin || "NOT_PROVIDED",
                courses: 0,
                appliedDate: "Recently",
                status: "pending",
                revenue: 0,
                commission: 0,
                payoutStatus: "-"
            })));
        }
      }

      // Fetch students
      const resStudents = await api.get("/api/admin/students").catch(() => null);
      if (resStudents && resStudents.data) {
        setStudents(resStudents.data.map(student => ({
          ...student,
          status: student.status === "BLOCKED" ? "Suspended" : "Active"
        })));
      }
      
      // Fetch settings
      const resSettings = await api.get("/api/admin/settings").catch(() => null);
      if (resSettings && resSettings.data) {
        setPlatformSettings(resSettings.data);
      }

      // Fetch reviews
      const resReviews = await api.get("/api/reviews/all").catch(() => null);
      if (resReviews && resReviews.data) {
        setReviews(resReviews.data);
      }

      const resAvg = await api.get("/api/reviews/average").catch(() => null);
      if (resAvg && resAvg.data !== undefined) {
        setAvgRating(resAvg.data);
      }

      // Fetch Revenue Data
      const resRevenue = await api.get("/api/admin/revenue").catch(() => null);
      if (resRevenue && resRevenue.data) {
        setRevenueData(resRevenue.data);
      }

      // Fetch Revenue Stats
      const resRevenueStats = await api.get("/api/admin/revenue-stats").catch(() => null);

      // Fetch courses
      const resCourses = await api.get("/api/admin/courses").catch(() => null);
      if (resCourses && resCourses.data) {
        setCourses(resCourses.data);
      }
      if (resRevenueStats && resRevenueStats.data) {
        setRevenueStats(resRevenueStats.data);
      }

      // Fetch Top Institutes Analytics
      const resTopInst = await api.get("/api/admin/analytics/top-institutes").catch(() => null);
      if (resTopInst && resTopInst.data) {
        setTopInstitutes(resTopInst.data);
      }

      // Fetch Category Distribution
      const resCategory = await api.get("/api/admin/analytics/category-distribution").catch(() => null);
      if (resCategory && resCategory.data) {
        setCategoryDistribution(resCategory.data);
      }
      

      // Fetch Top Rated Institute
      const resTopRated = await api.get("/api/admin/overview/top-rated-institute").catch((err) => {
        const errorMsg = "Error: " + err.message + " | Status: " + err.response?.status + " | Data: " + JSON.stringify(err.response?.data);
        setDebugError(errorMsg);
        return null;
      });
      if (resTopRated && resTopRated.data && typeof resTopRated.data === "object" && resTopRated.data.name) {
        setTopRatedInstitute(resTopRated.data);
        setDebugError(""); // Clear any previous errors on success
      } else if (typeof resTopRated?.data === "string") {
        console.warn("Server returned non-object JSON for Top Rated Institute:", resTopRated.data.slice(0, 100));
        setDebugError("Server returned malformed format for Top Rated Institute");
      }
    } catch (err) {
      console.log("Error fetching admin data", err);
=======
  const fetchBackendData = async () => {
    try {
      const res = await api.get("/api/admin/institutes/pending");
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        const backendPending = res.data.map((item, idx) => ({
          id: item.id || item.userId || 200 + idx,
          name: item.name || "Pending Institute",
          city: item.address || "Location Pending",
          gstin: item.gstin || "NOT_PROVIDED",
          courses: 0,
          appliedDate: "Recently",
          status: "pending",
          revenue: 0,
          commission: 0,
          payoutStatus: "-"
        }));
        setInstitutes((prev) => {
          const nonPending = prev.filter((i) => i.status !== "pending");
          return [...backendPending, ...nonPending];
        });
      }
    } catch (err) {
      console.log("Using standard default mockup data for dashboard UI.");
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
    }
  };

  const handleCommissionChange = async (instituteName, newPercentage) => {
    try {
      await api.put("/api/admin/revenue/commission", {
        instituteName,
        newPercentage: parseFloat(newPercentage)
      });
      // Re-fetch backend data to automatically update the dashboard stats and table
      fetchBackendData();
    } catch (err) {
      console.log("Error updating commission", err);
    }
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

<<<<<<< HEAD
  // Institute Actions: Confirmation Trigger and Direct Approve/Reject Execution
  const handleApproveInstitute = (id, name) => {
    setConfirmModal({ isOpen: true, type: "approve", id, name });
  };

  const executeApproveInstitute = async (id, name) => {
=======
  // Institute Actions: Direct Approve and Reject
  const handleApproveInstitute = async (id, name) => {
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
    setInstitutes((prev) =>
      prev.map((inst) =>
        inst.id === id ? { ...inst, status: "approved" } : inst
      )
    );
    setRecentActivities((prev) => [
      {
        id: Date.now(),
        event: `Institute approved — ${name}`,
        actor: `Admin: ${adminProfile.name}`,
        time: "Just now"
      },
      ...prev
    ]);
    try {
      await api.put(`/api/admin/institutes/${id}/approve`);
    } catch (e) {}
<<<<<<< HEAD
  };

  const handleRejectInstitute = (id, name) => {
    setConfirmModal({ isOpen: true, type: "reject", id, name });
  };

  const executeRejectInstitute = async (id, name) => {
    setInstitutes((prev) =>
      prev.map((inst) =>
        inst.id === id ? { ...inst, status: "rejected" } : inst
      )
    );
    setRecentActivities((prev) => [
      {
        id: Date.now(),
        event: `Institute rejected — ${name}`,
        actor: `Admin: ${adminProfile.name}`,
        time: "Just now"
      },
      ...prev
    ]);
    try {
      await api.put(`/api/admin/institutes/${id}/reject`);
    } catch (e) {}
  };

  const executeApproveCourse = async (id, name) => {
    setCourses((prev) =>
      prev.map((crs) =>
        (crs.id === id || crs.courseId === id) ? { ...crs, approvalStatus: "approved", status: "ACTIVE" } : crs
      )
    );
    try {
      await api.put(`/api/admin/courses/${id}/approve`);
    } catch (e) {
      console.error("Error approving course", e);
    }
  };

  const executeRejectCourse = async (id, name) => {
    setCourses((prev) =>
      prev.map((crs) =>
        (crs.id === id || crs.courseId === id) ? { ...crs, approvalStatus: "rejected", status: "BLOCKED" } : crs
      )
    );
    try {
      await api.put(`/api/admin/courses/${id}/reject`);
    } catch (e) {
      console.error("Error rejecting course", e);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await api.put("/api/admin/settings", platformSettings);
      alert("Platform settings updated successfully");
    } catch (e) {
      alert("Failed to update platform settings");
    }
  };

  // Student Status Toggle (Suspend / Reactivate) Confirmation Trigger and Execution
  const handleToggleStudentStatus = (studentId, currentStatus, studentName) => {
    const isCurrentlyActive = currentStatus === "Active" || currentStatus === "ACTIVE";
    const action = isCurrentlyActive ? "suspend" : "reactivate";
    setStudentConfirmModal({
      isOpen: true,
      action,
      studentId,
      name: studentName || "Student",
      currentStatus
    });
  };

  const executeToggleStudentStatus = async (studentId, currentStatus) => {
    const isCurrentlyActive = currentStatus === "Active" || currentStatus === "ACTIVE";
    const action = isCurrentlyActive ? "suspend" : "reactivate";
    
    try {
      await api.put(`/api/admin/students/${studentId}/${action}`);
      setStudents((prev) =>
        prev.map((s) =>
          s.userId === studentId || s.id === studentId
            ? { ...s, status: isCurrentlyActive ? "Suspended" : "Active" }
            : s
        )
      );
    } catch (error) {
      console.error(`Failed to ${action} student`, error);
      alert(`Failed to ${action} student.`);
    }
  };

  // Settings Save Profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
  };

=======
  };

  const handleRejectInstitute = async (id, name) => {
    setInstitutes((prev) =>
      prev.map((inst) =>
        inst.id === id ? { ...inst, status: "rejected" } : inst
      )
    );
    setRecentActivities((prev) => [
      {
        id: Date.now(),
        event: `Institute rejected — ${name}`,
        actor: `Admin: ${adminProfile.name}`,
        time: "Just now"
      },
      ...prev
    ]);
    try {
      await api.put(`/api/admin/institutes/${id}/reject`);
    } catch (e) {}
  };

  // User Status Toggle (Suspend / Reactivate)
  const handleToggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" }
          : u
      )
    );
  };

  // Settings Save Profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
  };

>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
  // Helper Filters
  const filteredInstitutes = institutes.filter((inst) => {
    const matchesFilter =
      instituteFilter === "all" || inst.status === instituteFilter;
    const matchesSearch =
<<<<<<< HEAD
      (inst.name || "").toLowerCase().includes(instituteSearch.toLowerCase()) ||
      (inst.city || "").toLowerCase().includes(instituteSearch.toLowerCase()) ||
      (inst.gstin || "").toLowerCase().includes(instituteSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredStudents = students.filter((student) => {
    const matchesFilter =
      studentFilter === "all" || (student.status || "").toLowerCase() === studentFilter.toLowerCase();
    const matchesSearch =
      (student.name || "").toLowerCase().includes(studentSearch.toLowerCase()) ||
      (student.email || "").toLowerCase().includes(studentSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredCourses = courses.filter((crs) => {
    const query = (courseSearch || "").toLowerCase();
    const matchesSearch = (crs.title || "").toLowerCase().includes(query) || (crs.instituteName || "").toLowerCase().includes(query);
    const statusVal = (crs.approvalStatus || crs.status || "pending").toLowerCase();
    const normalizedStatus = (statusVal === "active" || statusVal === "approved") ? "approved" : (statusVal === "blocked" || statusVal === "rejected") ? "rejected" : "pending";
    const matchesFilter = courseFilter === "all" || normalizedStatus === courseFilter;
    return matchesSearch && matchesFilter;
  });

  const pendingApprovalsList = [
    ...institutes.filter((inst) => inst.status === "pending").map((inst) => ({
      id: inst.id,
      name: inst.name,
      subtext: `Institute • Applied ${inst.appliedDate || "Recently"}`,
      type: "institute"
    })),
    ...courses.filter((crs) => (crs.approvalStatus || "").toLowerCase() === "pending" || (crs.status || "").toLowerCase() === "pending").map((crs) => ({
      id: crs.id || crs.courseId,
      name: crs.title,
      subtext: `Course by ${crs.instituteName || "Institute"} • Price: ₹${crs.price || 0}`,
      type: "course"
    }))
  ];
=======
      inst.name.toLowerCase().includes(instituteSearch.toLowerCase()) ||
      inst.city.toLowerCase().includes(instituteSearch.toLowerCase()) ||
      inst.gstin.toLowerCase().includes(instituteSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredUsers = users.filter((usr) => {
    const matchesFilter =
      userFilter === "all" ||
      (userFilter === "student" && usr.role.toLowerCase() === "student") ||
      (userFilter === "institute" &&
        usr.role.toLowerCase().includes("institute")) ||
      (userFilter === "admin" && usr.role.toLowerCase() === "admin");
    const matchesSearch =
      usr.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      usr.email.toLowerCase().includes(userSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingApprovalsList = institutes.filter(
    (inst) => inst.status === "pending"
  );
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f6f7fb",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
      }}
    >
      {/* ================= SIDEBAR ================= */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#0f1026",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justify: "space-between",
          padding: "24px 16px",
          flexShrink: 0,
          boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
          zIndex: 10
        }}
      >
        <div>
          {/* Logo & Console Title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "0 12px 28px 12px"
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                backgroundColor: "#5b46f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "800",
                fontSize: "20px",
                color: "#fff",
                boxShadow: "0 4px 12px rgba(91, 70, 246, 0.4)"
              }}
            >
              E
            </div>
            <div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  letterSpacing: "-0.5px"
                }}
              >
                EduHub
              </div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  color: "#7e83a7",
                  textTransform: "uppercase"
                }}
              >
<<<<<<< HEAD
                EduHub Admin Console
=======
                Admin Console
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px"
            }}
          >
            {[
              { id: "overview", label: "Overview", icon: <FiGrid size={18} /> },
              { id: "institutes", label: "Institutes", icon: <FiHome size={18} /> },
<<<<<<< HEAD
              { id: "courses", label: "Courses", icon: <FiBook size={18} /> },
              { id: "students", label: "Students", icon: <FiUsers size={18} /> },
=======
              { id: "users", label: "Users", icon: <FiUsers size={18} /> },
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
              { id: "revenue", label: "Revenue", icon: <FiDollarSign size={18} /> },
              { id: "analytics", label: "Analytics", icon: <FiPieChart size={18} /> },
              {
                id: "settings",
                label: "Settings",
                icon: <FiSettings size={18} />
              }
            ].map((navItem) => {
              const isActive = activeTab === navItem.id;
              return (
                <button
                  key={navItem.id}
                  onClick={() => setActiveTab(navItem.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "none",
                    backgroundColor: isActive ? "#5b46f6" : "transparent",
                    color: isActive ? "#ffffff" : "#8c90b0",
                    fontWeight: isActive ? "600" : "500",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isActive
                      ? "0 4px 14px rgba(91, 70, 246, 0.35)"
                      : "none"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = "#ffffff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#8c90b0";
                    }
                  }}
                >
                  {navItem.icon}
                  <span>{navItem.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div
          style={{
            backgroundColor: "#161836",
            padding: "14px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            border: "1px solid rgba(255,255,255,0.06)"
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              backgroundColor: "#5b46f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "14px",
              color: "#fff"
            }}
          >
            SR
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#fff",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {adminProfile.name}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#7e83a7",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {adminProfile.role}
            </div>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0
        }}
      >
        {/* Top Navbar */}
        <header
          style={{
            height: "72px",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #eef0f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            position: "sticky",
            top: 0,
            zIndex: 5
          }}
        >
<<<<<<< HEAD
          {/* Global Search Input Removed */}
          <div style={{ flex: 1 }}></div>

=======
          {/* Global Search Input */}
          <div
            style={{
              position: "relative",
              width: "360px"
            }}
          >
            <FiSearch
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af"
              }}
              size={16}
            />
            <input
              type="text"
              placeholder="Search institutes, users..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 16px 9px 40px",
                borderRadius: "20px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#f8fafc",
                fontSize: "13px",
                outline: "none",
                transition: "all 0.2s"
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.borderColor = "#5b46f6";
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "#f8fafc";
                e.target.style.borderColor = "#e2e8f0";
              }}
            />
          </div>
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a

          {/* Top Right Icons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px"
            }}
          >
            <div
              style={{
                position: "relative",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "50%",
                color: "#64748b"
              }}
            >
              <FiBell size={20} />
              <span
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#ef4444"
                }}
              />
            </div>

            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#5b46f6",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "13px",
                cursor: "pointer"
              }}
              title={adminProfile.name}
            >
              SR
            </div>
          </div>
        </header>

        {/* Scrollable View Content */}
        <main
          style={{
            flex: 1,
            padding: "32px",
            overflowY: "auto"
          }}
        >
          {/* ================= 1. OVERVIEW VIEW ================= */}
          {activeTab === "overview" && (
            <div>
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  color: "#0f172a",
                  marginBottom: "24px",
                  letterSpacing: "-0.5px"
                }}
              >
                Platform overview
              </h1>

              {/* 4 Stat Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "20px",
                  marginBottom: "28px"
                }}
              >
                {/* Total Institutes */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    border: "1px solid #eef0f6",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#94a3b8",
                      marginBottom: "8px"
                    }}
                  >
                    Total institutes
                  </div>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "800",
                      color: "#0f172a",
                      marginBottom: "6px"
                    }}
                  >
<<<<<<< HEAD
                    {institutes.length}
=======
                    512
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
<<<<<<< HEAD
                      color: "#64748b",
                      display: "flex",
                      gap: "12px",
                      marginTop: "4px"
                    }}
                  >
                    <span style={{ color: "#10b981" }}>Approved: {institutes.filter(i => i.status === "approved").length}</span>
                    <span style={{ color: "#f59e0b" }}>Pending: {institutes.filter(i => i.status === "pending").length}</span>
                    <span style={{ color: "#ef4444" }}>Rejected: {institutes.filter(i => i.status === "rejected").length}</span>
                  </div>
                </div>

                {/* Total Students */}
=======
                      color: "#10b981"
                    }}
                  >
                    +12 this month
                  </div>
                </div>

                {/* Total Users */}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    border: "1px solid #eef0f6",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#94a3b8",
                      marginBottom: "8px"
                    }}
                  >
<<<<<<< HEAD
                    Total Students
=======
                    Total users
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                  </div>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "800",
                      color: "#0f172a",
                      marginBottom: "6px"
                    }}
                  >
<<<<<<< HEAD
                    {students.length}
=======
                    2.41M
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
<<<<<<< HEAD
                      color: "#64748b",
                      display: "flex",
                      gap: "12px",
                      marginTop: "4px"
                    }}
                  >
                    <span style={{ color: "#10b981" }}>Active: {students.filter(s => s.status === "Active" || s.status === "ACTIVE").length}</span>
                    <span style={{ color: "#ef4444" }}>Suspended: {students.filter(s => s.status === "Suspended" || s.status === "BLOCKED").length}</span>
                  </div>
                </div>

                {/* Most Liked Institute */}
=======
                      color: "#10b981"
                    }}
                  >
                    +4.2%
                  </div>
                </div>

                {/* Platform Revenue */}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    border: "1px solid #eef0f6",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#94a3b8",
                      marginBottom: "8px"
                    }}
                  >
<<<<<<< HEAD
                    Most Liked Institute
                  </div>
                  {(() => {
                    const isTied = topRatedInstitute && topRatedInstitute.tiedInstitutes && topRatedInstitute.tiedInstitutes.length > 1;
                    if (isTied) {
                      return (
                        <div
                          onClick={() => setShowTopRatedModal(true)}
                          style={{
                            fontSize: "15px",
                            fontWeight: "700",
                            color: "#5b46f6",
                            marginBottom: "6px",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 10px",
                            backgroundColor: "#f0eeff",
                            borderRadius: "10px",
                            border: "1px solid #e2ddff",
                            transition: "all 0.2s ease"
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e4e0ff")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f0eeff")}
                          title="Click to view all top-rated institutes"
                        >
                          Multiple top institutes <span style={{ fontSize: "12px", fontWeight: "600", textDecoration: "underline" }}>(Click to view)</span>
                        </div>
                      );
                    }
                    return (
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: "800",
                          color: "#0f172a",
                          marginBottom: "6px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                        title={topRatedInstitute ? topRatedInstitute.name : ""}
                      >
                        {topRatedInstitute ? topRatedInstitute.name : (debugError ? "ERROR!" : "Loading...")}
                      </div>
                    );
                  })()}
                  {debugError && (
                    <div style={{ color: "red", fontSize: "12px", fontWeight: "bold", padding: "8px", backgroundColor: "#fee2e2", borderRadius: "8px", marginBottom: "8px" }}>
                      Failed to fetch top institute: {debugError}
                    </div>
                  )}
                  {!topRatedInstitute && !debugError && (
                    <div style={{ color: "#f59e0b", fontSize: "12px", fontWeight: "bold" }}>
                      Waiting for API response...
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    {(() => {
                      const rating = Number((topRatedInstitute && topRatedInstitute.rating) || 0);
                      const stars = [];
                      for (let i = 1; i <= 5; i++) {
                        if (i <= Math.floor(rating)) {
                          stars.push(<FaStar key={i} style={{ color: "#fbbf24", filter: "drop-shadow(0px 2px 4px rgba(251,191,36,0.5))" }} />);
                        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                          stars.push(<FaStarHalfAlt key={i} style={{ color: "#fbbf24", filter: "drop-shadow(0px 2px 4px rgba(251,191,36,0.5))" }} />);
                        } else {
                          stars.push(<FaRegStar key={i} style={{ color: "#cbd5e1" }} />);
                        }
                      }
                      return (
                        <>
                          {stars}
                          <span style={{ fontSize: "14px", fontWeight: "700", color: "#475569", marginLeft: "6px" }}>
                            {Number(rating || 0).toFixed(1)}
                          </span>
                        </>
                      );
                    })()}
=======
                    Platform revenue
                  </div>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "800",
                      color: "#0f172a",
                      marginBottom: "6px"
                    }}
                  >
                    ₹1.82Cr
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#10b981"
                    }}
                  >
                    +9.1%
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                  </div>
                </div>

                {/* Open Tickets */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    border: "1px solid #eef0f6",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#94a3b8",
                      marginBottom: "8px"
                    }}
                  >
<<<<<<< HEAD
                    Institute Rating
=======
                    Open tickets
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                  </div>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "800",
                      color: "#0f172a",
                      marginBottom: "6px"
                    }}
                  >
<<<<<<< HEAD
                    {Number(avgRating || 0).toFixed(1)} / 5.0
=======
                    23
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
<<<<<<< HEAD
                      color: "#10b981"
                    }}
                  >
                    average rating
=======
                      color: "#d97706"
                    }}
                  >
                    needs review
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              {/* Middle Row: Pending Approvals */}
=======
              {/* Middle Row: Pending Institute Approvals */}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
              <div
                style={{
                  marginBottom: "28px"
                }}
              >
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "18px",
                    padding: "24px",
                    border: "1px solid #eef0f6",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#0f172a",
                      marginBottom: "20px"
                    }}
                  >
<<<<<<< HEAD
                    Pending Approvals
=======
                    Pending institute approvals
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px"
                    }}
                  >
                    {pendingApprovalsList.length > 0 ? (
                      pendingApprovalsList.map((item) => (
                        <div
<<<<<<< HEAD
                          key={`${item.type}-${item.id}`}
=======
                          key={item.id}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "16px 20px",
                            borderRadius: "14px",
                            backgroundColor: "#f8fafc",
                            border: "1px solid #f1f5f9"
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: "700",
<<<<<<< HEAD
                                color: "#0f172a",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                              }}
                            >
                              {item.name}
                              <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "8px", backgroundColor: item.type === "course" ? "#e0e7ff" : "#fef3c7", color: item.type === "course" ? "#4338ca" : "#d97706", fontWeight: "700" }}>
                                {item.type.toUpperCase()}
                              </span>
=======
                                color: "#0f172a"
                              }}
                            >
                              {item.name}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#94a3b8",
<<<<<<< HEAD
                                marginTop: "4px"
                              }}
                            >
                              {item.subtext}
                            </div>
                          </div>

                          {/* Action Buttons: Trigger Yes/No Confirmation */}
=======
                                marginTop: "2px"
                              }}
                            >
                              Applied {item.appliedDate}
                            </div>
                          </div>

                          {/* Action Buttons: Direct Approve & Reject */}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                          <div
                            style={{
                              display: "flex",
                              gap: "8px"
                            }}
                          >
                            <button
                              onClick={() =>
<<<<<<< HEAD
                                item.type === "course"
                                  ? setConfirmModal({ isOpen: true, type: "approve_course", id: item.id, name: item.name })
                                  : handleApproveInstitute(item.id, item.name)
=======
                                handleApproveInstitute(item.id, item.name)
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                              }
                              style={{
                                padding: "8px 18px",
                                borderRadius: "10px",
                                backgroundColor: "#5b46f6",
                                color: "#ffffff",
                                border: "none",
                                fontSize: "13px",
                                fontWeight: "600",
                                cursor: "pointer",
                                boxShadow:
                                  "0 2px 8px rgba(91, 70, 246, 0.3)"
                              }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
<<<<<<< HEAD
                                item.type === "course"
                                  ? setConfirmModal({ isOpen: true, type: "reject_course", id: item.id, name: item.name })
                                  : handleRejectInstitute(item.id, item.name)
=======
                                handleRejectInstitute(item.id, item.name)
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                              }
                              style={{
                                padding: "8px 18px",
                                borderRadius: "10px",
                                backgroundColor: "#ffffff",
                                color: "#ef4444",
                                border: "1px solid #fca5a5",
                                fontSize: "13px",
                                fontWeight: "600",
                                cursor: "pointer"
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "32px 0",
                          color: "#94a3b8",
                          fontSize: "14px"
                        }}
                      >
                        No pending approvals remaining.
                      </div>
                    )}
                  </div>
                </div>
              </div>
<<<<<<< HEAD
            </div>
          )}

          {/* ================= 2. INSTITUTES VIEW ================= */}
          {activeTab === "institutes" && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "24px"
                }}
              >
                <h1
                  style={{
                    fontSize: "26px",
                    fontWeight: "700",
                    color: "#0f172a"
                  }}
                >
                  Institutes
                </h1>

                {/* Local Search bar for Institutes */}
                <div
                  style={{
                    position: "relative",
                    width: "280px"
                  }}
                >
                  <FiSearch
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#94a3b8"
                    }}
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search Institutes..."
                    value={instituteSearch}
                    onChange={(e) => setInstituteSearch(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 16px 8px 36px",
                      borderRadius: "20px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      fontSize: "13px",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* Status Filter Pills */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "24px"
                }}
              >
                {["all", "pending", "approved", "rejected"].map((flt) => {
                  const isActive = instituteFilter === flt;
                  return (
                    <button
                      key={flt}
                      onClick={() => setInstituteFilter(flt)}
                      style={{
                        padding: "8px 20px",
                        borderRadius: "20px",
                        border: "none",
                        backgroundColor: isActive ? "#5b46f6" : "#ffffff",
                        color: isActive ? "#ffffff" : "#64748b",
                        fontWeight: "600",
                        fontSize: "13px",
                        cursor: "pointer",
                        textTransform: "capitalize",
                        boxShadow: isActive
                          ? "0 4px 12px rgba(91, 70, 246, 0.3)"
                          : "0 1px 3px rgba(0,0,0,0.05)"
                      }}
                    >
                      {flt}
                    </button>
                  );
                })}
              </div>

              {/* Institutes Table Card */}
=======

              {/* Bottom Row: Recent Activity Table */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  padding: "24px",
                  border: "1px solid #eef0f6",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#0f172a",
                    marginBottom: "20px"
                  }}
                >
                  Recent activity
                </h3>

                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "13px"
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid #e2e8f0",
                        textAlign: "left"
                      }}
                    >
                      <th
                        style={{
                          padding: "12px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px",
                          letterSpacing: "0.5px"
                        }}
                      >
                        EVENT
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px",
                          letterSpacing: "0.5px"
                        }}
                      >
                        ACTOR
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px",
                          letterSpacing: "0.5px"
                        }}
                      >
                        TIME
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivities.map((act) => (
                      <tr
                        key={act.id}
                        style={{
                          borderBottom: "1px solid #f1f5f9"
                        }}
                      >
                        <td
                          style={{
                            padding: "16px",
                            fontWeight: "500",
                            color: "#5b46f6"
                          }}
                        >
                          {act.event}
                        </td>
                        <td style={{ padding: "16px", color: "#64748b" }}>
                          {act.actor}
                        </td>
                        <td style={{ padding: "16px", color: "#94a3b8" }}>
                          {act.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= 2. INSTITUTES VIEW ================= */}
          {activeTab === "institutes" && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "24px"
                }}
              >
                <h1
                  style={{
                    fontSize: "26px",
                    fontWeight: "700",
                    color: "#0f172a"
                  }}
                >
                  Institutes
                </h1>

                {/* Local Search bar for Institutes */}
                <div
                  style={{
                    position: "relative",
                    width: "280px"
                  }}
                >
                  <FiSearch
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#94a3b8"
                    }}
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search Institutes..."
                    value={instituteSearch}
                    onChange={(e) => setInstituteSearch(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 16px 8px 36px",
                      borderRadius: "20px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      fontSize: "13px",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* Status Filter Pills */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "24px"
                }}
              >
                {["all", "pending", "approved", "rejected"].map((flt) => {
                  const isActive = instituteFilter === flt;
                  return (
                    <button
                      key={flt}
                      onClick={() => setInstituteFilter(flt)}
                      style={{
                        padding: "8px 20px",
                        borderRadius: "20px",
                        border: "none",
                        backgroundColor: isActive ? "#5b46f6" : "#ffffff",
                        color: isActive ? "#ffffff" : "#64748b",
                        fontWeight: "600",
                        fontSize: "13px",
                        cursor: "pointer",
                        textTransform: "capitalize",
                        boxShadow: isActive
                          ? "0 4px 12px rgba(91, 70, 246, 0.3)"
                          : "0 1px 3px rgba(0,0,0,0.05)"
                      }}
                    >
                      {flt}
                    </button>
                  );
                })}
              </div>

              {/* Institutes Table Card */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  padding: "24px",
                  border: "1px solid #eef0f6",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "13px"
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid #e2e8f0",
                        textAlign: "left"
                      }}
                    >
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        INSTITUTE
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        GSTIN
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        COURSES
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        APPLIED
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        STATUS
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px",
                          textAlign: "right"
                        }}
                      >
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInstitutes.map((inst) => (
                      <tr
                        key={inst.id}
                        style={{ borderBottom: "1px solid #f1f5f9" }}
                      >
                        <td style={{ padding: "16px" }}>
                          <div
                            style={{
                              fontWeight: "700",
                              color: "#0f172a"
                            }}
                          >
                            {inst.name}
                          </div>
                          <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                            {inst.city}
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            fontFamily: "monospace",
                            color: "#64748b"
                          }}
                        >
                          {inst.gstin}
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            fontWeight: "600",
                            color: "#334155"
                          }}
                        >
                          {inst.courses}
                        </td>
                        <td style={{ padding: "16px", color: "#64748b" }}>
                          {inst.appliedDate}
                        </td>
                        <td style={{ padding: "16px" }}>
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: "12px",
                              fontSize: "12px",
                              fontWeight: "700",
                              textTransform: "lowercase",
                              backgroundColor:
                                inst.status === "approved"
                                  ? "#dcfce7"
                                  : inst.status === "pending"
                                  ? "#fef3c7"
                                  : "#fee2e2",
                              color:
                                inst.status === "approved"
                                  ? "#166534"
                                  : inst.status === "pending"
                                  ? "#92400e"
                                  : "#991b1b"
                            }}
                          >
                            {inst.status}
                          </span>
                        </td>
                        <td style={{ padding: "16px", textAlign: "right" }}>
                          <div
                            style={{
                              display: "flex",
                              gap: "6px",
                              justifyContent: "flex-end"
                            }}
                          >
                            {inst.status === "pending" ? (
                              <>
                                <button
                                  onClick={() =>
                                    handleApproveInstitute(inst.id, inst.name)
                                  }
                                  style={{
                                    padding: "6px 14px",
                                    borderRadius: "8px",
                                    backgroundColor: "#5b46f6",
                                    color: "#fff",
                                    border: "none",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                  }}
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    handleRejectInstitute(inst.id, inst.name)
                                  }
                                  style={{
                                    padding: "6px 14px",
                                    borderRadius: "8px",
                                    backgroundColor: "#fff",
                                    color: "#ef4444",
                                    border: "1px solid #fca5a5",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                  }}
                                >
                                  Reject
                                </button>
                              </>
                            ) : inst.status === "approved" ? (
                              <button
                                onClick={() =>
                                  handleRejectInstitute(inst.id, inst.name)
                                }
                                style={{
                                  padding: "6px 14px",
                                  borderRadius: "8px",
                                  backgroundColor: "#fff",
                                  color: "#ef4444",
                                  border: "1px solid #e2e8f0",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  cursor: "pointer"
                                }}
                              >
                                Block / Reject
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleApproveInstitute(inst.id, inst.name)
                                }
                                style={{
                                  padding: "6px 14px",
                                  borderRadius: "8px",
                                  backgroundColor: "#fff",
                                  color: "#5b46f6",
                                  border: "1px solid #c7d2fe",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  cursor: "pointer"
                                }}
                              >
                                Approve
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= 3. USERS VIEW ================= */}
          {activeTab === "users" && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "24px"
                }}
              >
                <h1
                  style={{
                    fontSize: "26px",
                    fontWeight: "700",
                    color: "#0f172a"
                  }}
                >
                  Users
                </h1>

                {/* Local Search bar for Users */}
                <div style={{ position: "relative", width: "280px" }}>
                  <FiSearch
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#94a3b8"
                    }}
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 16px 8px 36px",
                      borderRadius: "20px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      fontSize: "13px",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* User Filter Pills */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "24px"
                }}
              >
                {[
                  { id: "all", label: "All" },
                  { id: "student", label: "Student" },
                  { id: "institute", label: "Institute Admin" },
                  { id: "admin", label: "Admin" }
                ].map((flt) => {
                  const isActive = userFilter === flt.id;
                  return (
                    <button
                      key={flt.id}
                      onClick={() => setUserFilter(flt.id)}
                      style={{
                        padding: "8px 20px",
                        borderRadius: "20px",
                        border: "none",
                        backgroundColor: isActive ? "#5b46f6" : "#ffffff",
                        color: isActive ? "#ffffff" : "#64748b",
                        fontWeight: "600",
                        fontSize: "13px",
                        cursor: "pointer",
                        boxShadow: isActive
                          ? "0 4px 12px rgba(91, 70, 246, 0.3)"
                          : "0 1px 3px rgba(0,0,0,0.05)"
                      }}
                    >
                      {flt.label}
                    </button>
                  );
                })}
              </div>

              {/* Users Table */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  padding: "24px",
                  border: "1px solid #eef0f6",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "13px"
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid #e2e8f0",
                        textAlign: "left"
                      }}
                    >
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        NAME
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        EMAIL
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        ROLE
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        JOINED
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        STATUS
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px",
                          textAlign: "right"
                        }}
                      >
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((usr) => (
                      <tr
                        key={usr.id}
                        style={{ borderBottom: "1px solid #f1f5f9" }}
                      >
                        <td
                          style={{
                            padding: "16px",
                            fontWeight: "700",
                            color: "#0f172a"
                          }}
                        >
                          {usr.name}
                        </td>
                        <td style={{ padding: "16px", color: "#64748b" }}>
                          {usr.email}
                        </td>
                        <td style={{ padding: "16px" }}>
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: "12px",
                              fontSize: "11px",
                              fontWeight: "700",
                              backgroundColor:
                                usr.role === "Admin"
                                  ? "#0f172a"
                                  : "#e0e7ff",
                              color:
                                usr.role === "Admin" ? "#ffffff" : "#4338ca"
                            }}
                          >
                            {usr.role}
                          </span>
                        </td>
                        <td style={{ padding: "16px", color: "#64748b" }}>
                          {usr.joined}
                        </td>
                        <td style={{ padding: "16px" }}>
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: "12px",
                              fontSize: "11px",
                              fontWeight: "700",
                              backgroundColor:
                                usr.status === "Active"
                                  ? "#e0f2fe"
                                  : "#fee2e2",
                              color:
                                usr.status === "Active"
                                  ? "#0369a1"
                                  : "#991b1b"
                            }}
                          >
                            {usr.status}
                          </span>
                        </td>
                        <td style={{ padding: "16px", textAlign: "right" }}>
                          {usr.role !== "Admin" && (
                            <button
                              onClick={() => handleToggleUserStatus(usr.id)}
                              style={{
                                padding: "6px 14px",
                                borderRadius: "8px",
                                backgroundColor: "#ffffff",
                                color:
                                  usr.status === "Active"
                                    ? "#64748b"
                                    : "#10b981",
                                border: "1px solid #e2e8f0",
                                fontSize: "12px",
                                fontWeight: "600",
                                cursor: "pointer"
                              }}
                            >
                              {usr.status === "Active"
                                ? "Suspend"
                                : "Reactivate"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= 4. REVENUE VIEW ================= */}
          {activeTab === "revenue" && (
            <div>
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  color: "#0f172a",
                  marginBottom: "24px"
                }}
              >
                Revenue
              </h1>

              {/* Stat Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                  marginBottom: "28px"
                }}
              >
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid #eef0f6"
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#94a3b8",
                      marginBottom: "8px"
                    }}
                  >
                    This month
                  </div>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "800",
                      color: "#0f172a",
                      marginBottom: "6px"
                    }}
                  >
                    ₹18.4L
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#10b981"
                    }}
                  >
                    +9.1% vs last month
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid #eef0f6"
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#94a3b8",
                      marginBottom: "8px"
                    }}
                  >
                    Platform commission
                  </div>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "800",
                      color: "#0f172a",
                      marginBottom: "6px"
                    }}
                  >
                    ₹2.76L
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#64748b"
                    }}
                  >
                    15% avg. take rate
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid #eef0f6"
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#94a3b8",
                      marginBottom: "8px"
                    }}
                  >
                    Lifetime revenue
                  </div>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "800",
                      color: "#0f172a",
                      marginBottom: "6px"
                    }}
                  >
                    ₹1.82Cr
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#64748b"
                    }}
                  >
                    Since 2023
                  </div>
                </div>
              </div>

              {/* Revenue by Institute Table */}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  padding: "24px",
<<<<<<< HEAD
                  border: "1px solid #eef0f6",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                }}
              >
=======
                  border: "1px solid #eef0f6"
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#0f172a",
                    marginBottom: "20px"
                  }}
                >
                  Revenue by institute
                </h3>

>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "13px"
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid #e2e8f0",
                        textAlign: "left"
                      }}
                    >
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        INSTITUTE
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
<<<<<<< HEAD
                        GSTIN
=======
                        REVENUE (MTD)
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
<<<<<<< HEAD
                        COURSES
=======
                        COMMISSION
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
<<<<<<< HEAD
                        APPLIED
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        STATUS
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px",
                          textAlign: "right"
                        }}
                      >
                        ACTION
=======
                        PAYOUT STATUS
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                      </th>
                    </tr>
                  </thead>
                  <tbody>
<<<<<<< HEAD
                    {filteredInstitutes.map((inst) => (
=======
                    {institutes.map((inst) => (
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                      <tr
                        key={inst.id}
                        style={{ borderBottom: "1px solid #f1f5f9" }}
                      >
<<<<<<< HEAD
                        <td style={{ padding: "16px" }}>
                          <div
                            style={{
                              fontWeight: "700",
                              color: "#0f172a"
                            }}
                          >
                            {inst.name}
                          </div>
                          <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                            {inst.city}
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            fontFamily: "monospace",
                            color: "#64748b"
                          }}
                        >
                          {inst.gstin}
=======
                        <td
                          style={{
                            padding: "16px",
                            fontWeight: "700",
                            color: "#0f172a"
                          }}
                        >
                          {inst.name}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                        </td>
                        <td
                          style={{
                            padding: "16px",
<<<<<<< HEAD
                            fontWeight: "600",
                            color: "#334155"
                          }}
                        >
                          {inst.courses}
                        </td>
                        <td style={{ padding: "16px", color: "#64748b" }}>
                          {inst.appliedDate}
=======
                            fontWeight: "700",
                            color: "#334155"
                          }}
                        >
                          ₹{inst.revenue.toLocaleString()}
                        </td>
                        <td style={{ padding: "16px", color: "#64748b" }}>
                          ₹{inst.commission.toLocaleString()}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                        </td>
                        <td style={{ padding: "16px" }}>
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: "12px",
<<<<<<< HEAD
                              fontSize: "12px",
                              fontWeight: "700",
                              textTransform: "lowercase",
                              backgroundColor:
                                inst.status === "approved"
                                  ? "#dcfce7"
                                  : inst.status === "pending"
                                  ? "#fef3c7"
                                  : "#fee2e2",
                              color:
                                inst.status === "approved"
                                  ? "#166534"
                                  : inst.status === "pending"
                                  ? "#92400e"
                                  : "#991b1b"
                            }}
                          >
                            {inst.status}
                          </span>
                        </td>
                        <td style={{ padding: "16px", textAlign: "right" }}>
                          <div
                            style={{
                              display: "flex",
                              gap: "6px",
                              justifyContent: "flex-end"
                            }}
                          >
                            {inst.status === "pending" ? (
                              <>
                                <button
                                  onClick={() =>
                                    handleApproveInstitute(inst.id, inst.name)
                                  }
                                  style={{
                                    padding: "6px 14px",
                                    borderRadius: "8px",
                                    backgroundColor: "#5b46f6",
                                    color: "#fff",
                                    border: "none",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                  }}
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    handleRejectInstitute(inst.id, inst.name)
                                  }
                                  style={{
                                    padding: "6px 14px",
                                    borderRadius: "8px",
                                    backgroundColor: "#fff",
                                    color: "#ef4444",
                                    border: "1px solid #fca5a5",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                  }}
                                >
                                  Reject
                                </button>
                              </>
                            ) : inst.status === "approved" ? (
                              <button
                                onClick={() =>
                                  handleRejectInstitute(inst.id, inst.name)
                                }
                                style={{
                                  padding: "6px 14px",
                                  borderRadius: "8px",
                                  backgroundColor: "#fff",
                                  color: "#ef4444",
                                  border: "1px solid #e2e8f0",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  cursor: "pointer"
                                }}
                              >
                                Block / Reject
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleApproveInstitute(inst.id, inst.name)
                                }
                                style={{
                                  padding: "6px 14px",
                                  borderRadius: "8px",
                                  backgroundColor: "#fff",
                                  color: "#5b46f6",
                                  border: "1px solid #c7d2fe",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  cursor: "pointer"
                                }}
                              >
                                Approve
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredInstitutes.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ padding: "32px", textAlign: "center", color: "#64748b", fontWeight: "600" }}>
                          Institute is not available
                        </td>
                      </tr>
                    )}
=======
                              fontSize: "11px",
                              fontWeight: "700",
                              backgroundColor:
                                inst.payoutStatus === "paid"
                                  ? "#dcfce7"
                                  : inst.payoutStatus === "on_hold"
                                  ? "#fef3c7"
                                  : "#f1f5f9",
                              color:
                                inst.payoutStatus === "paid"
                                  ? "#166534"
                                  : inst.payoutStatus === "on_hold"
                                  ? "#92400e"
                                  : "#64748b"
                            }}
                          >
                            {inst.payoutStatus === "paid"
                              ? "Paid"
                              : inst.payoutStatus === "on_hold"
                              ? "On hold"
                              : "-"}
                          </span>
                        </td>
                      </tr>
                    ))}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                  </tbody>
                </table>
              </div>
            </div>
          )}

<<<<<<< HEAD
          {/* ================= COURSES VIEW ================= */}
          {activeTab === "courses" && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "24px"
                }}
              >
                <h1
                  style={{
                    fontSize: "26px",
                    fontWeight: "700",
                    color: "#0f172a"
                  }}
                >
                  Courses
                </h1>

                {/* Local Search bar for Courses */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    padding: "8px 16px",
                    border: "1px solid #eef0f6",
                    width: "300px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                  }}
                >
                  <FiSearch
                    color="#94a3b8"
                    size={18}
                    style={{ marginRight: "10px" }}
                  />
                  <input
                    type="text"
                    placeholder="Search course or institute..."
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    style={{
                      border: "none",
                      outline: "none",
                      width: "100%",
                      fontSize: "13px",
                      color: "#1e293b",
                      backgroundColor: "transparent"
                    }}
                  />
                  {courseSearch && (
                    <FiX
                      size={16}
                      color="#94a3b8"
                      style={{ cursor: "pointer", marginLeft: "8px" }}
                      onClick={() => setCourseSearch("")}
                    />
                  )}
                </div>
              </div>

              {/* Status Filter Pills for Courses */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "24px"
                }}
              >
                {["all", "pending", "approved", "rejected"].map((flt) => {
                  const isActive = courseFilter === flt;
                  return (
                    <button
                      key={flt}
                      onClick={() => setCourseFilter(flt)}
                      style={{
                        padding: "8px 20px",
                        borderRadius: "20px",
                        border: "none",
                        backgroundColor: isActive ? "#5b46f6" : "#ffffff",
                        color: isActive ? "#ffffff" : "#64748b",
                        fontWeight: "600",
                        fontSize: "13px",
                        cursor: "pointer",
                        textTransform: "capitalize",
                        boxShadow: isActive
                          ? "0 4px 12px rgba(91, 70, 246, 0.3)"
                          : "0 1px 3px rgba(0,0,0,0.05)"
                      }}
                    >
                      {flt}
                    </button>
                  );
                })}
              </div>

              {/* Courses Table */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  border: "1px solid #eef0f6",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px"
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#f8fafc",
                        borderBottom: "1px solid #e2e8f0",
                        textAlign: "left"
                      }}
                    >
                      <th style={{ padding: "14px 16px", fontWeight: "700", color: "#94a3b8", fontSize: "11px" }}>COURSE NAME</th>
                      <th style={{ padding: "14px 16px", fontWeight: "700", color: "#94a3b8", fontSize: "11px" }}>INSTITUTE</th>
                      <th style={{ padding: "14px 16px", fontWeight: "700", color: "#94a3b8", fontSize: "11px" }}>PRICE</th>
                      <th style={{ padding: "14px 16px", fontWeight: "700", color: "#94a3b8", fontSize: "11px" }}>DURATION</th>
                      <th style={{ padding: "14px 16px", fontWeight: "700", color: "#94a3b8", fontSize: "11px" }}>STATUS</th>
                      <th style={{ padding: "14px 16px", fontWeight: "700", color: "#94a3b8", fontSize: "11px", textAlign: "right" }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((crs) => {
                      const statusVal = (crs.approvalStatus || crs.status || "pending").toLowerCase();
                      const isAppr = statusVal === "approved" || statusVal === "active";
                      const isPend = statusVal === "pending";
                      return (
                        <tr key={crs.id || crs.courseId} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "16px" }}>
                            <div style={{ fontWeight: "700", color: "#0f172a" }}>{crs.title}</div>
                          </td>
                          <td style={{ padding: "16px", color: "#475569", fontWeight: "600" }}>
                            {crs.instituteName || "N/A"}
                          </td>
                          <td style={{ padding: "16px", color: "#10b981", fontWeight: "700" }}>
                            ₹{crs.price || 0}
                          </td>
                          <td style={{ padding: "16px", color: "#64748b" }}>
                            {crs.duration || "N/A"}
                          </td>
                          <td style={{ padding: "16px" }}>
                            <span
                              style={{
                                padding: "4px 12px",
                                borderRadius: "12px",
                                fontSize: "12px",
                                fontWeight: "700",
                                textTransform: "capitalize",
                                backgroundColor: isAppr ? "#dcfce7" : isPend ? "#fef3c7" : "#fee2e2",
                                color: isAppr ? "#15803d" : isPend ? "#b45309" : "#b91c1c"
                              }}
                            >
                              {isAppr ? "Approved" : isPend ? "Pending" : "Rejected"}
                            </span>
                          </td>
                          <td style={{ padding: "16px", textAlign: "right" }}>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                              {isPend ? (
                                <>
                                  <button
                                    onClick={() => setConfirmModal({ isOpen: true, type: "approve_course", id: crs.id || crs.courseId, name: crs.title })}
                                    style={{
                                      padding: "6px 14px",
                                      borderRadius: "8px",
                                      backgroundColor: "#5b46f6",
                                      color: "#fff",
                                      border: "none",
                                      fontSize: "12px",
                                      fontWeight: "600",
                                      cursor: "pointer"
                                    }}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => setConfirmModal({ isOpen: true, type: "reject_course", id: crs.id || crs.courseId, name: crs.title })}
                                    style={{
                                      padding: "6px 14px",
                                      borderRadius: "8px",
                                      backgroundColor: "#fff",
                                      color: "#ef4444",
                                      border: "1px solid #fca5a5",
                                      fontSize: "12px",
                                      fontWeight: "600",
                                      cursor: "pointer"
                                    }}
                                  >
                                    Reject
                                  </button>
                                </>
                              ) : isAppr ? (
                                <button
                                  onClick={() => setConfirmModal({ isOpen: true, type: "reject_course", id: crs.id || crs.courseId, name: crs.title })}
                                  style={{
                                    padding: "6px 14px",
                                    borderRadius: "8px",
                                    backgroundColor: "#fff",
                                    color: "#ef4444",
                                    border: "1px solid #e2e8f0",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                  }}
                                >
                                  Reject / Block
                                </button>
                              ) : (
                                <button
                                  onClick={() => setConfirmModal({ isOpen: true, type: "approve_course", id: crs.id || crs.courseId, name: crs.title })}
                                  style={{
                                    padding: "6px 14px",
                                    borderRadius: "8px",
                                    backgroundColor: "#fff",
                                    color: "#5b46f6",
                                    border: "1px solid #c7d2fe",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                  }}
                                >
                                  Approve
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredCourses.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ padding: "32px", textAlign: "center", color: "#64748b", fontWeight: "600" }}>
                          No courses found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= 3. STUDENTS VIEW ================= */}
          {activeTab === "students" && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "24px"
                }}
              >
                <h1
                  style={{
                    fontSize: "26px",
                    fontWeight: "700",
                    color: "#0f172a"
                  }}
                >
                  Students
                </h1>

                {/* Local Search bar for Students */}
                <div style={{ position: "relative", width: "280px" }}>
                  <FiSearch
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#94a3b8"
                    }}
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 16px 8px 36px",
                      borderRadius: "20px",
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#ffffff",
                      fontSize: "13px",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* Student Filter Pills */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "24px"
                }}
              >
                {[
                  { id: "all", label: "All" },
                  { id: "active", label: "Active" },
                  { id: "suspended", label: "Suspended" }
                ].map((flt) => {
                  const isActive = studentFilter === flt.id;
                  return (
                    <button
                      key={flt.id}
                      onClick={() => setStudentFilter(flt.id)}
                      style={{
                        padding: "8px 20px",
                        borderRadius: "20px",
                        border: "none",
                        backgroundColor: isActive ? "#5b46f6" : "#ffffff",
                        color: isActive ? "#ffffff" : "#64748b",
                        fontWeight: "600",
                        fontSize: "13px",
                        cursor: "pointer",
                        boxShadow: isActive
                          ? "0 4px 12px rgba(91, 70, 246, 0.3)"
                          : "0 1px 3px rgba(0,0,0,0.05)"
                      }}
                    >
                      {flt.label}
                    </button>
                  );
                })}
              </div>

              {/* Users Table */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  padding: "24px",
                  border: "1px solid #eef0f6",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "13px"
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid #e2e8f0",
                        textAlign: "left"
                      }}
                    >
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        NAME
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        EMAIL
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        ROLE
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        JOINED
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        STATUS
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px",
                          textAlign: "right"
                        }}
                      >
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr
                        key={student.userId || student.id}
                        style={{ borderBottom: "1px solid #f1f5f9" }}
                      >
                        <td
                          style={{
                            padding: "16px",
                            fontWeight: "700",
                            color: "#0f172a"
                          }}
                        >
                          {student.name}
                        </td>
                        <td style={{ padding: "16px", color: "#64748b" }}>
                          {student.email}
                        </td>
                        <td style={{ padding: "16px" }}>
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: "12px",
                              fontSize: "11px",
                              fontWeight: "700",
                              backgroundColor: "#e0e7ff",
                              color: "#4338ca"
                            }}
                          >
                            Student
                          </span>
                        </td>
                        <td style={{ padding: "16px", color: "#64748b" }}>
                          {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : "Recently"}
                        </td>
                        <td style={{ padding: "16px" }}>
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: "12px",
                              fontSize: "11px",
                              fontWeight: "700",
                              backgroundColor:
                                student.status === "Active" || student.status === "ACTIVE"
                                  ? "#e0f2fe"
                                  : "#fee2e2",
                              color:
                                student.status === "Active" || student.status === "ACTIVE"
                                  ? "#0369a1"
                                  : "#991b1b"
                            }}
                          >
                            {student.status || "Active"}
                          </span>
                        </td>
                        <td style={{ padding: "16px", textAlign: "right" }}>
                            <button
                              onClick={() => handleToggleStudentStatus(student.userId || student.id, student.status || "Active", student.name)}
                              style={{
                                padding: "6px 14px",
                                borderRadius: "8px",
                                backgroundColor: "#ffffff",
                                color:
                                  student.status === "Active" || student.status === "ACTIVE"
                                    ? "#64748b"
                                    : "#10b981",
                                border: "1px solid #e2e8f0",
                                fontSize: "12px",
                                fontWeight: "600",
                                cursor: "pointer"
                              }}
                            >
                              {student.status === "Active" || student.status === "ACTIVE"
                                ? "Suspend"
                                : "Reactivate"}
                            </button>
                        </td>
                      </tr>
                    ))}
                    {filteredStudents.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ padding: "32px", textAlign: "center", color: "#64748b", fontWeight: "600" }}>
                          Student is not available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= 4. REVENUE VIEW ================= */}
          {activeTab === "revenue" && (
            <div>
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  color: "#0f172a",
                  marginBottom: "24px"
                }}
              >
                Revenue
              </h1>

              {/* Stat Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "20px",
                  marginBottom: "28px"
                }}
              >
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid #eef0f6"
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#94a3b8",
                      marginBottom: "8px"
                    }}
                  >
                    This month
                  </div>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "800",
                      color: "#0f172a",
                      marginBottom: "6px"
                    }}
                  >
                    ₹{(revenueStats.thisMonthRevenue || 0).toLocaleString()}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: revenueStats.percentageChange >= 0 ? "#10b981" : "#ef4444"
                    }}
                  >
                    {revenueStats?.percentageChange >= 0 ? "+" : ""}{Number(revenueStats?.percentageChange || 0).toFixed(1)}% vs last month
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "24px",
                    border: "1px solid #eef0f6"
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#94a3b8",
                      marginBottom: "8px"
                    }}
                  >
                    Lifetime revenue
                  </div>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "800",
                      color: "#0f172a",
                      marginBottom: "6px"
                    }}
                  >
                    ₹{(revenueStats.lifetimeRevenue || 0).toLocaleString()}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#64748b"
                    }}
                  >
                    Since start
                  </div>
                </div>
              </div>

              {/* Revenue by Institute Table */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  padding: "24px",
                  border: "1px solid #eef0f6"
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#0f172a",
                    marginBottom: "20px"
                  }}
                >
                  Revenue by institute
                </h3>

                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "13px"
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid #e2e8f0",
                        textAlign: "left"
                      }}
                    >
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        INSTITUTE
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        REVENUE
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        PERCENTAGE
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        CHANGE COMMISSION %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueData.map((data, index) => (
                      <tr
                        key={index}
                        style={{ borderBottom: "1px solid #f1f5f9" }}
                      >
                        <td
                          style={{
                            padding: "16px",
                            fontWeight: "700",
                            color: "#0f172a"
                          }}
                        >
                          {data.name}
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            fontWeight: "700",
                            color: "#334155"
                          }}
                        >
                          ₹{(data.revenue || 0).toLocaleString()}
                        </td>
                        <td style={{ padding: "16px", color: "#64748b" }}>
                          {data.commission || 15}%
                        </td>
                        <td style={{ padding: "16px" }}>
                          <CommissionSlider 
                            initialCommission={data.commission} 
                            instituteName={data.name} 
                            onUpdate={handleCommissionChange} 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

=======
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
          {/* ================= 5. ANALYTICS VIEW ================= */}
          {activeTab === "analytics" && (
            <div>
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  color: "#0f172a",
                  marginBottom: "24px"
                }}
              >
                Analytics
              </h1>

              {/* Platform Growth Banner Chart Visual */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  padding: "24px",
                  border: "1px solid #eef0f6",
                  marginBottom: "24px"
                }}
              >
<<<<<<< HEAD
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#0f172a",
                      margin: 0
                    }}
                  >
                    Category Performance (Revenue & Enrollments)
                  </h3>
                  
                  {/* Date Pickers */}
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    {/* Legend */}
                    <div style={{ display: "flex", gap: "12px", marginRight: "16px", fontSize: "11px", fontWeight: "600" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#5b46f6" }}>
                        <div style={{ width: "12px", height: "3px", backgroundColor: "#5b46f6" }}></div> Revenue (₹)
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#f59e0b" }}>
                        <div style={{ width: "12px", height: "3px", borderBottom: "2px dashed #f59e0b" }}></div> Enrollments (%)
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>From</span>
                      <input 
                        type="date"
                        value={growthDateRange.startDate}
                        onChange={(e) => setGrowthDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                          fontSize: "12px",
                          outline: "none",
                          color: "#334155"
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>To</span>
                      <input 
                        type="date"
                        value={growthDateRange.endDate}
                        onChange={(e) => setGrowthDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                          fontSize: "12px",
                          outline: "none",
                          color: "#334155"
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    height: "240px",
                    width: "100%",
                    position: "relative"
                  }}
                >
                  {growthData.length > 0 ? (() => {
                    const maxRev = Math.max(...growthData.map(d => d.revenue));
                    const maxPct = Math.max(...growthData.map(d => d.enrollmentPercentage));
                    const safeMaxRev = maxRev === 0 ? 100 : maxRev;
                    const safeMaxPct = maxPct === 0 ? 100 : maxPct;
                    
                    const svgWidth = 800; // Virtual coordinate space
                    const svgHeight = 220;
                    const paddingX = 40;
                    const paddingY = 30;

                    // Revenue Polygon Points
                    const revPoints = growthData.map((d, i) => {
                      const x = paddingX + (i * (svgWidth - 2 * paddingX) / (growthData.length <= 1 ? 1 : growthData.length - 1));
                      const y = (svgHeight - paddingY) - (d.revenue / safeMaxRev) * (svgHeight - 2 * paddingY);
                      return `${x},${y}`;
                    });
                    
                    // Enrollment Polygon Points
                    const pctPoints = growthData.map((d, i) => {
                      const x = paddingX + (i * (svgWidth - 2 * paddingX) / (growthData.length <= 1 ? 1 : growthData.length - 1));
                      const y = (svgHeight - paddingY) - (d.enrollmentPercentage / safeMaxPct) * (svgHeight - 2 * paddingY);
                      return `${x},${y}`;
                    });
                    
                    const firstX = revPoints[0].split(',')[0];
                    const lastX = revPoints[revPoints.length-1].split(',')[0];
                    const areaPoints = `${firstX},${svgHeight - paddingY} ${revPoints.join(' ')} ${lastX},${svgHeight - paddingY}`;

                    return (
                      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: "100%", height: "100%", overflow: "visible" }} preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#5b46f6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#5b46f6" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        
                        {/* Grid lines (horizontal) */}
                        {[0, 0.5, 1].map(ratio => (
                          <line 
                            key={ratio}
                            x1="0" 
                            y1={paddingY + ratio * (svgHeight - 2 * paddingY)} 
                            x2={svgWidth} 
                            y2={paddingY + ratio * (svgHeight - 2 * paddingY)} 
                            stroke="#f1f5f9" 
                            strokeWidth="1"
                            strokeDasharray="4 4"
                          />
                        ))}

                        {/* Revenue Filled Area */}
                        <polygon points={areaPoints} fill="url(#growthGradient)" />
                        
                        {/* Revenue Polygon Line */}
                        <polyline points={revPoints.join(' ')} fill="none" stroke="#5b46f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        
                        {/* Enrollment Polygon Line (Dashed) */}
                        <polyline points={pctPoints.join(' ')} fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" strokeLinejoin="round" />
                        
                        {/* Data Points */}
                        {growthData.map((d, i) => {
                          const [xRev, yRev] = revPoints[i].split(',');
                          const [xPct, yPct] = pctPoints[i].split(',');
                          
                          return (
                            <g key={i}>
                              {/* X-axis Category Label */}
                              <text x={xRev} y={svgHeight - 5} fontSize="11" fill="#64748b" textAnchor="middle" fontWeight="600">
                                {d.categoryName}
                              </text>
                              
                              {/* Revenue Circle & Label */}
                              <circle cx={xRev} cy={yRev} r="5" fill="#ffffff" stroke="#5b46f6" strokeWidth="2" />
                              <text x={xRev} y={yRev - 12} fontSize="11" fill="#5b46f6" textAnchor="middle" fontWeight="bold">
                                ₹{d.revenue.toLocaleString()}
                              </text>
                              
                              {/* Enrollment Circle & Label */}
                              <circle cx={xPct} cy={yPct} r="4" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
                              <text x={xPct} y={yPct + 20} fontSize="11" fill="#f59e0b" textAnchor="middle" fontWeight="bold">
                                {d.enrollmentPercentage}%
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    );
                  })() : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "14px" }}>
                      No performance data for the selected date range.
                    </div>
                  )}
=======
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#0f172a",
                    marginBottom: "20px"
                  }}
                >
                  Platform growth
                </h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "16px",
                    height: "140px",
                    paddingBottom: "10px"
                  }}
                >
                  {[
                    { month: "Feb", height: "40px" },
                    { month: "Mar", height: "60px" },
                    { month: "Apr", height: "50px" },
                    { month: "May", height: "85px" },
                    { month: "Jun", height: "100px" },
                    { month: "Jul", height: "135px", active: true }
                  ].map((bar, idx) => (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                        height: "100%",
                        justifyContent: "flex-end"
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: bar.height,
                          backgroundColor: bar.active ? "#5b46f6" : "#f1f5f9",
                          borderRadius: "10px",
                          transition: "all 0.3s"
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    marginTop: "8px"
                  }}
                >
                  New signups, Feb – Jul 2026
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                </div>
              </div>

              {/* Leaderboard and Category Distribution */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px"
                }}
              >
                {/* Top Institutes by Revenue */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "18px",
                    padding: "24px",
                    border: "1px solid #eef0f6"
                  }}
                >
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#0f172a",
                      marginBottom: "20px"
                    }}
                  >
                    Top institutes by revenue
                  </h3>

<<<<<<< HEAD
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {/* This Month Subsection */}
                    <div>
                      <h4 style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", marginBottom: "12px", textTransform: "uppercase" }}>
                        This Month
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {topInstitutes.thisMonth.length > 0 ? topInstitutes.thisMonth.map((top, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                            <div style={{
                              width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: "#64748b"
                            }}>
                              {idx + 1}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>
                                {top.name}
                              </div>
                              <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                                ₹{top.revenue.toLocaleString()} this month
                              </div>
                            </div>
                          </div>
                        )) : <div style={{ fontSize: "12px", color: "#94a3b8" }}>No data this month</div>}
                      </div>
                    </div>

                    {/* Lifetime Subsection */}
                    <div>
                      <h4 style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8", marginBottom: "12px", textTransform: "uppercase" }}>
                        Lifetime
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {topInstitutes.lifetime.length > 0 ? topInstitutes.lifetime.map((top, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                            <div style={{
                              width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: "#64748b"
                            }}>
                              {idx + 1}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>
                                {top.name}
                              </div>
                              <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                                ₹{top.revenue.toLocaleString()} lifetime
                              </div>
                            </div>
                          </div>
                        )) : <div style={{ fontSize: "12px", color: "#94a3b8" }}>No data available</div>}
                      </div>
                    </div>
=======
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px"
                    }}
                  >
                    {[
                      { rank: 1, name: "Nova Institute", rev: "₹2,84,000" },
                      { rank: 2, name: "GreenTech Academy", rev: "₹1,98,000" },
                      { rank: 3, name: "Quantum Skills Hub", rev: "₹52,000" }
                    ].map((top) => (
                      <div
                        key={top.rank}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px"
                        }}
                      >
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "8px",
                            backgroundColor: "#f1f5f9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: "700",
                            color: "#64748b"
                          }}
                        >
                          {top.rank}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "700",
                              color: "#0f172a"
                            }}
                          >
                            {top.name}
                          </div>
                          <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                            {top.rev} this month
                          </div>
                        </div>
                      </div>
                    ))}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                  </div>
                </div>

                {/* Category Distribution */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "18px",
                    padding: "24px",
                    border: "1px solid #eef0f6"
                  }}
                >
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#0f172a",
                      marginBottom: "20px"
                    }}
                  >
                    Category distribution
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px"
                    }}
                  >
<<<<<<< HEAD
                    {categoryDistribution.length > 0 ? (
                      categoryDistribution.map((item, idx) => (
                        <div key={idx}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "#475569",
                              marginBottom: "6px"
                            }}
                          >
                            <span>{item.name}</span>
                            <span>{item.percentage}%</span>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "8px",
                              backgroundColor: "#f1f5f9",
                              borderRadius: "4px",
                              overflow: "hidden"
                            }}
                          >
                            <div
                              style={{
                                width: `${item.percentage}%`,
                                height: "100%",
                                backgroundColor: "#5b46f6",
                                borderRadius: "4px"
                              }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                        No enrollment data available.
                      </div>
                    )}
=======
                    {[
                      { cat: "Design", pct: 28 },
                      { cat: "Development", pct: 24 },
                      { cat: "Data Science", pct: 21 },
                      { cat: "Business & Marketing", pct: 27 }
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#475569",
                            marginBottom: "6px"
                          }}
                        >
                          <span>{item.cat}</span>
                          <span>{item.pct}%</span>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: "8px",
                            backgroundColor: "#f1f5f9",
                            borderRadius: "4px",
                            overflow: "hidden"
                          }}
                        >
                          <div
                            style={{
                              width: `${item.pct}%`,
                              height: "100%",
                              backgroundColor: "#5b46f6",
                              borderRadius: "4px"
                            }}
                          />
                        </div>
                      </div>
                    ))}
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 6. SETTINGS VIEW ================= */}
          {activeTab === "settings" && (
            <div style={{ maxWidth: "800px" }}>
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  color: "#0f172a",
                  marginBottom: "24px"
                }}
              >
                Admin Settings
              </h1>

              {/* Admin Profile Card */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  padding: "28px",
                  border: "1px solid #eef0f6",
                  marginBottom: "24px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                }}
              >
                {/* Header row inside Card */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "24px"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px"
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        backgroundColor: "#5b46f6",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                        fontSize: "18px"
                      }}
                    >
                      SR
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#0f172a"
                        }}
                      >
                        {adminProfile.name}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#94a3b8"
                        }}
                      >
                        {adminProfile.role}
                      </div>
                    </div>
                  </div>

                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 18px",
                        borderRadius: "20px",
                        backgroundColor: "#f1f5f9",
                        color: "#5b46f6",
                        border: "none",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      <FiEdit2 size={14} /> Edit
                    </button>
                  )}
                </div>

                {/* Form / Display Content */}
                <form onSubmit={handleSaveProfile}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                      marginBottom: "20px"
                    }}
                  >
                    {/* Full Name field */}
                    <div
                      style={{
                        backgroundColor: "#f8fafc",
                        padding: "16px 20px",
                        borderRadius: "14px",
                        border: isEditingProfile
                          ? "1px solid #c7d2fe"
                          : "1px solid #f1f5f9"
                      }}
                    >
                      <label
                        style={{
                          display: "block",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#94a3b8",
                          marginBottom: "4px"
                        }}
                      >
                        Full name
                      </label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={adminProfile.name}
                          onChange={(e) =>
                            setAdminProfile({
                              ...adminProfile,
                              name: e.target.value
                            })
                          }
                          style={{
                            width: "100%",
                            padding: "6px 0",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#0f172a",
                            border: "none",
                            backgroundColor: "transparent",
                            outline: "none"
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#0f172a"
                          }}
                        >
                          {adminProfile.name}
                        </div>
                      )}
                    </div>

                    {/* Email field */}
                    <div
                      style={{
                        backgroundColor: "#f8fafc",
                        padding: "16px 20px",
                        borderRadius: "14px",
                        border: isEditingProfile
                          ? "1px solid #c7d2fe"
                          : "1px solid #f1f5f9"
                      }}
                    >
                      <label
                        style={{
                          display: "block",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#94a3b8",
                          marginBottom: "4px"
                        }}
                      >
                        Email
                      </label>
                      {isEditingProfile ? (
                        <input
                          type="email"
                          value={adminProfile.email}
                          onChange={(e) =>
                            setAdminProfile({
                              ...adminProfile,
                              email: e.target.value
                            })
                          }
                          style={{
                            width: "100%",
                            padding: "6px 0",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#0f172a",
                            border: "none",
                            backgroundColor: "transparent",
                            outline: "none"
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#0f172a"
                          }}
                        >
                          {adminProfile.email}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Access Level field */}
                  <div
                    style={{
                      backgroundColor: "#f8fafc",
                      padding: "16px 20px",
                      borderRadius: "14px",
                      border: isEditingProfile
                        ? "1px solid #c7d2fe"
                        : "1px solid #f1f5f9",
                      marginBottom: isEditingProfile ? "24px" : "0"
                    }}
                  >
                    <label
                      style={{
                        display: "block",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#94a3b8",
                        marginBottom: "4px"
                      }}
                    >
                      Access level
                    </label>
                    {isEditingProfile ? (
                      <select
                        value={adminProfile.accessLevel}
                        onChange={(e) =>
                          setAdminProfile({
                            ...adminProfile,
                            accessLevel: e.target.value
                          })
                        }
                        style={{
                          width: "100%",
                          padding: "6px 0",
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#0f172a",
                          border: "none",
                          backgroundColor: "transparent",
                          outline: "none"
                        }}
                      >
                        <option>Super Admin – full platform access</option>
                        <option>Admin – limited settings access</option>
                        <option>Support Admin – read only</option>
                      </select>
                    ) : (
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#0f172a"
                        }}
                      >
                        {adminProfile.accessLevel}
                      </div>
                    )}
                  </div>

                  {/* Save Changes & Cancel Buttons when editing */}
                  {isEditingProfile && (
                    <div
                      style={{
                        display: "flex",
                        gap: "12px"
                      }}
                    >
                      <button
                        type="submit"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 24px",
                          borderRadius: "12px",
                          backgroundColor: "#5b46f6",
                          color: "#ffffff",
                          border: "none",
                          fontSize: "13px",
                          fontWeight: "600",
                          cursor: "pointer"
                        }}
                      >
                        <FiCheck size={16} /> Save changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 24px",
                          borderRadius: "12px",
                          backgroundColor: "#ffffff",
                          color: "#64748b",
                          border: "1px solid #e2e8f0",
                          fontSize: "13px",
                          fontWeight: "600",
                          cursor: "pointer"
                        }}
                      >
                        <FiX size={16} /> Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>

<<<<<<< HEAD
=======
              {/* Platform Settings Card */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "18px",
                  padding: "28px",
                  border: "1px solid #eef0f6",
                  marginBottom: "28px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#0f172a",
                    marginBottom: "24px"
                  }}
                >
                  Platform settings
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px"
                  }}
                >
                  {/* Toggle 1 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#0f172a"
                        }}
                      >
                        Auto-approve verified institutes
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#94a3b8",
                          marginTop: "2px"
                        }}
                      >
                        Skip manual review for institutes with all documents
                        verified
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={platformSettings.autoApprove}
                      onChange={(e) =>
                        setPlatformSettings({
                          ...platformSettings,
                          autoApprove: e.target.checked
                        })
                      }
                      style={{
                        width: "44px",
                        height: "24px",
                        accentColor: "#5b46f6",
                        cursor: "pointer"
                      }}
                    />
                  </div>

                  {/* Toggle 2 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#0f172a"
                        }}
                      >
                        Maintenance mode
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#94a3b8",
                          marginTop: "2px"
                        }}
                      >
                        Temporarily disable student sign-ups platform-wide
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={platformSettings.maintenanceMode}
                      onChange={(e) =>
                        setPlatformSettings({
                          ...platformSettings,
                          maintenanceMode: e.target.checked
                        })
                      }
                      style={{
                        width: "44px",
                        height: "24px",
                        accentColor: "#5b46f6",
                        cursor: "pointer"
                      }}
                    />
                  </div>

                  {/* Toggle 3 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#0f172a"
                        }}
                      >
                        Email alerts for new tickets
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#94a3b8",
                          marginTop: "2px"
                        }}
                      >
                        Notify the admin team when a support ticket is opened
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={platformSettings.emailAlerts}
                      onChange={(e) =>
                        setPlatformSettings({
                          ...platformSettings,
                          emailAlerts: e.target.checked
                        })
                      }
                      style={{
                        width: "44px",
                        height: "24px",
                        accentColor: "#5b46f6",
                        cursor: "pointer"
                      }}
                    />
                  </div>
                </div>
              </div>

>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
              {/* Log Out Button */}
              <button
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 24px",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                  color: "#ef4444",
                  border: "1px solid #fca5a5",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(239, 68, 68, 0.05)"
                }}
              >
                <FiLogOut size={16} /> Log Out
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ================= INSTITUTE APPROVE/REJECT CONFIRMATION MODAL ================= */}
      {confirmModal.isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeIn 0.2s ease-out"
          }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes modalScaleUp {
              from { opacity: 0; transform: scale(0.92) translateY(10px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              padding: "36px 32px 32px 32px",
              maxWidth: "460px",
              width: "90%",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              textAlign: "center",
              animation: "modalScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor:
                  (confirmModal.type === "approve" || confirmModal.type === "approve_course") ? "#d1fae5" : "#fee2e2",
                color: (confirmModal.type === "approve" || confirmModal.type === "approve_course") ? "#10b981" : "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
                boxShadow:
                  (confirmModal.type === "approve" || confirmModal.type === "approve_course")
                    ? "0 10px 25px -5px rgba(16, 185, 129, 0.3)"
                    : "0 10px 25px -5px rgba(239, 68, 68, 0.3)"
              }}
            >
              {(confirmModal.type === "approve" || confirmModal.type === "approve_course") ? (
                <FiCheck size={32} />
              ) : (
                <FiX size={32} />
              )}
            </div>

            {/* Prompt text */}
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "12px",
                lineHeight: "1.4",
                letterSpacing: "-0.3px"
              }}
            >
              {confirmModal.type === "approve"
                ? `Do you want to Approve the institute ${confirmModal.name} !?`
                : confirmModal.type === "reject"
                ? `Do you want to Block or Reject the institute ${confirmModal.name} !?`
                : confirmModal.type === "approve_course"
                ? `Do you want to approve the course "${confirmModal.name}"?`
                : `Do you want to block/reject the course "${confirmModal.name}"?`}
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                marginBottom: "28px",
                lineHeight: "1.5"
              }}
            >
              {confirmModal.type === "approve"
                ? "This will grant the institute login access and enable them to manage courses."
                : confirmModal.type === "reject"
                ? "This will restrict the institute from accessing the platform and managing courses."
                : confirmModal.type === "approve_course"
                ? "This will make the course approved and visible to all students in the catalog."
                : "This will restrict the course from being accessed or displayed to students."}
            </p>

            {/* Action Buttons: Yes and No */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px"
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setConfirmModal({ isOpen: false, type: "", id: null, name: "" })
                }
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  borderRadius: "12px",
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  border: "1px solid #cbd5e1",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e2e8f0";
                  e.currentTarget.style.color = "#1e293b";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f1f5f9";
                  e.currentTarget.style.color = "#475569";
                }}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirmModal.type === "approve") {
                    executeApproveInstitute(confirmModal.id, confirmModal.name);
                  } else if (confirmModal.type === "reject") {
                    executeRejectInstitute(confirmModal.id, confirmModal.name);
                  } else if (confirmModal.type === "approve_course") {
                    executeApproveCourse(confirmModal.id, confirmModal.name);
                  } else if (confirmModal.type === "reject_course") {
                    executeRejectCourse(confirmModal.id, confirmModal.name);
                  }
                  setConfirmModal({ isOpen: false, type: "", id: null, name: "" });
                }}
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  borderRadius: "12px",
                  backgroundColor:
                    (confirmModal.type === "approve" || confirmModal.type === "approve_course") ? "#10b981" : "#ef4444",
                  color: "#ffffff",
                  border: "none",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow:
                    (confirmModal.type === "approve" || confirmModal.type === "approve_course")
                      ? "0 4px 14px rgba(16, 185, 129, 0.35)"
                      : "0 4px 14px rgba(239, 68, 68, 0.35)",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    (confirmModal.type === "approve" || confirmModal.type === "approve_course")
                      ? "0 6px 20px rgba(16, 185, 129, 0.45)"
                      : "0 6px 20px rgba(239, 68, 68, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    (confirmModal.type === "approve" || confirmModal.type === "approve_course")
                      ? "0 4px 14px rgba(16, 185, 129, 0.35)"
                      : "0 4px 14px rgba(239, 68, 68, 0.35)";
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STUDENT SUSPEND/REACTIVATE CONFIRMATION MODAL ================= */}
      {studentConfirmModal.isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeIn 0.2s ease-out"
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              padding: "36px 32px 32px 32px",
              maxWidth: "460px",
              width: "90%",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              textAlign: "center",
              animation: "modalScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor:
                  studentConfirmModal.action === "reactivate" ? "#d1fae5" : "#fee2e2",
                color:
                  studentConfirmModal.action === "reactivate" ? "#10b981" : "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
                boxShadow:
                  studentConfirmModal.action === "reactivate"
                    ? "0 10px 25px -5px rgba(16, 185, 129, 0.3)"
                    : "0 10px 25px -5px rgba(239, 68, 68, 0.3)"
              }}
            >
              {studentConfirmModal.action === "reactivate" ? (
                <FiCheck size={32} />
              ) : (
                <FiX size={32} />
              )}
            </div>

            {/* Prompt text */}
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "12px",
                lineHeight: "1.4",
                letterSpacing: "-0.3px"
              }}
            >
              {studentConfirmModal.action === "reactivate"
                ? `Do you want to Reactivate the student ${studentConfirmModal.name} !?`
                : `Do you want to Suspend the student ${studentConfirmModal.name} !?`}
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                marginBottom: "28px",
                lineHeight: "1.5"
              }}
            >
              {studentConfirmModal.action === "reactivate"
                ? "This will restore student login access and enable them to enroll in and access courses."
                : "This will restrict the student from logging in and accessing purchased courses."}
            </p>

            {/* Action Buttons: Yes and No */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px"
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setStudentConfirmModal({
                    isOpen: false,
                    action: "",
                    studentId: null,
                    name: "",
                    currentStatus: ""
                  })
                }
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  borderRadius: "12px",
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  border: "1px solid #cbd5e1",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e2e8f0";
                  e.currentTarget.style.color = "#1e293b";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f1f5f9";
                  e.currentTarget.style.color = "#475569";
                }}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => {
                  executeToggleStudentStatus(
                    studentConfirmModal.studentId,
                    studentConfirmModal.currentStatus
                  );
                  setStudentConfirmModal({
                    isOpen: false,
                    action: "",
                    studentId: null,
                    name: "",
                    currentStatus: ""
                  });
                }}
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  borderRadius: "12px",
                  backgroundColor:
                    studentConfirmModal.action === "reactivate"
                      ? "#10b981"
                      : "#ef4444",
                  color: "#ffffff",
                  border: "none",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow:
                    studentConfirmModal.action === "reactivate"
                      ? "0 4px 14px rgba(16, 185, 129, 0.35)"
                      : "0 4px 14px rgba(239, 68, 68, 0.35)",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    studentConfirmModal.action === "reactivate"
                      ? "0 6px 20px rgba(16, 185, 129, 0.45)"
                      : "0 6px 20px rgba(239, 68, 68, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    studentConfirmModal.action === "reactivate"
                      ? "0 4px 14px rgba(16, 185, 129, 0.35)"
                      : "0 4px 14px rgba(239, 68, 68, 0.35)";
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MULTIPLE TOP-RATED INSTITUTES MODAL ================= */}
      {showTopRatedModal && topRatedInstitute && topRatedInstitute.tiedInstitutes && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeIn 0.2s ease-out"
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "520px",
              width: "90%",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              animation: "modalScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                borderBottom: "1px solid #eef0f6",
                paddingBottom: "16px"
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#0f172a",
                    margin: 0,
                    letterSpacing: "-0.3px"
                  }}
                >
                  Top Most Liked Institutes
                </h3>
                <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0 0" }}>
                  These institutes share the highest rating on the platform.
                </p>
              </div>
              <button
                onClick={() => setShowTopRatedModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                  padding: "6px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <FiX size={22} />
              </button>
            </div>

            {/* List of Tied Institutes */}
            <div style={{ overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              {topRatedInstitute.tiedInstitutes.map((inst, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    backgroundColor: "#f8fafc",
                    borderRadius: "14px",
                    border: "1px solid #eef0f6"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        backgroundColor: "#5b46f6",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                        fontSize: "14px",
                        flexShrink: 0
                      }}
                    >
                      #{index + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>
                        {inst.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                        Top Rated Institute
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: "#fff", padding: "6px 12px", borderRadius: "10px", border: "1px solid #eef0f6", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                    <FaStar style={{ color: "#fbbf24" }} />
                    <span style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>
                      {Number(inst?.rating ?? topRatedInstitute?.rating ?? 0).toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Close button */}
            <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid #eef0f6", paddingTop: "16px" }}>
              <button
                type="button"
                onClick={() => setShowTopRatedModal(false)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "12px",
                  backgroundColor: "#5b46f6",
                  color: "#ffffff",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(91, 70, 246, 0.3)"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;