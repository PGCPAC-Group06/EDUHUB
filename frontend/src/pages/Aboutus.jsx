import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BsRocketTakeoff,
  BsPeople,
  BsGlobe,
  BsAward,
  BsLightbulb,
  BsHeart,
} from "react-icons/bs";
import "../styles/AboutUs.css";

const stats = [
  { value: "50+", label: "Partner institutes" },
  { value: "1000+", label: "Learners worldwide" },
  { value: "100+", label: "Courses available" },
  { value: "95%", label: "Completion satisfaction" },
];

const values = [
  {
    icon: <BsLightbulb size={20} />,
    iconClass: "icon-purple",
    title: "Curiosity first",
    desc: "We build for the learner who wants to go one level deeper, not just check a box.",
  },
  {
    icon: <BsPeople size={20} />,
    iconClass: "icon-blue",
    title: "Open access",
    desc: "One login should be enough to learn from any institute, anywhere, in any format.",
  },
  {
    icon: <BsAward size={20} />,
    iconClass: "icon-orange",
    title: "Real credentials",
    desc: "Certificates should mean something — verified, traceable, and trusted by employers.",
  },
  {
    icon: <BsGlobe size={20} />,
    iconClass: "icon-green",
    title: "No gatekeeping",
    desc: "Great teaching shouldn't be limited by geography, budget, or a single institution's catalog.",
  },
];

const timeline = [
  {
    year: "2025",
    title: "The idea",
    desc: "Started as a weekend project to compare course catalogs across five local institutes.",
  },
  {
    year: "2025",
    title: "First 10 institutes",
    desc: "Universities and bootcamps came on board once learners started asking for it by name.",
  },
  {
    year: "2026",
    title: "50+ institutes",
    desc: "Grew into a full learning marketplace spanning universities, academies, and bootcamps.",
  },
  {
    year: "Today",
    title: "1000+ learners",
    desc: "Helping people track every course, every certificate, and every hour of progress in one place.",
  },
];

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* ---------- HERO ---------- */}
      <section className="about-hero">
        <div className="container-fluid px-4 px-lg-5 py-5">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <p className="hero-eyebrow mb-2">Our story</p>
              <h1 className="fw-bold display-5 mb-3 hero-title">
                Education shouldn't live in
                <br />
                500 different tabs.
              </h1>
              <p className="text-secondary mb-4 hero-subtitle">
                EduHub brings courses, certificates, and progress from every
                institute you learn with into one place — so you spend less time
                switching platforms and more time actually learning.
              </p>
              <button
                className="btn btn-gradient-primary px-4 py-2 fw-semibold"
                onClick={() => navigate("/register")}
              >
                Join EduHub
              </button>
            </div>

            <div className="col-lg-5">
              <div className="about-hero-card-wrapper ms-lg-auto">
                <div className="about-hero-card-inner shadow-sm">
                  <div className="about-hero-icon mb-3">
                    <BsRocketTakeoff size={22} />
                  </div>
                  <h3 className="fw-bold mb-1">Our mission</h3>
                  <p className="text-secondary small mb-0">
                    Make learning from any institute as simple as learning from
                    one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="about-stats-section">
        <div className="container-fluid px-4 px-lg-5 py-4">
          <div className="row g-3">
            {stats.map((s, i) => (
              <div className="col-6 col-lg-3" key={i}>
                <div className="stat-box text-center h-100">
                  <h3 className="fw-bold mb-1 stat-value">{s.value}</h3>
                  <p className="text-secondary small mb-0">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- VALUES ---------- */}
      <section className="about-values-section">
        <div className="container-fluid px-4 px-lg-5 py-5">
          <div className="text-center mb-5">
            <p className="section-eyebrow mb-2">WHAT WE BELIEVE</p>
            <h2 className="fw-bold display-6">The principles behind EduHub</h2>
          </div>

          <div className="row g-4">
            {values.map((v, i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <div className="feature-card h-100">
                  <div className={`feature-icon ${v.iconClass}`}>{v.icon}</div>
                  <h6 className="fw-bold mb-2">{v.title}</h6>
                  <p className="text-secondary small mb-0">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TIMELINE ---------- */}
      <section className="about-timeline-section">
        <div className="container-fluid px-4 px-lg-5 py-5">
          <div className="text-center mb-5">
            <p className="section-eyebrow mb-2">HOW WE GOT HERE</p>
            <h2 className="fw-bold display-6">
              From weekend project to platform
            </h2>
          </div>

          <div className="timeline-wrapper mx-auto">
            {timeline.map((t, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-year">{t.year}</div>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h6 className="fw-bold mb-1">{t.title}</h6>
                  <p className="text-secondary small mb-0">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
