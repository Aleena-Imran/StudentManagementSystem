import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

import "./Contact.css";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="contact-badge">CONTACT EDUMANAGE</div>

        <h1>We're Here to Help</h1>

        <p>
          Have a question about EduManage? Use the contact details below or
          send a message through the form.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info-card">
          <h2>Get in touch</h2>

          <p className="contact-info-intro">
            Connect with the EduManage team for questions, feedback or project
            support.
          </p>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <Mail size={19} />
            </div>

            <div>
              <span>Email</span>
              <strong>support@edumanage.com</strong>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <Phone size={19} />
            </div>

            <div>
              <span>Phone</span>
              <strong>+91 00000 00000</strong>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <MapPin size={19} />
            </div>

            <div>
              <span>Location</span>
              <strong>India</strong>
            </div>
          </div>
        </div>

        <form className="contact-form-card" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>

          <label htmlFor="contact-name">Name</label>

          <input
            id="contact-name"
            type="text"
            placeholder="Enter your name"
            required
          />

          <label htmlFor="contact-email">Email</label>

          <input
            id="contact-email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="contact-message">Message</label>

          <textarea
            id="contact-message"
            rows="5"
            placeholder="Write your message..."
            required
          />

          <button type="submit" className="contact-submit-btn">
            <Send size={17} />
            Send Message
          </button>

          {submitted && (
            <p className="contact-success">
              Message received. Thank you for contacting EduManage!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Contact;