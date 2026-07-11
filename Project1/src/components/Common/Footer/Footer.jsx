import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} My Finance App</p>
    </footer>
  );
}

export default Footer;
