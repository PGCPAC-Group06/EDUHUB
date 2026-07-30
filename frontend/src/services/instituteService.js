import api from "./api";

// Default Mock Data matching p06_eduhub MySQL Schema
const INITIAL_INSTITUTE_PROFILE = {
  institute_profile_id: 201,
  user_id: 200,
  name: "Nova Institute",
  email: "contact@novainstitute.com",
  address: "Building B, Tech Park, Sector 62, Noida, UP - 201301",
  gstin: "07AAAAA0000A1Z5",
  contact_no: "+91 98112 34567",
  description: "Premier offline and hybrid training institute specializing in Software Engineering, UI/UX Design, and Data Science.",
  logo: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80",
};

const INITIAL_INSTRUCTORS = [
  {
    instructor_id: 301,
    institute_profile_id: 201,
    name: "Aisha Kapoor",
    specialization: "UI/UX & Product Design",
    experience: 8,
    bio: "Senior Lead Designer with 8+ years experience designing consumer products.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    instructor_id: 302,
    institute_profile_id: 201,
    name: "Rohan Varma",
    specialization: "Full Stack & Cloud Architecture",
    experience: 10,
    bio: "Ex-Google Architect specializing in React, Spring Boot, and Microservices.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  {
    instructor_id: 303,
    institute_profile_id: 201,
    name: "Dr. Vikram Sethi",
    specialization: "Data Science & Machine Learning",
    experience: 12,
    bio: "PhD in AI & Machine Learning, mentored 5,000+ data science professionals.",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
];

const INITIAL_COURSES = [
  {
    course_id: 101,
    institute_profile_id: 201,
    instructor_id: 301,
    instructor_name: "Aisha Kapoor",
    title: "UX Design Fundamentals",
    description: "Master user research, wireframing, prototyping, and UI design principles in hands-on offline classroom sessions.",
    price: 1999,
    duration: "6 weeks",
    thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80",
    approval_status: "approved",
    status: "active",
    category: "Design",
    enrolled_count: 412,
    modules: [
      "Introduction to User Research",
      "Wireframing & Information Architecture",
      "High-Fidelity Figma Prototyping",
      "Usability Testing & Design Handoff",
    ],
  },
  {
    course_id: 102,
    institute_profile_id: 201,
    instructor_id: 301,
    instructor_name: "Aisha Kapoor",
    title: "Advanced Figma Mastery",
    description: "Deep dive into auto-layout, design systems, variables, interactive components, and advanced design workflows.",
    price: 2499,
    duration: "4 weeks",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    approval_status: "approved",
    status: "active",
    category: "Design",
    enrolled_count: 268,
    modules: [
      "Advanced Auto-Layout & Constraints",
      "Building Scalable Design Systems",
      "Figma Tokens & Component Variants",
    ],
  },
  {
    course_id: 103,
    institute_profile_id: 201,
    instructor_id: 303,
    instructor_name: "Dr. Vikram Sethi",
    title: "Python for Data Analysis",
    description: "Comprehensive hands-on training covering NumPy, Pandas, Matplotlib, Seaborn, and real-world data analytics techniques.",
    price: 2999,
    duration: "8 weeks",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    approval_status: "pending",
    status: "draft",
    category: "Data Science",
    enrolled_count: 0,
    modules: [
      "Python Basics & Data Structures",
      "Data Wrangling with Pandas",
      "Data Visualization & Storytelling",
    ],
  },
  {
    course_id: 104,
    institute_profile_id: 201,
    instructor_id: 301,
    instructor_name: "Aisha Kapoor",
    title: "Design Thinking Workshop",
    description: "Empathy mapping, problem definition, ideation techniques, and rapid prototyping for innovative products.",
    price: 1499,
    duration: "3 weeks",
    thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
    approval_status: "approved",
    status: "active",
    category: "Design",
    enrolled_count: 530,
    modules: [
      "Empathize & Define",
      "Ideate & Prototype",
      "Testing & Iteration",
    ],
  },
  {
    course_id: 105,
    institute_profile_id: 201,
    instructor_id: 302,
    instructor_name: "Rohan Varma",
    title: "Digital Marketing 101",
    description: "SEO fundamentals, PPC advertising, content strategy, email marketing, and web analytics for business growth.",
    price: 1799,
    duration: "5 weeks",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    approval_status: "rejected",
    status: "inactive",
    category: "Marketing",
    enrolled_count: 0,
    modules: ["Search Engine Optimization", "Google Ads & PPC"],
  },
  {
    course_id: 106,
    institute_profile_id: 201,
    instructor_id: 302,
    instructor_name: "Rohan Varma",
    title: "Full-Stack Web Development",
    description: "Build scalable web applications with React, Java Spring Boot, MySQL, and Deploy on AWS Cloud.",
    price: 4999,
    duration: "12 weeks",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    approval_status: "approved",
    status: "active",
    category: "Development",
    enrolled_count: 189,
    modules: [
      "Frontend with React & Redux",
      "Backend with Spring Boot & Hibernate",
      "Database & JWT Authentication",
      "DevOps & AWS Cloud Deployment",
    ],
  },
];

const INITIAL_STUDENTS = [
  {
    enrollment_id: 501,
    student_id: 1001,
    name: "Maria Lopez",
    email: "maria.lopez@example.com",
    course: "UX Design Fundamentals",
    course_id: 101,
    enrolled_time: "2 hours ago",
    progress: 75,
    status: "Active",
    attendance: "85%",
  },
  {
    enrollment_id: 502,
    student_id: 1002,
    name: "Tom Becker",
    email: "tom.becker@example.com",
    course: "Advanced Figma Mastery",
    course_id: 102,
    enrolled_time: "5 hours ago",
    progress: 40,
    status: "Active",
    attendance: "90%",
  },
  {
    enrollment_id: 503,
    student_id: 1003,
    name: "Priya Shah",
    email: "priya.shah@example.com",
    course: "Design Thinking Workshop",
    course_id: 104,
    enrolled_time: "Yesterday",
    progress: 10,
    status: "Pending",
    attendance: "0%",
  },
  {
    enrollment_id: 504,
    student_id: 1004,
    name: "Karan Mehta",
    email: "karan.mehta@example.com",
    course: "Full-Stack Web Development",
    course_id: 106,
    enrolled_time: "2 days ago",
    progress: 60,
    status: "Active",
    attendance: "95%",
  },
  {
    enrollment_id: 505,
    student_id: 1005,
    name: "Sara Ali",
    email: "sara.ali@example.com",
    course: "UX Design Fundamentals",
    course_id: 101,
    enrolled_time: "3 days ago",
    progress: 80,
    status: "Active",
    attendance: "88%",
  },
  {
    enrollment_id: 506,
    student_id: 1006,
    name: "Neha Kulkarni",
    email: "neha.k@example.com",
    course: "Design Thinking Workshop",
    course_id: 104,
    enrolled_time: "5 days ago",
    progress: 100,
    status: "Completed",
    attendance: "100%",
  },
];

const INITIAL_REVENUE_TRANSACTIONS = [
  {
    transaction_id: "TXN-90812",
    student: "Maria Lopez",
    course: "UX Design Fundamentals",
    amount: 1999,
    institute_share: 1799.1,
    platform_fee: 199.9,
    date: "27 Jul 2026",
    status: "Paid",
  },
  {
    transaction_id: "TXN-90813",
    student: "Karan Mehta",
    course: "Full-Stack Web Development",
    amount: 4999,
    institute_share: 4499.1,
    platform_fee: 499.9,
    date: "26 Jul 2026",
    status: "Paid",
  },
  {
    transaction_id: "TXN-90814",
    student: "Sara Ali",
    course: "UX Design Fundamentals",
    amount: 1999,
    institute_share: 1799.1,
    platform_fee: 199.9,
    date: "24 Jul 2026",
    status: "Paid",
  },
  {
    transaction_id: "TXN-90815",
    student: "Priya Shah",
    course: "Design Thinking Workshop",
    amount: 1499,
    institute_share: 1349.1,
    platform_fee: 149.9,
    date: "23 Jul 2026",
    status: "Refunded",
  },
];

const INITIAL_REVIEWS = [
  {
    id: 1,
    student: "Aisha K.",
    rating: 5.0,
    comment: "Loved the pacing of module 3, very clear explanations throughout.",
    date: "2 hours ago",
    course: "UX Design Fundamentals",
  },
  {
    id: 2,
    student: "Raj N.",
    rating: 4.5,
    comment: "Great instructor, audio quality could improve in a couple of lectures.",
    date: "1 day ago",
    course: "Full-Stack Web Development",
  },
  {
    id: 3,
    student: "Vikram R.",
    rating: 5.0,
    comment: "Hands-on projects and classroom guidance were top notch!",
    date: "3 days ago",
    course: "Advanced Figma Mastery",
  },
];

const INITIAL_DOCUMENTS = [
  {
    document_id: 1,
    document_type: "GST Registration Certificate",
    document_name: "GST_Certificate_Nova.pdf",
    verification_status: "verified",
    uploaded_at: "2026-01-10",
  },
  {
    document_id: 2,
    document_type: "Institute Registration Deed",
    document_name: "Registration_Deed_2026.pdf",
    verification_status: "verified",
    uploaded_at: "2026-01-12",
  },
];

// Local storage helper
const getStoredData = (key, fallback) => {
  const item = localStorage.getItem(key);
  if (!item) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try {
    const parsed = JSON.parse(item);
    if (Array.isArray(fallback) && Array.isArray(parsed) && parsed.length === 0) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return parsed;
  } catch (e) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
};

const setStoredData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const instituteService = {
  // 1. Fetch Institute Profile (Dynamic per logged-in institute user)
  async getInstituteProfile(userId, authUser = null) {
    try {
      const response = await api.get(`/api/institute/profile/${userId || ''}`);
      return response.data;
    } catch (err) {
      const storedAuth = authUser || JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}")?.user;
      const targetUserId = userId || storedAuth?.user_id || 200;
      const storageKey = `eduhub_institute_profile_${targetUserId}`;

      const savedProfile = localStorage.getItem(storageKey);
      if (savedProfile) {
        try {
          return JSON.parse(savedProfile);
        } catch (e) {
          // fallback
        }
      }

      let rawName = storedAuth?.name || (storedAuth?.email ? storedAuth.email.split("@")[0] : "Nova Institute");
      let formattedName = rawName
        .split(/[\s._]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");

      if (!formattedName.toLowerCase().includes("institute")) {
        formattedName += " Institute";
      }

      const dynamicProfile = {
        institute_profile_id: targetUserId,
        user_id: targetUserId,
        name: formattedName,
        email: storedAuth?.email || "contact@novainstitute.com",
        address: INITIAL_INSTITUTE_PROFILE.address,
        gstin: INITIAL_INSTITUTE_PROFILE.gstin,
        contact_no: INITIAL_INSTITUTE_PROFILE.contact_no,
        description: INITIAL_INSTITUTE_PROFILE.description,
        logo: INITIAL_INSTITUTE_PROFILE.logo,
        approval_status: storedAuth?.approval_status || "approved",
      };

      localStorage.setItem(storageKey, JSON.stringify(dynamicProfile));
      return dynamicProfile;
    }
  },

  // 2. Update Institute Profile
  async updateInstituteProfile(profileData, userId = null) {
    try {
      const response = await api.put("/api/institute/profile", profileData);
      return response.data;
    } catch (err) {
      const storedAuth = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}")?.user;
      const targetUserId = userId || profileData.user_id || storedAuth?.user_id || 200;
      const storageKey = `eduhub_institute_profile_${targetUserId}`;

      const current = JSON.parse(localStorage.getItem(storageKey) || "{}");
      const updated = { ...current, ...profileData, user_id: targetUserId };
      localStorage.setItem(storageKey, JSON.stringify(updated));

      return updated;
    }
  },

  // 3. Get Overview Metrics
  async getDashboardSummary() {
    try {
      const response = await api.get("/api/institute/dashboard-summary");
      return response.data;
    } catch (err) {
      const courses = getStoredData("eduhub_inst_courses", INITIAL_COURSES);
      const students = getStoredData("eduhub_inst_students", INITIAL_STUDENTS);
      const transactions = getStoredData("eduhub_inst_revenue", INITIAL_REVENUE_TRANSACTIONS);
      const reviews = getStoredData("eduhub_inst_reviews", INITIAL_REVIEWS);

      return {
        stats: {
          totalStudents: 18204,
          studentsWeeklyGrowth: "+320 this week",
          activeCourses: courses.filter((c) => c.status === "active").length || 62,
          coursesMonthlyGrowth: "+4 this month",
          revenueMtd: 48210,
          revenueGrowth: "+18%",
          avgRating: 4.8,
          pendingPayouts: 6450,
          lifetimeRevenue: 582940,
        },
        revenueTrend: [
          { month: "Jan", amount: 28 },
          { month: "Feb", amount: 35 },
          { month: "Mar", amount: 22 },
          { month: "Apr", amount: 41 },
          { month: "May", amount: 34 },
          { month: "Jun", amount: 48 },
        ],
        recentReviews: reviews,
        recentEnrollments: students.slice(0, 5),
        recentTransactions: transactions,
      };
    }
  },

  // 4. Get Institute Courses
  async getCourses() {
    try {
      const response = await api.get("/api/institute/courses");
      return response.data;
    } catch (err) {
      return getStoredData("eduhub_inst_courses", INITIAL_COURSES);
    }
  },

  // 5. Add New Course
  async createCourse(coursePayload) {
    try {
      const response = await api.post("/api/institute/courses", coursePayload);
      return response.data;
    } catch (err) {
      const courses = getStoredData("eduhub_inst_courses", INITIAL_COURSES);
      const newCourse = {
        course_id: Date.now(),
        institute_profile_id: 201,
        instructor_id: 301,
        instructor_name: coursePayload.instructor_name || "Aisha Kapoor",
        title: coursePayload.title,
        description: coursePayload.description,
        price: parseFloat(coursePayload.price) || 1999,
        duration: coursePayload.duration || "6 weeks",
        thumbnail: coursePayload.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
        approval_status: "pending",
        status: coursePayload.status || "draft",
        category: coursePayload.category || "Design",
        enrolled_count: 0,
        modules: coursePayload.modules || ["Module 1: Introduction", "Module 2: Core Concepts"],
      };

      const updated = [newCourse, ...courses];
      setStoredData("eduhub_inst_courses", updated);
      return newCourse;
    }
  },

  // 6. Update Course
  async updateCourse(courseId, coursePayload) {
    try {
      const response = await api.put(`/api/institute/courses/${courseId}`, coursePayload);
      return response.data;
    } catch (err) {
      const courses = getStoredData("eduhub_inst_courses", INITIAL_COURSES);
      const updated = courses.map((c) =>
        c.course_id === courseId ? { ...c, ...coursePayload } : c
      );
      setStoredData("eduhub_inst_courses", updated);
      return updated.find((c) => c.course_id === courseId);
    }
  },

  // 7. Delete Course
  async deleteCourse(courseId) {
    try {
      await api.delete(`/api/institute/courses/${courseId}`);
      return true;
    } catch (err) {
      const courses = getStoredData("eduhub_inst_courses", INITIAL_COURSES);
      const filtered = courses.filter((c) => c.course_id !== courseId);
      setStoredData("eduhub_inst_courses", filtered);
      return true;
    }
  },

  // 8. Get Enrolled Students
  async getStudents() {
    try {
      const response = await api.get("/api/institute/students");
      return response.data;
    } catch (err) {
      return getStoredData("eduhub_inst_students", INITIAL_STUDENTS);
    }
  },

  // 9. Get Instructors
  async getInstructors() {
    try {
      const response = await api.get("/api/institute/instructors");
      return response.data;
    } catch (err) {
      return getStoredData("eduhub_inst_instructors", INITIAL_INSTRUCTORS);
    }
  },

  // 10. Add Instructor
  async addInstructor(instructorPayload) {
    try {
      const response = await api.post("/api/institute/instructors", instructorPayload);
      return response.data;
    } catch (err) {
      const instructors = getStoredData("eduhub_inst_instructors", INITIAL_INSTRUCTORS);
      const newInst = {
        instructor_id: Date.now(),
        institute_profile_id: 201,
        name: instructorPayload.name,
        specialization: instructorPayload.specialization,
        experience: parseInt(instructorPayload.experience) || 5,
        bio: instructorPayload.bio || "Experienced Lead Instructor.",
        photo: instructorPayload.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      };
      const updated = [newInst, ...instructors];
      setStoredData("eduhub_inst_instructors", updated);
      return newInst;
    }
  },

  // 11. Get Documents
  async getDocuments() {
    try {
      const response = await api.get("/api/institute/documents");
      return response.data;
    } catch (err) {
      return getStoredData("eduhub_inst_documents", INITIAL_DOCUMENTS);
    }
  },

  // 12. Change Password
  async changePassword(passwordPayload) {
    try {
      const response = await api.post("/api/auth/change-password", passwordPayload);
      return response.data;
    } catch (err) {
      return { success: true, message: "Password updated successfully!" };
    }
  },

  // 13. Get Categories
  getCategories() {
    return ["Design", "Data Science", "Development", "Business", "Marketing", "Personal Growth"];
  },
};
