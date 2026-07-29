import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch, BsStarFill } from "react-icons/bs";
import { getAllCourses } from "../data/coursesData";
import "../styles/ExploreCourses.css";

const PAGE_SIZE = 6;

export default function ExploreCourses() {
  const navigate = useNavigate();
  const allCourses = getAllCourses();

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [priceFilters, setPriceFilters] = useState([]);
  const [ratingFilters, setRatingFilters] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [page, setPage] = useState(1);

  const categoryOptions = ["Technology", "Design", "Business", "Languages"];
  const levelOptions = ["Beginner", "Intermediate", "Advanced"];

  const toggleValue = (value, list, setList) => {
    setPage(1);
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const categoryCounts = useMemo(() => {
    const counts = {};
    categoryOptions.forEach((cat) => {
      counts[cat] = allCourses.filter((c) => c.category === cat).length;
    });
    return counts;
  }, [allCourses]);

  const filteredCourses = useMemo(() => {
    let result = allCourses.filter((c) => {
      const matchesSearch = c.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        categories.length === 0 || categories.includes(c.category);
      const matchesLevel = levels.length === 0 || levels.includes(c.level);
      const matchesPrice =
        priceFilters.length === 0 ||
        (priceFilters.includes("Free") && c.isFree) ||
        (priceFilters.includes("Paid") && !c.isFree);
      const matchesRating =
        ratingFilters.length === 0 ||
        (ratingFilters.includes("4.5 & up") && c.rating >= 4.5) ||
        (ratingFilters.includes("4.0 & up") && c.rating >= 4.0);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesPrice &&
        matchesRating
      );
    });

    if (sortBy === "popular")
      result = [...result].sort((a, b) => b.students - a.students);
    if (sortBy === "rating")
      result = [...result].sort((a, b) => b.rating - a.rating);
    if (sortBy === "price-low")
      result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high")
      result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [
    allCourses,
    search,
    categories,
    levels,
    priceFilters,
    ratingFilters,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="explore-page">
      <div className="container-fluid px-4 px-lg-5 py-4">
        <h2 className="fw-bold mb-4">Browse courses</h2>

        {/* Search bar */}
        <div className="search-bar mb-4">
          <BsSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search 12,000+ courses..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="row g-4">
          {/* ---------- FILTER SIDEBAR ---------- */}
          <div className="col-lg-3">
            <div className="filter-panel">
              <div className="filter-group">
                <h6 className="fw-bold mb-3">Category</h6>
                {categoryOptions.map((cat) => (
                  <div className="form-check mb-2" key={cat}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`cat-${cat}`}
                      checked={categories.includes(cat)}
                      onChange={() =>
                        toggleValue(cat, categories, setCategories)
                      }
                    />
                    <label className="form-check-label" htmlFor={`cat-${cat}`}>
                      {cat} ({categoryCounts[cat]})
                    </label>
                  </div>
                ))}
              </div>

              <hr />

              <div className="filter-group">
                <h6 className="fw-bold mb-3">Level</h6>
                {levelOptions.map((lvl) => (
                  <div className="form-check mb-2" key={lvl}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`lvl-${lvl}`}
                      checked={levels.includes(lvl)}
                      onChange={() => toggleValue(lvl, levels, setLevels)}
                    />
                    <label className="form-check-label" htmlFor={`lvl-${lvl}`}>
                      {lvl}
                    </label>
                  </div>
                ))}
              </div>

              <hr />

              <div className="filter-group">
                <h6 className="fw-bold mb-3">Price</h6>
                {["Free", "Paid"].map((p) => (
                  <div className="form-check mb-2" key={p}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`price-${p}`}
                      checked={priceFilters.includes(p)}
                      onChange={() =>
                        toggleValue(p, priceFilters, setPriceFilters)
                      }
                    />
                    <label className="form-check-label" htmlFor={`price-${p}`}>
                      {p}
                    </label>
                  </div>
                ))}
              </div>

              <hr />

              <div className="filter-group">
                <h6 className="fw-bold mb-3">Rating</h6>
                {["4.5 & up", "4.0 & up"].map((r) => (
                  <div className="form-check mb-2" key={r}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`rating-${r}`}
                      checked={ratingFilters.includes(r)}
                      onChange={() =>
                        toggleValue(r, ratingFilters, setRatingFilters)
                      }
                    />
                    <label className="form-check-label" htmlFor={`rating-${r}`}>
                      {r}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- COURSE GRID ---------- */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <p className="text-secondary mb-0">
                {filteredCourses.length} results
              </p>
              <select
                className="form-select sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Sort: Most popular</option>
                <option value="rating">Sort: Highest rated</option>
                <option value="price-low">Sort: Price - Low to High</option>
                <option value="price-high">Sort: Price - High to Low</option>
              </select>
            </div>

            {paginatedCourses.length === 0 ? (
              <p className="text-secondary">No courses match your filters.</p>
            ) : (
              <div className="row g-4">
                {paginatedCourses.map((course) => (
                  <div className="col-sm-6 col-lg-4" key={course.id}>
                    <div
                      className="course-card"
                      onClick={() => navigate(`/course/${course.id}`)}
                    >
                      <div
                        className="course-banner"
                        style={{
                          backgroundImage: `url(${course.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                      <div className="course-card-body">
                        <span className="course-tag">{course.category}</span>
                        <h6 className="fw-bold mt-2 mb-1">{course.title}</h6>
                        <p className="text-secondary small mb-2">
                          {course.institute}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="course-rating">
                            <BsStarFill size={13} className="me-1" />
                            {course.rating}
                          </span>
                          <span className="course-price">
                            {course.isFree ? "Free" : `$${course.price}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ---------- PAGINATION ---------- */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-2 mt-5">
                <button
                  className="page-btn page-btn-prev"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      className={`page-btn ${p === currentPage ? "page-btn-active" : ""}`}
                      onClick={() => goToPage(p)}
                    >
                      {p}
                    </button>
                  ),
                )}
                <button
                  className="page-btn page-btn-next"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
