import api, { businessApi, transactionApi } from "./api";

export const studentService = {
  // 1. Fetch Student Profile
  async getStudentProfile(userId, authUser = null) {
    try {
      const response = await businessApi.get(`/api/student/profile`);
      return response.data;
    } catch (err) {
      console.error("Error fetching student profile:", err);
      return {};
    }
  },

  // 2. Update Profile
  async updateStudentProfile(profileData, userId = null) {
    try {
      const payload = {
        ...profileData,
        dateOfBirth: profileData.date_of_birth || profileData.dateOfBirth,
        collegeName: profileData.college_name || profileData.collegeName
      };
      const response = await businessApi.put(`/api/student/profile`, payload);
      return response.data;
    } catch (err) {
      console.error("Profile update error", err);
      throw err;
    }
  },

  // 3. Change Password (uses auth-service on default api)
  async changePassword(passwordPayload) {
    try {
      const response = await api.put("/api/auth/password", {
        currentPassword: passwordPayload.currentPassword,
        newPassword: passwordPayload.newPassword
      });
      return { success: true, message: response.data || "Password updated successfully!" };
    } catch (err) {
      console.error("Change password error", err);
      throw new Error(err.response?.data || "Failed to update password");
    }
  },

  // 4. Fetch Enrolled Courses
  async getEnrolledCourses(studentUserId) {
    try {
      const response = await transactionApi.get(`/api/enrollments`);
      return response.data || [];
    } catch (err) {
      console.error("Error fetching enrollments:", err);
      return [];
    }
  },

  // 5. Fetch Available Courses Catalog
  async getBrowseCatalog(filters = {}) {
    try {
      const response = await businessApi.get("/api/courses");
      let courses = response.data || [];

      if (filters.category && filters.category !== "All") {
        courses = courses.filter((c) => c.categoryName?.toLowerCase() === filters.category.toLowerCase() || c.category_name?.toLowerCase() === filters.category.toLowerCase());
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        courses = courses.filter(
          (c) =>
            c.title?.toLowerCase().includes(query) ||
            c.description?.toLowerCase().includes(query)
        );
      }
      if (filters.minPrice) {
        courses = courses.filter((c) => c.price >= Number(filters.minPrice));
      }
      if (filters.maxPrice) {
        courses = courses.filter((c) => c.price <= Number(filters.maxPrice));
      }

      return courses;
    } catch (err) {
      console.error("Error fetching catalog:", err);
      return [];
    }
  },

  // 6. Fetch Institutes List
  async getInstitutes() {
    try {
      const response = await businessApi.get("/api/institute/all");
      return response.data || [];
    } catch (err) {
      console.error("Error fetching institutes:", err);
      return [];
    }
  },

  // 7. Process Course Enrollment & Payment
  async processEnrollmentAndPayment({ studentUserId, course, paymentMethod }) {
    try {
      const payload = {
        courseId: course.course_id || course.courseId,
        paymentMethod: paymentMethod || "Credit Card",
        transactionId: "TXN_" + Date.now(),
        amount: course.price
      };
      const response = await transactionApi.post("/api/enrollments", payload);
      return response.data;
    } catch (err) {
      console.error("Enrollment failed:", err);
      throw new Error(err.response?.data?.message || err.response?.data || "Enrollment failed. Please try again.");
    }
  },

  // 8. Submit Review & Rating
  async submitReview({ enrollmentId, rating, comment }) {
    try {
      const payload = {
        enrollmentId: enrollmentId,
        rating: Number(rating),
        comment: comment
      };
      const response = await transactionApi.post("/api/reviews", payload);
      return response.data;
    } catch (err) {
      console.error("Review failed:", err);
      throw new Error("Failed to submit review.");
    }
  },

  // 9. Fetch Dashboard Summary
  async getDashboardSummary() {
    try {
      const enrollments = await this.getEnrolledCourses();
      return {
        coursesInProgress: enrollments.filter((e) => (e.progress || 0) < 100).length,
        certificatesEarned: 0,
        enrollments: enrollments,
        activities: [], 
      };
    } catch (err) {
      console.error("Error fetching summary:", err);
      return {
        coursesInProgress: 0,
        certificatesEarned: 0,
        enrollments: [],
        activities: [],
      };
    }
  },

  // 10. Fetch Certificates
  async getCertificates() {
    return []; 
  },

  // 11. Fetch Categories
  async getCategories() {
    try {
      const response = await businessApi.get("/api/categories");
      return response.data || [];
    } catch (err) {
      console.error("Error fetching categories:", err);
      return [];
    }
  }
};
