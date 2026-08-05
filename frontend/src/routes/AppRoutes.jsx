import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentDashboard from "../pages/StudentDashboard";
import InstituteDashboard from "../pages/InstituteDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";
import ForStudents from "../pages/ForStudents";
import AboutUs from "../pages/AboutUs";
import ForInstitutes from "../pages/Forinstitutes";
import ExploreCourses from "../pages/ExploreCourses";
import CourseDetail from "../pages/Coursedetail";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/for-students" element={<ForStudents />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/for-institutes" element={<ForInstitutes />} />
      <Route path="/explore-courses" element={<ExploreCourses />} />
      <Route path="/course/:id" element={<CourseDetail />} />
      

      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/institute-dashboard"
        element={
          <ProtectedRoute allowedRole="institute">
            <InstituteDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;