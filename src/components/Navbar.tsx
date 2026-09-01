import { Link, useLocation } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";

function Navbar() {
  const location = useLocation();

  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/rewards", label: "Rewards" },
    { path: "/calendar", label: "Calendar" },
    { path: "/achievements", label: "Achievements" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo">LifeXP</div>

      <div className="navbar-links">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`navbar-link ${
              location.pathname === link.path ? "active" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
          title={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
        >
          <span className="theme-toggle-icon">
            {theme === "dark" ? "☀️" : "🌙"}
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
