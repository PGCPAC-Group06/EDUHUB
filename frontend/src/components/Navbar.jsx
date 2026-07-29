import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg eduhub-navbar sticky-top">
      <div className="container-fluid px-4 px-lg-5 py-2">
        {/* Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <span className="eduhub-logo-badge">E</span>
          <span className="eduhub-brand-text">EduHub</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#eduhubNavContent"
          aria-controls="eduhubNavContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="eduhubNavContent">
          {/* Center links */}
          <ul className="navbar-nav mx-lg-auto gap-lg-4 mt-3 mt-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link eduhub-nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/explore-courses" className="nav-link eduhub-nav-link">
                Explore courses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/for-institutes" className="nav-link eduhub-nav-link">
                For institutes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/for-students" className="nav-link eduhub-nav-link">
                For students
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link eduhub-nav-link">
                About
              </Link>
            </li>
            
          </ul>

          {/* Right side buttons */}
          <div className="d-flex gap-2 mt-3 mt-lg-0">
            <Link to="/login" className="eduhub-btn-outline">
              Log in
            </Link>
            <Link to="/register" className="eduhub-btn-solid">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
