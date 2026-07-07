function Header() {
  return (
    <header className="header">
      <h1> DashBoard</h1>
      <h4>Welcome Back - Here is your Financial Overview</h4>
      <nav>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            {" "}
            <a href="/HomePage">About</a>
          </li>
          <li>
            {" "}
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
