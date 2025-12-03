import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-section">
                    <h4>EVENTS BY KD</h4>
                    <p>Creating unforgettable experiences in Islamabad and beyond.</p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
                <div className="footer-section">
                    <h5>Quick Links</h5>
                    <ul>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#team">Our Team</a></li>
                        <li><a href="#experience">Experience</a></li>
                        <li><a href="#equipment">Equipment</a></li>
                        <li><a href="#gallery">Gallery</a></li>
                        <li><a href="#booking">Book an Event</a></li>
                        <li><a href="#faq">FAQs</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h5>Our Services</h5>
                    <ul>
                        <li>Event Planning</li>
                        <li>Decor & Ambiance</li>
                        <li>Catering Services</li>
                        <li>Venue Management</li>
                        <li>Photography</li>
                        <li>Entertainment</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h5>Contact Us</h5>
                    <p><i className="fas fa-map-marker-alt"></i> Islamabad, Pakistan</p>
                    <p><i className="fas fa-phone"></i> Main: +92 3265445388</p>
                    <p><i className="fas fa-phone"></i> Events: 0341-2888684</p>
                    <p><i className="fas fa-envelope"></i> info@eventsbykd.com</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 EVENTS BY KD. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Sitemap</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
