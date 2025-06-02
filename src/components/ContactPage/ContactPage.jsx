import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactPage.css';

const ContactPage = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);


  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceID = 'service_rchjiqk';
    const templateID = 'template_ziqdo6b';
    const publicKey = '42oxAFwjI1Xp4-W66';


    if (!serviceID || !templateID || !publicKey) {
      console.error('EmailJS environment variables are not set.');
      setSubmitStatus('error');
      setIsSubmitting(false);
      alert('EmailJS configuration is missing. Please contact the site administrator.');
      return;
    }

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
          console.log('EmailJS Success:', result.text);
          setSubmitStatus('success');
          form.current.reset();
      }, (error) => {
          console.error('EmailJS Error:', error.text);
          setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="contact-page-container">
      <div className="contact-form-card">
        <h2>Contact Me</h2>
        <p>Feel free to reach out! Fill in the form below or connect with me through other platforms.</p>
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="form-group">
            <label htmlFor="user_name">Name</label>
            <input type="text" id="user_name" name="from_name" required />
          </div>
          <div className="form-group">
            <label htmlFor="user_email">Email</label>
            <input type="email" id="user_email" name="from_email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {submitStatus === 'success' && <p className="submit-message success">Message sent successfully! You should receive a confirmation email shortly.</p>}
          {submitStatus === 'error' && <p className="submit-message error">Failed to send message. Please try again or contact me directly via LinkedIn/Email.</p>}
        </form>
        <div className="alternative-contact">
          <p>Or find me on:</p>
          <div className="social-links">
            <a href="https://linkedin.com/in/vinayak-singh-8ab2442ab/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:vinayaksinghforyou@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
