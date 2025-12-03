import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        message: ''
    });

    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 5000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Initialize EmailJS if you have it configured
        // Replace with your actual EmailJS service ID, template ID, and public key
        const serviceID = 'YOUR_SERVICE_ID';
        const templateID = 'YOUR_TEMPLATE_ID';
        const publicKey = 'YOUR_PUBLIC_KEY';

        emailjs.send(serviceID, templateID, formData, publicKey)
            .then(() => {
                showNotification('Message sent successfully! We will get back to you soon.', 'success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    eventType: '',
                    message: ''
                });
            })
            .catch((error) => {
                console.error('Email send failed:', error);
                showNotification('Failed to send message. Please try again or contact us directly.', 'error');
            });
    };

    return (
        <section id="contact">
            <h2>Get in Touch</h2>
            <div className="contact-wrapper">
                <div className="contact-info">
                    <div className="contact-card">
                        <i className="fas fa-phone"></i>
                        <h3>Call Us</h3>
                        <p>Main Office: +92 3265445388</p>
                        <p>Events Team: 0341-2888684</p>
                    </div>
                    <div className="contact-card">
                        <i className="fas fa-envelope"></i>
                        <h3>Email Us</h3>
                        <p>info@eventsbykd.com</p>
                        <p>hdsuppliess@gmail.com</p>
                    </div>
                    <div className="contact-card">
                        <i className="fas fa-map-marker-alt"></i>
                        <h3>Visit Us</h3>
                        <p>E-11 Islamabad, Pakistan</p>
                    </div>
                </div>

                <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <select
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Event Type</option>
                            <option value="wedding">Wedding</option>
                            <option value="corporate">Corporate Event</option>
                            <option value="concert">Concert</option>
                            <option value="qawalli">Qawalli Night</option>
                            <option value="conference">Conference</option>
                            <option value="birthday">Birthday Party</option>
                            <option value="cultural">Cultural Event</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <textarea
                            name="message"
                            placeholder="Tell us about your event"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Send Message</button>
                </form>

                {notification.show && (
                    <div className={`notification-container ${notification.type}`}>
                        {notification.message}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Contact;
