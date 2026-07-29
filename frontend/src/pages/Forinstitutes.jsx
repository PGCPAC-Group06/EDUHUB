import { useNavigate } from "react-router-dom";
import {
  BsClipboardCheck,
  BsLaptop,
  BsPeopleFill,
  BsCashCoin,
  BsPieChartFill,
  BsShieldFillCheck,
} from "react-icons/bs";
import "../styles/ForInstitutes.css";

const features = [
  {
    icon: <BsClipboardCheck size={20} />,
    iconClass: "icon-purple",
    title: "Simple registration",
    desc: "Verify your institute and go live in under 48 hours.",
  },
  {
    icon: <BsLaptop size={20} />,
    iconClass: "icon-purple",
    title: "Course builder",
    desc: "Drag-and-drop curriculum builder with video, quizzes and assignments.",
  },
  {
    icon: <BsPeopleFill size={20} />,
    iconClass: "icon-blue",
    title: "Student management",
    desc: "Cohorts, attendance, messaging and grading in one place.",
  },
  {
    icon: <BsCashCoin size={20} />,
    iconClass: "icon-green",
    title: "Revenue and payouts",
    desc: "Automated weekly payouts with transparent commission breakdown.",
  },
  {
    icon: <BsPieChartFill size={20} />,
    iconClass: "icon-orange",
    title: "Analytics",
    desc: "Enrollment funnels, completion rates and cohort performance.",
  },
  {
    icon: <BsShieldFillCheck size={20} />,
    iconClass: "icon-red",
    title: "Brand control",
    desc: "Your own institute profile page, logo and custom certificate design.",
  },
];

const stats = [
  { label: "Total students", value: "1000", delta: "+320 this week" },
  { label: "Active courses", value: "62", delta: "+4 this month" },
  { label: "Revenue (MTD)", value: "$1210", delta: "+18%" },
  { label: "Avg. rating", value: "4.8", delta: "stable" },
];

const stories = [
  {
    initials: "NV",
    name: "Nova Institute of Design",
    desc: "Grew enrollment 3.2x in 6 months after moving from a self-hosted LMS.",
  },
  {
    initials: "GT",
    name: "GreenTech Academy",
    desc: "Automated payouts saved their finance team 15 hours a month.",
  },
  {
    initials: "LP",
    name: "LinguaPro",
    desc: "Reached 40 countries within their first year on the platform.",
  },
];

export default function ForInstitutes() {
  const navigate = useNavigate();

  return (
    <div className="institutes-page">
      {/* ---------- HERO SECTION ---------- */}
      <section className="institutes-hero">
        <div className="container-fluid px-4 px-lg-5 py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <p className="hero-eyebrow mb-2">For institutes</p>
              <h1 className="fw-bold display-5 mb-3 hero-title">
                Turn your expertise into a
                <br />
                global classroom.
              </h1>
              <p className="text-secondary mb-4 hero-subtitle">
                Publish courses, manage students and track revenue — all from
                one institute dashboard.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <button
                  className="btn btn-gradient-primary px-4 py-2 fw-semibold"
                  onClick={() => navigate("/register")}
                >
                  Register your institute
                </button>
                
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-card-wrapper ms-lg-auto">
                <div className="hero-card-inner shadow-sm">
                  <p className="text-secondary small mb-1">
                    This month's revenue
                  </p>
                  <h3 className="fw-bold mb-2">$48,210</h3>
                  <span className="revenue-badge">+18% vs last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FEATURES SECTION ---------- */}
      <section className="institutes-features-section">
        <div className="container-fluid px-4 px-lg-5 py-5">
          <div className="text-center mb-5">
            <p className="section-eyebrow mb-2">INSTITUTE TOOLKIT</p>
            <h2 className="fw-bold display-6">
              Everything to run your academy online
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

      {/* ---------- DASHBOARD PREVIEW / STATS SECTION ---------- */}
      <section className="institutes-stats-section">
        <div className="container-fluid px-4 px-lg-5 py-5">
          <div className="text-center mb-5">
            <p className="section-eyebrow mb-2">DASHBOARD PREVIEW</p>
            <h2 className="fw-bold display-6">Run your institute at a glance</h2>
          </div>

          <div className="stats-card mx-auto">
            <div className="row g-3">
              {stats.map((s, i) => (
                <div className="col-6 col-lg-3" key={i}>
                  <div className="stat-box h-100">
                    <p className="text-secondary small mb-1">{s.label}</p>
                    <h4 className="fw-bold mb-1">{s.value}</h4>
                    <span className="stat-delta">{s.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SUCCESS STORIES SECTION ---------- */}
      <section className="institutes-stories-section">
        <div className="container-fluid px-4 px-lg-5 py-5">
          <div className="text-center mb-5">
            <p className="section-eyebrow mb-2">SUCCESS STORIES</p>
            <h2 className="fw-bold display-6">Institutes growing with EduHub</h2>
          </div>

          <div className="row g-4">
            {stories.map((s, i) => (
              <div className="col-md-4" key={i}>
                <div className="story-card h-100">
                  <div className="story-avatar mb-3">{s.initials}</div>
                  <h6 className="fw-bold mb-2">{s.name}</h6>
                  <p className="text-secondary small mb-0">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}