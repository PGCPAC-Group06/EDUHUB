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
  FiX
} from "react-icons/fi";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState("overview");

  // Search queries
  const [globalSearch, setGlobalSearch] = useState("");
  const [instituteSearch, setInstituteSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  // Filters
  const [instituteFilter, setInstituteFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");

  // Profile Edit State (Settings)
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [adminProfile, setAdminProfile] = useState({
    name: "Sarah Rowe",
    email: "sarah.rowe@eduhub.com",
    role: "Platform administrator",
    accessLevel: "Super Admin – full platform access"
  });

  // Platform Toggles State (Settings)
  const [platformSettings, setPlatformSettings] = useState({
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

  // Fetch pending institutes from API if backend is running
  useEffect(() => {
    fetchBackendData();
  }, []);

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
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Institute Actions: Direct Approve and Reject
  const handleApproveInstitute = async (id, name) => {
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

  // Helper Filters
  const filteredInstitutes = institutes.filter((inst) => {
    const matchesFilter =
      instituteFilter === "all" || inst.status === instituteFilter;
    const matchesSearch =
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
                Admin Console
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
              { id: "users", label: "Users", icon: <FiUsers size={18} /> },
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
                    512
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#10b981"
                    }}
                  >
                    +12 this month
                  </div>
                </div>

                {/* Total Users */}
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
                    Total users
                  </div>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "800",
                      color: "#0f172a",
                      marginBottom: "6px"
                    }}
                  >
                    2.41M
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#10b981"
                    }}
                  >
                    +4.2%
                  </div>
                </div>

                {/* Platform Revenue */}
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
                    Open tickets
                  </div>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "800",
                      color: "#0f172a",
                      marginBottom: "6px"
                    }}
                  >
                    23
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#d97706"
                    }}
                  >
                    needs review
                  </div>
                </div>
              </div>

              {/* Middle Row: Pending Institute Approvals */}
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
                    Pending institute approvals
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
                          key={item.id}
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
                                color: "#0f172a"
                              }}
                            >
                              {item.name}
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#94a3b8",
                                marginTop: "2px"
                              }}
                            >
                              Applied {item.appliedDate}
                            </div>
                          </div>

                          {/* Action Buttons: Direct Approve & Reject */}
                          <div
                            style={{
                              display: "flex",
                              gap: "8px"
                            }}
                          >
                            <button
                              onClick={() =>
                                handleApproveInstitute(item.id, item.name)
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
                                handleRejectInstitute(item.id, item.name)
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
                        REVENUE (MTD)
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        COMMISSION
                      </th>
                      <th
                        style={{
                          padding: "14px 16px",
                          fontWeight: "700",
                          color: "#94a3b8",
                          fontSize: "11px"
                        }}
                      >
                        PAYOUT STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {institutes.map((inst) => (
                      <tr
                        key={inst.id}
                        style={{ borderBottom: "1px solid #f1f5f9" }}
                      >
                        <td
                          style={{
                            padding: "16px",
                            fontWeight: "700",
                            color: "#0f172a"
                          }}
                        >
                          {inst.name}
                        </td>
                        <td
                          style={{
                            padding: "16px",
                            fontWeight: "700",
                            color: "#334155"
                          }}
                        >
                          ₹{inst.revenue.toLocaleString()}
                        </td>
                        <td style={{ padding: "16px", color: "#64748b" }}>
                          ₹{inst.commission.toLocaleString()}
                        </td>
                        <td style={{ padding: "16px" }}>
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: "12px",
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
                  </tbody>
                </table>
              </div>
            </div>
          )}

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
    </div>
  );
}

export default AdminDashboard;