import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  // Login nahi hai
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Role mismatch
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;