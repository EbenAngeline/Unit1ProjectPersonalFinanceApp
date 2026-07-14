import "./Contact.css";
import contactusimg from "../../images/contactus-img.jpg";
function Contact() {
  return (
    <div className="container">
      <div className="info-card">
        <h2>Contact us</h2>
        <h3>We're here to help with questions, feedback, or support.</h3>
        <div className="feature-list">
          <div>Email: support@yourfinanceapp.com</div>
          <div>Phone: +1 (123) 456-7890</div>
          <div>Hours: Monday - Friday, 9:00 AM - 6:00 PM</div>
          <div>Address: 123 Finance Street, New York, NY 10001</div>
        </div>
      </div>
      <img src={contactusimg}  className="image-size" alt="There is supposed to be an image"/>
    </div>
  );
} 
export default Contact;
