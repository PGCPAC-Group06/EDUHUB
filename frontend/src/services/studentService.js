import api, { businessApi, transactionApi } from "./api";

// Helper to get active user ID
const getUserId = (userId) => {
  if (userId) return userId;
  const storedAuth = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}")?.user;
  return storedAuth?.user_id || storedAuth?.userId || 101;
};

export const studentService = {
  // 1. Fetch Student Profile via business-service database
  async getStudentProfile(userId, authUser = null) {
    const storedAuth = authUser || JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}")?.user;
    const targetUserId = userId || storedAuth?.user_id || storedAuth?.userId || 101;
    const endpoint = targetUserId ? `/api/student/profile/${targetUserId}` : `/api/student/profile`;
    try {
      const response = await businessApi.get(endpoint);
      return response.data;
    } catch (err) {
      console.error("Get Profile Error:", err);
      throw err;
    }
  },

  // 2. Update Profile directly in database
  async updateStudentProfile(profileData, userId = null) {
    const storedAuth = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}")?.user;
    const targetUserId = userId || profileData.user_id || storedAuth?.user_id || storedAuth?.userId || 101;
    const endpoint = targetUserId ? `/api/student/profile/${targetUserId}` : `/api/student/profile`;
    const response = await businessApi.put(endpoint, profileData);
    return response.data;
  },

  // 3. Change Password
  async changePassword(passwordPayload) {
    try {
      const response = await api.put("/api/auth/password", {
        currentPassword: passwordPayload.currentPassword,
        newPassword: passwordPayload.newPassword || passwordPayload.new_password
      });
      return { success: true, message: response.data || "Password updated successfully!" };
    } catch (err) {
      try {
        const response = await api.post("/api/student/change-password", passwordPayload);
        return response.data;
      } catch (e) {
        throw new Error("Failed to change password. Please check your current password and try again.");
      }
    }
  },

  // 4. Fetch Enrolled Courses via transaction-service database
  async getEnrolledCourses(studentUserId) {
    try {
      const response = await transactionApi.get("/api/enrollments");
      const list = Array.isArray(response.data) ? response.data : [];
      return list.map(e => ({
        ...e,
        course_id: e.course_id || e.courseId || e.course?.course_id || e.course?.courseId,
        title: e.title || e.courseTitle || e.course?.title || "Enrolled Course",
        progress: e.progress !== undefined ? e.progress : 75,
        course: {
          ...(e.course || {}),
          course_id: e.course_id || e.courseId || e.course?.course_id || e.course?.courseId,
          title: e.title || e.courseTitle || e.course?.title || "Enrolled Course",
          thumbnail: e.thumbnail || e.course?.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500",
          institute_name: e.instituteName || e.course?.institute_name || e.course?.instituteName || "EduHub Institute",
          category_name: e.category || e.course?.category_name || "General"
        }
      }));
    } catch (err) {
      console.error("Get Enrollments API Error:", err);
      return [];
    }
  },

  // 5. Fetch Available Courses Catalog via business-service database with Search & Filters
  async getBrowseCatalog(filters = {}) {
    try {
      const response = await businessApi.get("/api/courses", { params: filters });
      let courses = (Array.isArray(response.data) ? response.data : []).map(c => ({
        ...c,
        course_id: c.course_id || c.courseId || c.id,
        title: c.title || c.courseName || "Course #" + (c.course_id || c.courseId || ""),
        category_name: c.category_name || c.category || c.categoryName || "Uncategorized",
        institute_name: c.institute_name || c.instituteName || "EduHub Partner Institute",
        price: Number(c.price || 0),
        description: c.description || "Comprehensive course training with verified certifications and interactive modules.",
        thumbnail: c.thumbnail || c.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500",
        rating: c.rating || 4.8,
        enrolled_students_count: c.enrolled_students_count || c.enrolledCount || 42,
        duration: c.duration || "4 Weeks"
      }));

      // Filter out rejected or inactive courses if present
      courses = courses.filter(c => (c.approval_status === "approved" || c.approvalStatus === "approved" || !c.approval_status) && (c.status !== "rejected" && c.status !== "inactive"));

      if (filters.category && filters.category !== "All" && filters.category !== "all") {
        const targetCat = filters.category.toLowerCase().trim();
        courses = courses.filter((c) => (c.category_name || "").toLowerCase().trim() === targetCat);
      }
      if (filters.institute && filters.institute !== "All" && filters.institute !== "all") {
        const targetInst = filters.institute.toLowerCase().trim();
        courses = courses.filter((c) => (c.institute_name || "").toLowerCase().trim() === targetInst);
      }
      if (filters.search) {
        const query = filters.search.toLowerCase().trim();
        courses = courses.filter(
          (c) =>
            (c.title || "").toLowerCase().includes(query) ||
            (c.description || "").toLowerCase().includes(query) ||
            (c.institute_name || "").toLowerCase().includes(query) ||
            (c.category_name || "").toLowerCase().includes(query)
        );
      }
      if (filters.minPrice !== undefined && filters.minPrice !== "" && filters.minPrice !== "all") {
        courses = courses.filter((c) => c.price >= Number(filters.minPrice));
      }
      if (filters.maxPrice !== undefined && filters.maxPrice !== "" && filters.maxPrice !== "all") {
        courses = courses.filter((c) => c.price <= Number(filters.maxPrice));
      }
      return courses;
    } catch (err) {
      console.error("Get Browse Catalog API Error:", err);
      return [];
    }
  },

  // 6. Fetch Institutes List from business-service database
  async getInstitutes() {
    try {
      const response = await businessApi.get("/api/institute/all");
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      console.error("Get Institutes API Error:", err);
      return [];
    }
  },

  // 7. Process Course Enrollment & Payment via transaction-service database
  async processEnrollmentAndPayment({ studentUserId, course, paymentMethod }) {
    const targetCourseId = course.course_id || course.courseId || course.id;
    try {
      const response = await transactionApi.post("/api/enrollments", {
        courseId: Number(targetCourseId),
        paymentMethod: paymentMethod || "Credit Card / Debit Card",
        transactionId: "TXN_" + Date.now(),
        amount: course.price !== undefined ? course.price : 4999.00
      });
      return {
        success: true,
        message: "Payment & Enrollment successful!",
        enrollment: response.data,
      };
    } catch (err) {
      console.error("Enrollment API Error:", err);
      const msg = err.response?.data?.message || err.response?.data || err.message || "Failed to process enrollment.";
      throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
    }
  },

  // 8. Submit Review & Rating via transaction-service database
  async submitReview({ enrollmentId, rating, comment, studentUserId }) {
    const payload = {
      enrollmentId: Number(enrollmentId),
      rating: Number(rating),
      comment: comment,
    };

    try {
      const response = await transactionApi.post("/api/reviews", payload);
      return { success: true, message: "Thank you! Your review has been submitted.", data: response.data };
    } catch (err) {
      console.error("Review API Error:", err);
      const msg = err.response?.data?.message || err.response?.data || err.message || "Failed to submit review.";
      throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
    }
  },

  // 9. Fetch Dashboard Summary via transaction-service database
  async getDashboardSummary(studentUserId) {
    try {
      const response = await transactionApi.get("/api/student/dashboard-summary");
      return response.data;
    } catch (err) {
      console.error("Dashboard Summary API Error:", err);
      return {
        coursesInProgress: 0,
        certificatesEarned: 0,
        enrollments: [],
        activities: [],
      };
    }
  },

  // 10. Fetch Certificates via transaction-service database
  async getCertificates(studentUserId) {
    try {
      const response = await transactionApi.get("/api/student/certificates");
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      console.error("Get Certificates API Error:", err);
      return [];
    }
  },

  // 11. Fetch Notifications via transaction-service database
  async getNotifications(studentUserId) {
    try {
      const response = await transactionApi.get("/api/student/notifications");
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      console.error("Get Notifications API Error:", err);
      return [];
    }
  },

  // 12. Fetch Categories from business-service database
  async getCategories() {
    try {
      const response = await businessApi.get("/api/categories");
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      console.error("Get Categories API Error:", err);
      return [];
    }
  }
};

export default studentService;
