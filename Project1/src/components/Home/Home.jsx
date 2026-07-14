import "./Home.css";
import pfimage1 from "../../images/pfimage1.jpg";

function HomePage() {
  return (
    <div className="container">
      <div className="hero-card">
        <h2>Take control of your money</h2>
        <h3>
          Track income, expenses, budgets, and savings in one elegant place.
          This app helps you understand your spending habits and build stronger
          financial habits with confidence.
        </h3>
        <div className="hero-highlights">
          <span>Budget smart</span>
          <span>See spending clearly</span>
          <span>Stay on track</span>
        </div>
        <img src={pfimage1} alt="There is supposed to be an image"/>
      </div>
    </div>
  );
}
export default HomePage;
