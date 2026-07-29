import { Link } from "react-router-dom";
import {
  BsBook,
  BsSearch,
  BsShieldCheck,
  BsGraphUp,
  BsStarFill,
  BsLock,
} from "react-icons/bs";
import "../styles/ForStudents.css";

// npm install bootstrap react-icons
// aur main.jsx me: import "bootstrap/dist/css/bootstrap.min.css";

const features = [
  {
    icon: <BsBook size={20} />,
    iconClass: "icon-purple",
    title: "Learn from multiple institutes",
    desc: "One login, courses from universities, bootcamps and academies worldwide.",
  },
  {
    icon: <BsSearch size={20} />,
    iconClass: "icon-purple",
    title: "Smart course discovery",
    desc: "Filter by level, price, duration, language and rating.",
  },
  {
    icon: <BsShieldCheck size={20} />,
    iconClass: "icon-blue",
    title: "Verified certificates",
    desc: "Shareable, blockchain-backed certificates recognized by employers.",
  },
  {
    icon: <BsGraphUp size={20} />,
    iconClass: "icon-orange",
    title: "Learning progress tracking",
    desc: "Visual progress bars, streaks and weekly goals keep you on track.",
  },
  {
    icon: <BsStarFill size={20} />,
    iconClass: "icon-red",
    title: "Reviews you can trust",
    desc: "Verified-enrollment reviews from real students, no bots.",
  },
  {
    icon: <BsLock size={20} />,
    iconClass: "icon-green",
    title: "Secure payments",
    desc: "Card, wallet and installment options, PCI-DSS compliant checkout.",
  },
];

const stats = [
  { label: "Courses in progress", value: 4, colorClass: "stat-purple" },
  { label: "Certificates earned", value: 7, colorClass: "stat-green" },
  { label: "Hours learned", value: 142, colorClass: "stat-blue" },
];

const courses = [
  {
    title: "UX Design Fundamentals",
    progress: 65,
    gradientClass: "course-grad-1",
  },
  {
    title: "Python for Data Analysis",
    progress: 55,
    gradientClass: "course-grad-2",
  },
];

export default function LandingSections() {
  return (
    <div className="landing-sections">
      {/* ---------- HERO SECTION ---------- */}
      <section className="hero-section">
        <div className="container-fluid px-4 px-lg-5 py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <p className="hero-eyebrow mb-2">For students</p>
              <h1 className="fw-bold display-5 mb-3 hero-title">
                Learn anything, from anyone,
                <br />
                in one place.
              </h1>
              <p className="text-secondary mb-4 hero-subtitle">
                Access courses from 500+ institutes, track every certificate,
                and pick up exactly where you left off.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link
                  to="/register"
                  className="btn btn-gradient-primary px-4 py-2 fw-semibold"
                >
                  Start learning
                </Link>
                <Link
                  to="/explore-courses"
                  className="btn btn-white-outline px-4 py-2 fw-semibold"
                >
                  Browse courses
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-card-wrapper ms-lg-auto">
                <div className="hero-card-inner shadow-sm">
                  <p className="text-secondary small mb-1">
                    Your learning streak
                  </p>
                  <h3 className="fw-bold mb-2">18 days</h3>
                  <div className="progress hero-progress">
                    <div
                      className="progress-bar hero-progress-bar"
                      style={{ width: "70%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FEATURES SECTION ---------- */}
      <section className="features-section">
        <div className="container-fluid px-4 px-lg-5 py-5">
          <div className="text-center mb-5">
            <p className="section-eyebrow mb-2">EVERYTHING YOU NEED</p>
            <h2 className="fw-bold display-6">
              Made for how students actually learn
            </h2>
          </div>

          <div className="row g-4">
            {features.map((f, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <div className="feature-card h-100">
                  <div className={`feature-icon ${f.iconClass}`}>{f.icon}</div>
                  <h6 className="fw-bold mb-2">{f.title}</h6>
                  <p className="text-secondary small mb-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DASHBOARD SECTION ---------- */}
      <section className="dashboard-section">
        <div className="container-fluid py-4">
          <div className="text-center mb-5">
            <p className="section-eyebrow mb-2">YOUR HOME BASE</p>
            <h2 className="fw-bold display-6">
              A dashboard that keeps you moving
            </h2>
          </div>

          <div className="dashboard-card mx-auto">
            <div className="row g-3 mb-4">
              {stats.map((s, i) => (
                <div className="col-md-4" key={i}>
                  <div className="stat-box h-100">
                    <p className="text-secondary small mb-1">{s.label}</p>
                    <h4 className={`fw-bold mb-0 ${s.colorClass}`}>
                      {s.value}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            <h6 className="fw-bold mb-3">Continue learning</h6>
            <div className="row g-3">
              {courses.map((c, i) => (
                <div className="col-md-6" key={i}>
                  <div className="course-box h-100">
                    <div className={`course-banner mb-3 ${c.gradientClass}`} />
                    <p className="fw-semibold mb-2">{c.title}</p>
                    <div className="progress course-progress">
                      <div
                        className="progress-bar course-progress-bar"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
