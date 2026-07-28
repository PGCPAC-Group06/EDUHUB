import Navbar from "../components/Navbar";
import {
  FaCode,
  FaJava,
  FaChartBar,
  FaShieldAlt,
  FaAward,
  FaUser,
} from "react-icons/fa";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div
        className="text-white py-5"
        style={{
          background:
            "linear-gradient(rgba(31,41,55,0.75), rgba(31,41,55,0.75)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070') center/cover",
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container text-center">
          <h1 className="display-2 fw-bold mb-4">Welcome to EduHub</h1>
          <h4 className="fw-normal mb-4">
            Multi Institute Course Management Platform
          </h4>
          <p className="lead mb-4">
            Discover top courses from leading institutes and boost your career.
          </p>

          <button
            className="btn btn-lg px-5 py-3"
            style={{
              backgroundColor: "#d89b2b",
              color: "white",
              border: "none",
            }}
          >
            Explore Courses
          </button>
        </div>
      </div>

      {/* Featured Courses */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Featured Courses</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm border-0 p-4 h-100">
                <div className="mb-3 fs-1 text-secondary">
                  <FaCode />
                </div>
                <h4>MERN Stack Development</h4>
                <p>
                  Learn MongoDB, Express, React and Node from scratch.
                </p>
                <button className="btn btn-dark btn-sm w-50">
                  View Details
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0 p-4 h-100">
                <div className="mb-3 fs-1 text-warning">
                  <FaJava />
                </div>
                <h4>Java Full Stack</h4>
                <p>
                  Master Java, Spring Boot, SQL and frontend technologies.
                </p>
                <button className="btn btn-dark btn-sm w-50">
                  View Details
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0 p-4 h-100">
                <div className="mb-3 fs-1 text-secondary">
                  <FaChartBar />
                </div>
                <h4>Data Science & AI</h4>
                <p>
                  Learn ML, Python, Data Analysis and AI fundamentals.
                </p>
                <button className="btn btn-dark btn-sm w-50">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutes */}
      <section className="py-5" style={{ backgroundColor: "#f3f4f6" }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Our Partner Institutes</h2>

          <div className="row g-4">
            {["Tech Academy", "Code Institute", "Skill Hub", "Future Learning"].map(
              (item, index) => (
                <div className="col-md-3" key={index}>
                  <div className="card border-0 shadow-sm text-center p-4">
                    <h5>{item}</h5>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Why Choose EduHub?</h2>

          <div className="row text-center">
            <div className="col-md-4">
              <div className="p-4">
                <div className="fs-1 mb-3 text-secondary">
                  <FaShieldAlt />
                </div>
                <h4>Top Institutes</h4>
                <p>Learn from trusted and verified institutes.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4">
                <div className="fs-1 mb-3 text-secondary">
                  <FaAward />
                </div>
                <h4>Quality Courses</h4>
                <p>Industry relevant courses to grow your skills.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4">
                <div className="fs-1 mb-3 text-secondary">
                  <FaUser />
                </div>
                <h4>Easy Enrollment</h4>
                <p>Browse and enroll in courses in just a few clicks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-white py-4"
        style={{ backgroundColor: "#1f2937" }}
      >
        <div className="container text-center">
          <p className="mb-0">© 2026 EduHub. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;