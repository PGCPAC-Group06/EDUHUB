import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BsPlayFill,
  BsStarFill,
  BsInfinity,
  BsPhone,
  BsAward,
  BsChevronDown,
  BsChevronRight,
} from "react-icons/bs";
import { getCourseById } from "../data/coursesData";
import "../styles/CourseDetail.css";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = getCourseById(id);

  const [openModule, setOpenModule] = useState(0);

  if (!course) {
    return (
      <div className="container-fluid px-4 px-lg-5 py-5 text-center">
        <h4 className="fw-bold mb-3">Course not found</h4>
        <button className="btn btn-gradient-primary px-4 py-2" onClick={() => navigate("/explore-courses")}>
          Back to courses
        </button>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      {/* ---------- TOP HERO ---------- */}
      <section className="detail-hero">
        <div className="container-fluid px-4 px-lg-5 py-5">
          <div className="row">
            <div className="col-lg-7">
              <span className="detail-tag">{course.category}</span>
              <h1 className="fw-bold mt-3 mb-3 detail-title">{course.title}</h1>
              <p className="detail-subtitle mb-3">{course.subtitle}</p>
              <div className="detail-meta mb-3">
                <span className="me-3">
                  <BsStarFill className="rating-star me-1" />
                  {course.rating} ({course.ratingsCount.toLocaleString()} ratings)
                </span>
                <span className="me-3">{course.students.toLocaleString()} students</span>
                <span>Last updated {course.lastUpdated}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="detail-avatar">{course.initials}</div>
                <div>
                  <p className="fw-semibold mb-0 detail-institute">{course.institute}</p>
                  <p className="text-secondary small mb-0">Instructor: {course.instructor}</p>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="enroll-card ms-lg-auto">
                <div
                  className="enroll-video"
                  style={{ background: course.bannerGradient }}
                >
                  <div className="play-circle">
                    <BsPlayFill size={26} />
                  </div>
                </div>
                <div className="enroll-card-body">
                  <button
                    className="btn btn-gradient-primary w-100 py-2 fw-semibold mb-2"
                    onClick={() => navigate(`/checkout/${course.id}`)}
                  >
                    Enroll now
                  </button>
                  <button className="btn btn-white-outline w-100 py-2 fw-semibold mb-3">
                    Add to wishlist
                  </button>
                  <ul className="enroll-perks list-unstyled mb-0">
                    <li>
                      <BsInfinity className="me-2" /> Lifetime access
                    </li>
                    <li>
                      <BsPhone className="me-2" /> Access on mobile and desktop
                    </li>
                    <li>
                      <BsAward className="me-2" /> Certificate of completion
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CURRICULUM + REVIEWS ---------- */}
      <section className="detail-body-section">
        <div className="container-fluid px-4 px-lg-5 py-5">
          <div className="row">
            <div className="col-lg-8">
              <h5 className="fw-bold mb-3">Curriculum</h5>
              <div className="curriculum-list mb-5">
                {course.curriculum.map((module, i) => (
                  <div className="curriculum-item" key={i}>
                    <button
                      className="curriculum-header"
                      onClick={() => setOpenModule(openModule === i ? -1 : i)}
                    >
                      <span className="fw-semibold">
                        {i + 1}. {module.title}
                      </span>
                      {openModule === i ? <BsChevronDown /> : <BsChevronRight />}
                    </button>
                    {openModule === i && (
                      <ul className="curriculum-lessons list-unstyled">
                        {module.lessons.map((lesson, j) => (
                          <li key={j} className="curriculum-lesson-item">
                            <span className="lesson-dot" />
                            <span className="lesson-text">{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <h5 className="fw-bold mb-3">Student reviews</h5>
              <div className="reviews-list">
                {course.reviews.map((review, i) => (
                  <div className="review-card" key={i}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="review-avatar">{review.initials}</div>
                        <span className="fw-semibold">{review.name}</span>
                      </div>
                      <span className="review-rating">
                        <BsStarFill className="me-1" />
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-secondary small mb-0">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}