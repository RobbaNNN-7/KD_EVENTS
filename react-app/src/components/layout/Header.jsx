import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        closeMobileMenu();

        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={isScrolled ? 'scrolled' : ''}>
            <nav>
                <div className="logo-container">
                    <img src="/assets/images/hd.png" alt="Logo" className="logo-img" />
                    <div className="logo-text">HD Events</div>
                </div>

                <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')}>Services</a></li>
                    <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')}>About</a></li>
                    <li><a href="#experience" onClick={(e) => scrollToSection(e, '#experience')}>Experience</a></li>
                    <li><a href="#testimonials" onClick={(e) => scrollToSection(e, '#testimonials')}>Testimonials</a></li>
                    <li><Link to="/gallery" onClick={closeMobileMenu}>Gallery</Link></li>
                    <li><a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="contact-btn">Contact</a></li>
                </ul>

                <div
                    className={`mobile-nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </header>
    );
};

export default Header;
