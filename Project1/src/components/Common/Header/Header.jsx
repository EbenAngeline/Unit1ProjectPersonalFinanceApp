import "./Header.css";
import NavBar from "../Navbar/NavBar";

function Header() {
  return (
    <div className="nav-header">
      <header className="header">
        <div className="header__intro">
          <h1 className="header__title">TRACK YOUR PERSONSAL FINANCE APP</h1>
        </div>

        <NavBar />
      </header>
    </div>
  );
}

export default Header;
