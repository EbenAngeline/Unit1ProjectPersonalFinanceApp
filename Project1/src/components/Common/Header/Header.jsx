import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import "../Navbar/Navbar.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/budget", label: "Budget" },
    { to: "/transactions", label: "Transactions" },
  ];

  return (
    <header className="header">
      <div className="header__intro">
        <h1 className="header__title">My Finance App</h1>
      </div>

      <button
        className="navbar__toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`navbar ${isMenuOpen ? "navbar--open" : ""}`} aria-label="Primary navigation">
        <ul className="navbar__list">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  isActive ? "navbar__link navbar__link--active" : "navbar__link"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
