import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header-main d-flex align-items-center justify-content-between">
      <div className="app-logo">
        <h4>🌌 MyBlogio</h4>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>

      <div className={`navbar-menu-items ${menuOpen ? "show" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/blog" onClick={() => setMenuOpen(false)}>Create a blog</Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
