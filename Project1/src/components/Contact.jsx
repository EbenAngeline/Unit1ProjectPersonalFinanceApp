import { Link } from "react-router-dom";
function Contact() {
  return (
    <div>
      <p>
        {" "}
        Contact Us We’re here to help! If you have any questions, feedback, or
        need assistance with our personal finance app, we’d love to hear from
        you. Email support@yourfinanceapp.com Phone +1 (123) 456-7890 Business
        Hours Monday – Friday: 9:00 AM – 6:00 PM Address 123 Finance Street New
        York, NY 10001 United States Get in Touch Whether you have questions
        about your account, need technical support, or want to share suggestions
        for improving the app, our support team is ready to assist you. We aim
        to respond to all inquiries as quickly as possible. Thank you for
        choosing our app to help you manage your finances with confidence.
      </p>
    </div>
  );
}
export default Contact;

/*import { useLocation } from "react-router";

function Contact(){
    const location =useLocation();
    return(
        <div>
            Username: {location.state?.username}
        </div>
    );

}
export default Contact;*/
