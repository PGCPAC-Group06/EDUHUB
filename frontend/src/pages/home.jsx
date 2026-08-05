import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";

const featuredCourses = [
  {
    id: 1,
    category: "Design",
    title: "Complete UI/UX Design Bootcamp",
    institute: "Nova Institute of Design",
    rating: 4.9,
    reviews: "2.1k",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
  },
  {
    id: 2,
    category: "Data science",
    title: "Python for Data Analysis",
    institute: "MIT Extension",
    rating: 4.8,
    reviews: "3.4k",
    price: 59,
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=80",
  },
  {
    id: 3,
    category: "Business",
    title: "Product Management Essentials",
    institute: "Wharton Online",
    rating: 4.7,
    reviews: "980",
    price: 39,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  },
];

const featuredInstitutes = [
  { id: 1, initials: "SU", name: "Stanford Online", courses: 320 },
  { id: 2, initials: "MIT", name: "MIT Extension", courses: 210 },
  { id: 3, initials: "NV", name: "Nova Design", courses: 98 },
  { id: 4, initials: "WH", name: "Wharton Online", courses: 140 },
];

const testimonials = [
  {
    id: 1,
    quote:
      "EduHub let me learn from three different institutes without juggling logins. The certificate wall alone is worth it.",
    name: "Aisha Khan",
    role: "Product designer",
    initials: "AK",
  },
  {
    id: 2,
    quote:
      "We onboarded our entire academy in a week. Payouts and analytics just work.",
    name: "Raj Nair",
    role: "Director, Nova Institute",
    initials: "RN",
  },
  {
    id: 3,
    quote:
      "The best multi-institute LMS I've used — clean, fast, and the mobile experience is excellent.",
    name: "Maria Lopez",
    role: "Lifelong learner",
    initials: "ML",
  },
];

const faqs = [
  {
    id: 1,
    q: "Can I learn from multiple institutes at once?",
    a: "Yes. All your courses, progress, and certificates live in a single dashboard, no matter how many institutes you enroll with.",
  },
  {
    id: 2,
    q: "Are certificates verified and shareable?",
    a: "Every certificate is verified by the issuing institute and can be shared directly to LinkedIn or downloaded as a PDF.",
  },
  {
    id: 3,
    q: "How do institutes get paid?",
    a: "Institutes receive automated payouts on a regular cycle, with full analytics on enrollments and revenue.",
  },
  {
    id: 4,
    q: "Is there a free plan for students?",
    a: "Yes, students can browse and enroll in free courses at no cost, with the option to upgrade for verified certificates.",
  },
];

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/explore-courses?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/explore-courses");
    }
  };

  const quickTags = ["Data Science", "UI/UX Design", "Business", "IELTS Prep"];

  return (
    <div className="eduhub-home">
      {/* HERO */}
      <section className="eduhub-hero">
        <div className="container-fluid px-4 px-lg-5 py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="eduhub-eyebrow-badge">
                Trusted by 50+ institutes
              </span>
              <h1 className="eduhub-hero-title mt-3">
                One platform.
                <br />
                Every institute,{" "}
                <span className="eduhub-text-accent">every learner.</span>
              </h1>
              <p className="eduhub-hero-sub mt-3">
                Learn from top-rated universities, bootcamps and training
                institutes — all in a single, beautifully unified learning
                experience.
              </p>

              <div className="mt-4">
                <Link to="/register" className="btn eduhub-btn-solid btn-lg">
                  Start learning free &rarr;
                </Link>
              </div>

              {/* Search bar */}
              <form onSubmit={handleSearch} className="eduhub-search-bar mt-4">
                <span className="eduhub-search-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="21"
                      y1="21"
                      x2="16.65"
                      y2="16.65"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  className="eduhub-search-input"
                  placeholder='Try "UI/UX design", "Data Science", "IELTS"...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn eduhub-btn-solid eduhub-search-btn"
                >
                  Search
                </button>
              </form>

              <div className="d-flex flex-wrap gap-2 mt-3">
                {quickTags.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    className="eduhub-tag-pill"
                    onClick={() => {
                      setSearchTerm(tag);
                      navigate(`/explore-courses?q=${encodeURIComponent(tag)}`);
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="eduhub-hero-card">
                <div className="eduhub-hero-card-inner">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">UX Design Fundamentals</span>
                    <span className="badge eduhub-badge-live">Live</span>
                  </div>
                  <div className="eduhub-progress mt-3">
                    <div
                      className="eduhub-progress-fill"
                      style={{ width: "64%" }}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between mt-2 eduhub-hero-card-meta">
                    <span>Module 4 of 6</span>
                    <span>64% complete</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-3">
                    <span className="eduhub-mini-avatar">SP</span>
                    <span className="eduhub-hero-card-meta">
                      Stanford Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="eduhub-stats">
        <div className="container-fluid px-4 px-lg-5 py-5">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <div className="eduhub-stat-number">50+</div>
              <div className="eduhub-stat-label">Partner institutes</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="eduhub-stat-number">150+</div>
              <div className="eduhub-stat-label">Courses available</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="eduhub-stat-number">1000+</div>
              <div className="eduhub-stat-label">Learners worldwide</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="eduhub-stat-number">98%</div>
              <div className="eduhub-stat-label">Satisfaction rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-5">
        <div className="container-fluid px-4 px-lg-5">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="eduhub-section-eyebrow">Handpicked</span>
              <h2 className="eduhub-section-title mt-1">Featured courses</h2>
            </div>
            <Link to="/explore-courses" className="eduhub-link-accent">
              View all &rarr;
            </Link>
          </div>

          <div className="row g-4">
            {featuredCourses.map((course) => (
              <div className="col-md-4" key={course.id}>
                <div className="eduhub-course-card h-100">
                  <div
                    className="eduhub-course-thumb"
                    style={{
                      backgroundImage: `url(${course.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <div className="p-3">
                    <span className="eduhub-course-tag">{course.category}</span>
                    <h5 className="mt-2 mb-1">{course.title}</h5>
                    <p className="eduhub-course-institute mb-2">
                      by {course.institute}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="eduhub-course-rating">
                        ★ {course.rating} ({course.reviews})
                      </span>
                      <span className="fw-bold">${course.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED INSTITUTES */}
      <section className="eduhub-stats py-5">
        <div className="container-fluid px-4 px-lg-5">
          <div className="text-center mb-4">
            <span className="eduhub-section-eyebrow">Partners</span>
            <h2 className="eduhub-section-title mt-1">Featured institutes</h2>
          </div>
          <div className="row g-3">
            {featuredInstitutes.map((inst) => (
              <div className="col-6 col-md-3" key={inst.id}>
                <div className="eduhub-institute-card text-center">
                  <span className="eduhub-mini-avatar eduhub-mini-avatar-lg mx-auto">
                    {inst.initials}
                  </span>
                  <div className="fw-semibold mt-2">{inst.name}</div>
                  <div className="eduhub-hero-card-meta">
                    {inst.courses} courses
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR STUDENTS / INSTITUTES */}
      <section className="py-5">
        <div className="container-fluid px-4 px-lg-5">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="eduhub-feature-panel h-100">
                <div className="eduhub-feature-icon">🎓</div>
                <h4 className="mt-3">Built for students</h4>
                <p className="eduhub-hero-card-meta">
                  Track progress, earn verified certificates and learn from 500+
                  institutes in one dashboard.
                </p>
                <Link
                  to="/for-students"
                  className="btn eduhub-btn-outline mt-2"
                >
                  Explore student features
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="eduhub-feature-panel h-100">
                <div className="eduhub-feature-icon">🏛️</div>
                <h4 className="mt-3">Built for institutes</h4>
                <p className="eduhub-hero-card-meta">
                  Launch courses, manage cohorts and grow revenue with built-in
                  analytics and payouts.
                </p>
                <Link
                  to="/for-institutes"
                  className="btn eduhub-btn-outline mt-2"
                >
                  Explore institute features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="eduhub-stats py-5">
        <div className="container-fluid px-4 px-lg-5">
          <div className="text-center mb-4">
            <span className="eduhub-section-eyebrow">Testimonials</span>
            <h2 className="eduhub-section-title mt-1">
              Loved by learners and institutes
            </h2>
          </div>
          <div className="row g-4">
            {testimonials.map((t) => (
              <div className="col-md-4" key={t.id}>
                <div className="eduhub-testimonial-card h-100">
                  <div className="eduhub-stars mb-2">★★★★★</div>
                  <p className="mb-3">&ldquo;{t.quote}&rdquo;</p>
                  <div className="d-flex align-items-center gap-2">
                    <span className="eduhub-mini-avatar">{t.initials}</span>
                    <div>
                      <div className="fw-semibold">{t.name}</div>
                      <div className="eduhub-hero-card-meta">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-5">
        <div
          className="container-fluid px-4 px-lg-5"
          style={{ maxWidth: "760px" }}
        >
          <div className="text-center mb-4">
            <span className="eduhub-section-eyebrow">FAQ</span>
            <h2 className="eduhub-section-title mt-1">
              Frequently asked questions
            </h2>
          </div>
          {faqs.map((item, index) => (
            <div className="eduhub-faq-item" key={item.id}>
              <button
                className="eduhub-faq-question"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                {item.q}
                <span>{openFaq === index ? "−" : "+"}</span>
              </button>
              {openFaq === index && (
                <div className="eduhub-faq-answer">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
