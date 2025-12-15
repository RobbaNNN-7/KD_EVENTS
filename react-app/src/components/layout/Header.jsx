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
                    {/* <img src="react-app/src/assets/images/hd.png" className="logo-img" /> */}
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <div className="logo-text">HD Events</div>
                    </Link>
                </div>

                <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/#services" onClick={closeMobileMenu}>Services</Link></li>
                    <li><Link to="/packages" onClick={closeMobileMenu}>Packages</Link></li>
                    <li><Link to="/live" onClick={closeMobileMenu}>Live</Link></li>
                    <li><Link to="/gallery" onClick={closeMobileMenu}>Gallery</Link></li>
                    <li><Link to="/#contact" onClick={closeMobileMenu} className="contact-btn">Contact</Link></li>
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
