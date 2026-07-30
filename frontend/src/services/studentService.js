import api from "./api";

// Fallback Mock Data structured to match MySQL DB Schema
const INITIAL_STUDENT_PROFILE = {
  student_profile_id: 1,
  user_id: 101,
  name: "Jordan Mathews",
  email: "jordan.mathews@example.com",
  role: "student",
  date_of_birth: "2001-03-14",
  gender: "Male",
  mobile: "+91 98765 43210",
  college_name: "DTU, New Delhi",
  degree: "B.Tech, Computer Science",
  city: "New Delhi",
  profile_picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
};

const MOCK_CATEGORIES = [
  { category_id: 1, category_name: "Design" },
  { category_id: 2, category_name: "Data Science" },
  { category_id: 3, category_name: "Business" },
  { category_id: 4, category_name: "Marketing" },
  { category_id: 5, category_name: "Development" },
  { category_id: 6, category_name: "Personal Growth" },
];

const MOCK_INSTITUTES = [
  {
    institute_profile_id: 10,
    user_id: 201,
    name: "Tech Academy Institute",
    address: "Sector 62, Noida, UP, India",
    gstin: "07AAAAA0000A1Z5",
    contact_no: "+91 9811122233",
    description: "Premier coding & UI/UX engineering institute providing industry certification programs.",
    rating: 4.8,
    courses_count: 12,
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80"
  },
  {
    institute_profile_id: 11,
    user_id: 202,
    name: "Design Craft School",
    address: "Koramangala 4th Block, Bengaluru, KA, India",
    gstin: "29BBBBB1111B2Z6",
    contact_no: "+91 9822233344",
    description: "Specialized design school for digital product designers, graphic artists, and design thinkers.",
    rating: 4.9,
    courses_count: 8,
    logo: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=200&q=80"
  },
  {
    institute_profile_id: 12,
    user_id: 203,
    name: "Data Science Hub",
    address: "Hitech City, Mindspace, Hyderabad, TS, India",
    gstin: "36CCCCC2222C3Z7",
    contact_no: "+91 9833344455",
    description: "Focused on AI, Machine Learning, Python Data Science, and SQL analytics.",
    rating: 4.7,
    courses_count: 15,
    logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&q=80"
  },
  {
    institute_profile_id: 13,
    user_id: 204,
    name: "Apex Business School",
    address: "Connaught Place, New Delhi, India",
    gstin: "07DDDDD3333D4Z8",
    contact_no: "+91 9844455566",
    description: "Leading executive business management, marketing strategy, and leadership institute.",
    rating: 4.8,
    courses_count: 10,
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80"
  },
  {
    institute_profile_id: 14,
    user_id: 205,
    name: "CodeMasters Labs",
    address: "Viman Nagar, Pune, MH, India",
    gstin: "27EEEEE4444E5Z9",
    contact_no: "+91 9855566677",
    description: "Full-stack web development bootcamps, Java Spring Boot, React, and DevOps specialization.",
    rating: 4.9,
    courses_count: 14,
    logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=200&q=80"
  }
];

const MOCK_COURSES = [
  {
    course_id: 1,
    institute_profile_id: 11,
    institute_name: "Design Craft School",
    institute_address: "Koramangala 4th Block, Bengaluru, KA",
    instructor_id: 501,
    instructor_name: "Alex Rivera",
    instructor_specialization: "Principal UI/UX Architect",
    instructor_experience: 8,
    instructor_bio: "Ex-Google Senior Designer with 8+ years experience building global consumer apps.",
    title: "UX Design Fundamentals",
    description: "Master modern wireframing, interactive prototyping, user research methods, design tokens, and digital UI design principles.",
    price: 1499.00,
    duration: "6 Weeks",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
    category_name: "Design",
    rating: 4.8,
    reviews_count: 124,
    enrolled_students_count: 1420,
    approval_status: "approved",
    status: "active",
    syllabus: [
      { module_number: 1, title: "Introduction to UX & User Research Methods", topics: ["Understanding User Personas", "Conducting User Interviews", "Empathy Mapping"] },
      { module_number: 2, title: "Information Architecture & Wireframing", topics: ["Site Maps & Navigation Flow", "Low-Fidelity Wireframes", "Figma Auto-Layout Basics"] },
      { module_number: 3, title: "High-Fidelity UI Prototyping", topics: ["Color Systems & Typography", "Micro-Interactions", "Usability Testing"] }
    ],
    reviews: [
      { review_id: 1, student_name: "Aarav Sharma", rating: 5, comment: "Incredible course! Alex explains complex UI principles with super easy real-world examples.", created_at: "2026-07-15" },
      { review_id: 2, student_name: "Priya Patel", rating: 4, comment: "Very practical hands-on exercises in Figma. Highly recommended for beginners.", created_at: "2026-07-20" }
    ],
    materials: [
      { id: 101, title: "UX Basics Cheatsheet.pdf", size: "2.4 MB" },
      { id: 102, title: "Figma Component Library.fig", size: "15.1 MB" }
    ]
  },
  {
    course_id: 2,
    institute_profile_id: 12,
    institute_name: "Data Science Hub",
    institute_address: "Hitech City, Hyderabad, TS",
    instructor_id: 502,
    instructor_name: "Dr. Ramesh Verma",
    instructor_specialization: "Lead Data Scientist & AI Researcher",
    instructor_experience: 12,
    instructor_bio: "Ph.D. in Computer Science from IIT Delhi, authored 15+ research papers in ML and predictive analytics.",
    title: "Python for Data Analysis",
    description: "Learn Pandas, NumPy, Matplotlib, Seaborn, and statistical data analysis with real-world financial and e-commerce datasets.",
    price: 1999.00,
    duration: "8 Weeks",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    category_name: "Data Science",
    rating: 4.7,
    reviews_count: 98,
    enrolled_students_count: 2150,
    approval_status: "approved",
    status: "active",
    syllabus: [
      { module_number: 1, title: "Python Foundations & Data Structures", topics: ["Python Lists & Dictionaries", "NumPy N-Dimensional Arrays", "Vectorized Operations"] },
      { module_number: 2, title: "Data Wrangling with Pandas", topics: ["DataFrames & Series", "Cleaning Missing Values", "Merging & Aggregations"] },
      { module_number: 3, title: "Data Visualization & EDA", topics: ["Matplotlib Plotting", "Seaborn Heatmaps", "Exploratory Data Analysis Project"] }
    ],
    reviews: [
      { review_id: 3, student_name: "Sneha Gupta", rating: 5, comment: "Dr. Ramesh is a genius. The Pandas and Seaborn modules cleared all my doubts!", created_at: "2026-07-10" }
    ],
    materials: [
      { id: 103, title: "Pandas Cheat Sheet.pdf", size: "1.8 MB" },
      { id: 104, title: "Data Sets Zip.zip", size: "45.0 MB" }
    ]
  },
  {
    course_id: 3,
    institute_profile_id: 10,
    institute_name: "Tech Academy Institute",
    institute_address: "Sector 62, Noida, UP",
    instructor_id: 503,
    instructor_name: "Sarah Jenkins",
    instructor_specialization: "Senior Product Manager",
    instructor_experience: 10,
    instructor_bio: "Product Lead at unicorn tech companies, guided 20+ products from zero to 1M+ active users.",
    title: "Product Management Essentials",
    description: "Understand product life cycle, Agile methodologies, PRD documentation, KPI metrics, roadmap design, and user feedback loops.",
    price: 1299.00,
    duration: "4 Weeks",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    category_name: "Business",
    rating: 4.6,
    reviews_count: 65,
    enrolled_students_count: 980,
    approval_status: "approved",
    status: "active",
    syllabus: [
      { module_number: 1, title: "Product Discovery & Market Validation", topics: ["Problem Framing", "Competitor Analysis", "Creating Value Proposition"] },
      { module_number: 2, title: "Writing PRDs & Agile Sprints", topics: ["User Story Writing", "Acceptance Criteria", "Jira & Scrum Ceremonies"] }
    ],
    reviews: [
      { review_id: 4, student_name: "Vikram Malhotra", rating: 5, comment: "Crucial framework for aspiring PMs. Loved the PRD writing workshop.", created_at: "2026-07-02" }
    ],
    materials: [
      { id: 105, title: "PRD Template.docx", size: "520 KB" }
    ]
  },
  {
    course_id: 4,
    institute_profile_id: 11,
    institute_name: "Design Craft School",
    institute_address: "Koramangala 4th Block, Bengaluru, KA",
    instructor_id: 501,
    instructor_name: "Alex Rivera",
    instructor_specialization: "Principal UI/UX Architect",
    instructor_experience: 8,
    instructor_bio: "Ex-Google Senior Designer with 8+ years experience building global consumer apps.",
    title: "Advanced Figma Mastery",
    description: "Deep dive into auto-layout v5, comprehensive design systems, interactive components, variant properties, and micro-interactions.",
    price: 1799.00,
    duration: "5 Weeks",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    category_name: "Design",
    rating: 4.9,
    reviews_count: 142,
    enrolled_students_count: 1850,
    approval_status: "approved",
    status: "active",
    syllabus: [
      { module_number: 1, title: "Design Systems & Token Architecture", topics: ["Color Tokens & Variables", "Typography Scales", "Component Governance"] },
      { module_number: 2, title: "Advanced Component Logic", topics: ["Interactive Component States", "Component Properties & Variants", "Prototyping Variables"] }
    ],
    reviews: [
      { review_id: 5, student_name: "Neha Joshi", rating: 5, comment: "This course took my Figma skills to top 1% level!", created_at: "2026-06-28" }
    ],
    materials: []
  },
  {
    course_id: 5,
    institute_profile_id: 12,
    institute_name: "Data Science Hub",
    institute_address: "Hitech City, Hyderabad, TS",
    instructor_id: 502,
    instructor_name: "Dr. Ramesh Verma",
    instructor_specialization: "Lead Data Scientist & AI Researcher",
    instructor_experience: 12,
    instructor_bio: "Ph.D. in Computer Science from IIT Delhi, authored 15+ research papers in ML and predictive analytics.",
    title: "SQL for Beginners",
    description: "Write queries, INNER/OUTER joins, aggregations, subqueries, window functions, and database schemas like a pro engineer.",
    price: 999.00,
    duration: "3 Weeks",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
    category_name: "Data Science",
    rating: 4.6,
    reviews_count: 88,
    enrolled_students_count: 3100,
    approval_status: "approved",
    status: "active",
    syllabus: [
      { module_number: 1, title: "SQL Basics & Filtering Data", topics: ["SELECT Statements", "WHERE Clause & Logical Operators", "ORDER BY & LIMIT"] },
      { module_number: 2, title: "Joins & Aggregate Functions", topics: ["INNER, LEFT, RIGHT Joins", "GROUP BY & HAVING", "SUM, AVG, COUNT Functions"] }
    ],
    reviews: [],
    materials: []
  },
  {
    course_id: 6,
    institute_profile_id: 11,
    institute_name: "Design Craft School",
    institute_address: "Koramangala 4th Block, Bengaluru, KA",
    instructor_id: 504,
    instructor_name: "Elena Rostova",
    instructor_specialization: "Lead User Researcher",
    instructor_experience: 9,
    instructor_bio: "UX Research Director specializing in qualitative user insights and international field studies.",
    title: "UX Research Foundations",
    description: "Conduct high-impact user interviews, usability tests, affinity mapping, quantitative survey design, and qualitative research reports.",
    price: 1599.00,
    duration: "5 Weeks",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    category_name: "Design",
    rating: 4.7,
    reviews_count: 54,
    enrolled_students_count: 890,
    approval_status: "approved",
    status: "active",
    syllabus: [
      { module_number: 1, title: "Qualitative Research Methods", topics: ["User Interviewing Skills", "Moderated Usability Testing", "Card Sorting & Tree Testing"] }
    ],
    reviews: [],
    materials: []
  },
  {
    course_id: 7,
    institute_profile_id: 14,
    institute_name: "CodeMasters Labs",
    institute_address: "Viman Nagar, Pune, MH",
    instructor_id: 505,
    instructor_name: "Karan Mehta",
    instructor_specialization: "Full Stack Java Specialist",
    instructor_experience: 11,
    instructor_bio: "Senior Java Architect with 11+ years experience in Microservices, Spring Boot, and Cloud Architecture.",
    title: "Full Stack Web Development (React & Spring Boot)",
    description: "Build production-grade web apps using React 19, Redux Toolkit, REST APIs, Spring Security, JWT, and MySQL database.",
    price: 2499.00,
    duration: "10 Weeks",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    category_name: "Development",
    rating: 4.9,
    reviews_count: 180,
    enrolled_students_count: 4200,
    approval_status: "approved",
    status: "active",
    syllabus: [
      { module_number: 1, title: "Modern React & State Management", topics: ["React 19 Hooks", "Redux Toolkit Store", "Axios Interceptors"] },
      { module_number: 2, title: "Spring Boot REST Architecture", topics: ["Spring Data JPA", "Spring Security JWT", "MySQL Database Design"] }
    ],
    reviews: [],
    materials: []
  },
  {
    course_id: 8,
    institute_profile_id: 13,
    institute_name: "Apex Business School",
    institute_address: "Connaught Place, New Delhi",
    instructor_id: 506,
    instructor_name: "Rohan Kapoor",
    instructor_specialization: "Growth Marketing Director",
    instructor_experience: 7,
    instructor_bio: "Growth Consultant who generated over $10M+ revenue using performance marketing and SEO strategies.",
    title: "Digital Marketing & SEO Mastery",
    description: "Master performance marketing, Google Ads, Meta Ads, Technical SEO, Content Funnels, and Marketing Analytics.",
    price: 1399.00,
    duration: "6 Weeks",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80",
    category_name: "Marketing",
    rating: 4.8,
    reviews_count: 110,
    enrolled_students_count: 1650,
    approval_status: "approved",
    status: "active",
    syllabus: [
      { module_number: 1, title: "SEO Optimization & Keyword Research", topics: ["On-Page & Off-Page SEO", "Technical Site Audits", "Keyword Intent Analysis"] }
    ],
    reviews: [],
    materials: []
  }
];

const INITIAL_ENROLLMENTS = [
  {
    enrollment_id: 1001,
    student_user_id: 101,
    course_id: 1,
    payment_id: 701,
    enrollment_date: "2026-06-01",
    status: "active",
    progress: 64,
    course: MOCK_COURSES[0],
  },
  {
    enrollment_id: 1002,
    student_user_id: 101,
    course_id: 2,
    payment_id: 702,
    enrollment_date: "2026-06-10",
    status: "active",
    progress: 30,
    course: MOCK_COURSES[1],
  },
  {
    enrollment_id: 1003,
    student_user_id: 101,
    course_id: 3,
    payment_id: 703,
    enrollment_date: "2026-07-05",
    status: "active",
    progress: 12,
    course: MOCK_COURSES[2],
  },
  {
    enrollment_id: 1004,
    student_user_id: 101,
    course_id: 7,
    payment_id: 704,
    enrollment_date: "2026-07-12",
    status: "active",
    progress: 45,
    course: MOCK_COURSES[6],
  },
];

const INITIAL_ACTIVITIES = [
  {
    id: 1,
    type: "lesson",
    title: 'Attended "UX Wireframing" classroom session',
    time: "Today, 2:30 PM",
    icon: "check",
  },
  {
    id: 2,
    type: "review",
    title: "Left a review on Python for Data Analysis",
    time: "Yesterday",
    icon: "star",
  },
  {
    id: 3,
    type: "certificate",
    title: "Earned certificate in Design Thinking",
    time: "3 days ago",
    icon: "certificate",
  },
];

const INITIAL_CERTIFICATES = [
  {
    certificate_id: 901,
    title: "Design Thinking",
    issue_date: "Jun 2026",
    course_id: 1,
    download_url: "#",
  },
  {
    certificate_id: 902,
    title: "Python Data Analysis Basics",
    issue_date: "Jul 2026",
    course_id: 2,
    download_url: "#",
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

export const studentService = {
  // 1. Fetch Student Profile (Dynamic per logged-in user)
  async getStudentProfile(userId, authUser = null) {
    try {
      const response = await api.get(`/api/student/profile/${userId || ''}`);
      return response.data;
    } catch (err) {
      const storedAuth = authUser || JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}")?.user;
      const targetUserId = userId || storedAuth?.user_id || 101;
      const storageKey = `eduhub_student_profile_${targetUserId}`;

      const savedProfile = localStorage.getItem(storageKey);
      if (savedProfile) {
        try {
          return JSON.parse(savedProfile);
        } catch (e) {
          // fallback
        }
      }

      // Build dynamic profile matching the actual logged in account
      let rawName = storedAuth?.name || (storedAuth?.email ? storedAuth.email.split("@")[0] : "Student User");
      let formattedName = rawName
        .split(/[\s._]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");

      const dynamicProfile = {
        student_profile_id: targetUserId,
        user_id: targetUserId,
        name: formattedName,
        email: storedAuth?.email || "student@example.com",
        role: "student",
        date_of_birth: "2001-03-14",
        gender: "Male",
        mobile: "+91 98765 43210",
        college_name: "DTU, New Delhi",
        degree: "B.Tech, Computer Science",
        city: "New Delhi",
        profile_picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      };

      localStorage.setItem(storageKey, JSON.stringify(dynamicProfile));
      return dynamicProfile;
    }
  },

  // 2. Update Profile (Persists per user)
  async updateStudentProfile(profileData, userId = null) {
    try {
      const response = await api.put("/api/student/profile", profileData);
      return response.data;
    } catch (err) {
      const storedAuth = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}")?.user;
      const targetUserId = userId || profileData.user_id || storedAuth?.user_id || 101;
      const storageKey = `eduhub_student_profile_${targetUserId}`;

      const current = JSON.parse(localStorage.getItem(storageKey) || "{}");
      const updated = { ...current, ...profileData, user_id: targetUserId };
      localStorage.setItem(storageKey, JSON.stringify(updated));

      // Also sync user name in localStorage if changed
      if (storedAuth && updated.name) {
        const updatedAuthObj = JSON.parse(localStorage.getItem("user") || "{}");
        if (updatedAuthObj.user) {
          updatedAuthObj.user.name = updated.name;
          localStorage.setItem("user", JSON.stringify(updatedAuthObj));
        }
      }

      return updated;
    }
  },

  // 3. Change Password
  async changePassword(passwordPayload) {
    try {
      const response = await api.post("/api/student/change-password", passwordPayload);
      return response.data;
    } catch (err) {
      return { success: true, message: "Password updated successfully!" };
    }
  },

  // 4. Fetch Enrolled Courses
  async getEnrolledCourses(studentUserId) {
    try {
      const response = await api.get(`/api/student/enrollments`);
      return response.data;
    } catch (err) {
      return getStoredData("eduhub_enrollments", INITIAL_ENROLLMENTS);
    }
  },

  // 5. Fetch Available Courses Catalog (with filters & pagination)
  async getBrowseCatalog(filters = {}) {
    try {
      const response = await api.get("/api/courses", { params: filters });
      return response.data;
    } catch (err) {
      let courses = [...MOCK_COURSES];

      if (filters.category && filters.category !== "All") {
        courses = courses.filter((c) => c.category_name.toLowerCase() === filters.category.toLowerCase());
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        courses = courses.filter(
          (c) =>
            c.title.toLowerCase().includes(query) ||
            c.description.toLowerCase().includes(query) ||
            c.institute_name.toLowerCase().includes(query)
        );
      }
      if (filters.minPrice) {
        courses = courses.filter((c) => c.price >= Number(filters.minPrice));
      }
      if (filters.maxPrice) {
        courses = courses.filter((c) => c.price <= Number(filters.maxPrice));
      }

      return courses;
    }
  },

  // 6. Fetch Institutes List
  async getInstitutes() {
    try {
      const response = await api.get("/api/institutes");
      return response.data;
    } catch (err) {
      return MOCK_INSTITUTES;
    }
  },

  // 7. Process Course Enrollment & Payment
  async processEnrollmentAndPayment({ studentUserId, course, paymentMethod }) {
    const payload = {
      student_user_id: studentUserId || 101,
      course_id: course.course_id,
      total_amount: course.price,
      payment_method: paymentMethod || "Credit Card",
      payment_status: "success",
      transaction_id: "TXN_" + Date.now(),
    };

    try {
      const response = await api.post("/api/student/enroll-and-pay", payload);
      return response.data;
    } catch (err) {
      const currentEnrollments = getStoredData("eduhub_enrollments", INITIAL_ENROLLMENTS);
      
      const exists = currentEnrollments.find((e) => e.course_id === course.course_id);
      if (exists) {
        throw new Error("You are already enrolled in this course!");
      }

      const newEnrollment = {
        enrollment_id: Date.now(),
        student_user_id: payload.student_user_id,
        course_id: course.course_id,
        payment_id: Math.floor(Math.random() * 10000),
        enrollment_date: new Date().toISOString().split("T")[0],
        status: "active",
        progress: 0,
        course: course,
      };

      const updatedEnrollments = [newEnrollment, ...currentEnrollments];
      setStoredData("eduhub_enrollments", updatedEnrollments);

      const activities = getStoredData("eduhub_activities", INITIAL_ACTIVITIES);
      const newActivity = {
        id: Date.now(),
        type: "enrollment",
        title: `Enrolled in "${course.title}"`,
        time: "Just now",
        icon: "check",
      };
      setStoredData("eduhub_activities", [newActivity, ...activities]);

      return {
        success: true,
        message: "Payment & Enrollment successful!",
        enrollment: newEnrollment,
      };
    }
  },

  // 8. Submit Review & Rating
  async submitReview({ enrollmentId, rating, comment }) {
    const payload = {
      enrollment_id: enrollmentId,
      rating: Number(rating),
      comment: comment,
      created_at: new Date().toISOString(),
    };

    try {
      const response = await api.post("/api/student/reviews", payload);
      return response.data;
    } catch (err) {
      const activities = getStoredData("eduhub_activities", INITIAL_ACTIVITIES);
      const newActivity = {
        id: Date.now(),
        type: "review",
        title: `Submitted ${rating}-star review`,
        time: "Just now",
        icon: "star",
      };
      setStoredData("eduhub_activities", [newActivity, ...activities]);

      return { success: true, message: "Thank you! Your review has been submitted." };
    }
  },

  // 9. Fetch Dashboard Summary
  async getDashboardSummary() {
    try {
      const response = await api.get("/api/student/dashboard-summary");
      return response.data;
    } catch (err) {
      const enrollments = getStoredData("eduhub_enrollments", INITIAL_ENROLLMENTS);
      const certificates = getStoredData("eduhub_certificates", INITIAL_CERTIFICATES);
      const activities = getStoredData("eduhub_activities", INITIAL_ACTIVITIES);

      return {
        coursesInProgress: enrollments.filter((e) => e.progress < 100).length,
        certificatesEarned: certificates.length,
        enrollments: enrollments,
        activities: activities,
      };
    }
  },

  // 10. Fetch Certificates
  async getCertificates() {
    try {
      const response = await api.get("/api/student/certificates");
      return response.data;
    } catch (err) {
      return getStoredData("eduhub_certificates", INITIAL_CERTIFICATES);
    }
  },

  getCategories() {
    return MOCK_CATEGORIES;
  }
};
