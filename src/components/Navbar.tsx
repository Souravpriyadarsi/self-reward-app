import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

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
      </div>
    </nav>
  );
}

export default Navbar;
