import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop"; 

function AppContent() {
  const location = useLocation();

  const hideLayout = [
    "/login",
    "/register",
    "/forgot-password",
  ].includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Navbar />}

      <AppRoutes />

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;