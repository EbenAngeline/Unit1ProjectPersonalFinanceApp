import "./About.css";
import pfimage2 from "../../images/pfimage2.jpg";


function About() {
  return (
    <div className="container">
      <div className="info-card">
        <h2>About the app</h2>
        <h3>
          Managing your money shouldn't be complicated. Our mission is to make
          personal finance simple, accessible, and empowering for everyone.
        </h3>
        <div className="feature-list">
          <div>Track income and expenses in one place</div>
          <div>Create and review monthly budgets</div>
          <div>Monitor savings goals with ease</div>
          <div>See spending patterns clearly</div>
        </div>
         <img src={pfimage2}  className="image-size" alt="There is supposed to be an image"/>
      </div>
    </div>
  );
}
export default About;
