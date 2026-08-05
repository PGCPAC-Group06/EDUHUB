import api, { businessApi } from "./api";

export const instituteService = {
  // 1. Fetch Institute Profile
  async getInstituteProfile(userId, authUser = null) {
    try {
      const response = await businessApi.get(`/api/institute/profile`);
      return {
        ...response.data,
        name: authUser?.name || response.data?.name || "Institute",
        email: authUser?.email || response.data?.email || "",
        contact_no: response.data?.contactNo || response.data?.contact_no || "",
      };
    } catch (err) {
      console.error("Error fetching institute profile", err);
      return {
        name: authUser?.name || "Institute",
        email: authUser?.email || "",
        address: "",
        gstin: "",
        contact_no: "",
        description: "",
      };
    }
  },

  // 2. Update Institute Profile
  async updateInstituteProfile(profileData, userId = null) {
    try {
      const payload = {
        ...profileData,
        contactNo: profileData.contact_no || profileData.contactNo
      };
      const response = await businessApi.put("/api/institute/profile", payload);
      return {
        ...response.data,
        name: profileData.name || response.data?.name || "Institute",
        email: profileData.email || response.data?.email || "",
        contact_no: response.data?.contactNo || response.data?.contact_no || profileData.contact_no || "",
      };
    } catch (err) {
      console.error("Error updating institute profile", err);
      throw err;
    }
  },

  // 3. Get Overview Metrics
  async getDashboardSummary() {
    try {
      const response = await businessApi.get("/api/institute/dashboard-summary");
      return response.data;
    } catch (err) {
      // Fallback formatting if summary endpoint unavailable
      const courses = await this.getCourses();
      return {
        stats: {
          totalStudents: 0,
          studentsWeeklyGrowth: "0 this week",
          activeCourses: courses.length,
          coursesMonthlyGrowth: "0 this month",
          revenueMtd: 0,
          revenueGrowth: "0%",
          avgRating: 0,
          pendingPayouts: 0,
          lifetimeRevenue: 0,
        },
        revenueTrend: [],
        recentReviews: [],
        recentEnrollments: [],
        recentTransactions: [],
      };
    }
  },

  // 4. Get Institute Courses
  async getCourses() {
    try {
      const response = await businessApi.get("/api/courses");
      return response.data || [];
    } catch (err) {
      console.error("Error fetching institute courses", err);
      return [];
    }
  },

  // 5. Add New Course (and map category via existing relationship)
  async createCourse(coursePayload) {
    try {
      const response = await businessApi.post("/api/courses", coursePayload);
      const createdCourse = response.data;
      
      // Link selected category using existing course_category database table relationship
      if (coursePayload.categoryId && createdCourse) {
        const courseId = createdCourse.course_id || createdCourse.courseId || createdCourse.id;
        if (courseId) {
          try {
            await businessApi.post("/api/course-categories", {
              courseId: courseId,
              categoryId: parseInt(coursePayload.categoryId)
            });
          } catch (mapErr) {
            console.warn("Category mapping warning:", mapErr);
          }
        }
      }
      return createdCourse;
    } catch (err) {
      console.error("Error creating course", err);
      throw new Error(err.response?.data || "Failed to create course");
    }
  },

  // 6. Update Course
  async updateCourse(courseId, coursePayload) {
    try {
      const response = await businessApi.put(`/api/courses/${courseId}`, coursePayload);
      return response.data;
    } catch (err) {
      console.error("Error updating course", err);
      throw new Error(err.response?.data || "Failed to update course");
    }
  },

  // 7. Delete Course
  async deleteCourse(courseId) {
    try {
      await businessApi.delete(`/api/courses/${courseId}`);
      return true;
    } catch (err) {
      console.error("Error deleting course", err);
      throw new Error("Failed to delete course");
    }
  },

  // 8. Get Enrolled Students
  async getStudents() {
    try {
      const response = await businessApi.get("/api/institute/students");
      return response.data || [];
    } catch (err) {
      console.error("Error fetching students", err);
      return [];
    }
  },

  // 9. Get Instructors from database
  async getInstructors() {
    try {
      const response = await businessApi.get("/api/instructors");
      return response.data || [];
    } catch (err) {
      console.error("Error fetching instructors", err);
      return [];
    }
  },

  // 10. Add Instructor
  async addInstructor(instructorPayload) {
    try {
      const response = await businessApi.post("/api/instructors", instructorPayload);
      return response.data;
    } catch (err) {
      console.error("Error adding instructor", err);
      throw err;
    }
  },

  // Update Instructor
  async updateInstructor(instructorId, instructorPayload) {
    try {
      const response = await businessApi.put(`/api/instructors/${instructorId}`, instructorPayload);
      return response.data;
    } catch (err) {
      console.error("Error updating instructor", err);
      throw err;
    }
  },

  // Delete Instructor
  async deleteInstructor(instructorId) {
    try {
      const response = await businessApi.delete(`/api/instructors/${instructorId}`);
      return response.data;
    } catch (err) {
      console.error("Error deleting instructor", err);
      throw err;
    }
  },

  // 11. Get Documents
  async getDocuments() {
    try {
      const response = await businessApi.get("/api/institute/documents");
      return response.data || [];
    } catch (err) {
      console.error("Error fetching documents", err);
      return [];
    }
  },

  // 12. Change Password (uses auth-service on default api)
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

  // 13. Get Categories from database
  async getCategories() {
    try {
      const response = await businessApi.get("/api/categories");
      return response.data || [];
    } catch (err) {
      console.error("Error fetching categories:", err);
      return [];
    }
  },
};
