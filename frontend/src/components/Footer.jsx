import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="eduhub-footer">
      <div className="container-fluid px-4 px-lg-5 py-5">

        <div className="row gy-5">

          <div className="col-lg-3">
            <div className="d-flex align-items-center mb-4">
              <div className="footer-logo">E</div>
              <h4 className="footer-brand ms-3">EduHub</h4>
            </div>

            <p className="footer-text">
              The multi-institute learning platform for students and educators worldwide.
            </p>
          </div>

          <div className="col-6 col-lg-3">
            <h5>Platform</h5>

            <Link to="/">Browse courses</Link>
            <Link to="/">For students</Link>
            <Link to="/">For institutes</Link>
            <Link to="/">Pricing</Link>
          </div>

          <div className="col-6 col-lg-3">
            <h5>Company</h5>

            <Link to="/">About us</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Contact</Link>
            <Link to="/">Press</Link>
          </div>

          <div className="col-6 col-lg-3">
            <h5>Legal</h5>

            <Link to="/">Terms of service</Link>
            <Link to="/">Privacy policy</Link>
            <Link to="/">Cookie policy</Link>
          </div>

        </div>

        <hr />

        <div className="footer-bottom">

          <p>© 2026 EduHub, Inc. All rights reserved.</p>

          <div className="footer-social">

            <FaTwitter />
            <FaLinkedin />
            <FaInstagram />
            <FaYoutube />

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;