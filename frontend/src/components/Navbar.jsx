// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
//       <div className="container-fluid">
//         {/* Logo / Brand */}
//         <Link className="navbar-brand fw-bold fs-3" to="/">
//           EduHub
//         </Link>

//         {/* Mobile Toggle Button */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarContent"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navbar Content */}
//         <div className="collapse navbar-collapse" id="navbarContent">
          
//           {/* Left Menu */}
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/courses">Courses</Link>
//             </li>
//           </ul>

//           {/* Right Side Buttons */}
//           <div className="d-flex gap-2">
//             <Link to="/login" className="btn btn-outline-light">
//               Login
//             </Link>

//             <Link to="/register" className="btn btn-primary">
//               Register
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-3 shadow-sm"
      style={{ backgroundColor: "white" }}
    >
      <div className="container-fluid">
        {/* Logo / Brand */}
        <Link
          className="navbar-brand fw-bold fs-3"
          to="/"
          style={{ color: "#1f2937" }}
        >
          EduHub
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Center Menu */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link
                className="nav-link fw-semibold"
                to="/"
                style={{ color: "#d89b2b" }}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link fw-semibold"
                to="/courses"
                style={{ color: "#374151" }}
              >
                Courses
              </Link>
            </li>
          </ul>

          {/* Right Side Buttons */}
          <div className="d-flex gap-3">
            <Link
              to="/login"
              className="btn px-4"
              style={{
                border: "1px solid #d1d5db",
                color: "#111827",
                backgroundColor: "white",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn px-4"
              style={{
                backgroundColor: "#d89b2b",
                color: "white",
                border: "none",
              }}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;