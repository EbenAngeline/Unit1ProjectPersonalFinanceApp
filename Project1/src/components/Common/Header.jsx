import { NavLink } from "react-router-dom";

function Header() {
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
      <h1>Dashboard</h1>
      <h4>Welcome Back - Here is your Financial Overview</h4>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"}>
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
