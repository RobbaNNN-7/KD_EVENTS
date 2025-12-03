import { useRef, useEffect } from 'react';
import './About.css';

const About = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(error => {
                console.log('Video autoplay failed:', error);
            });
        }
    }, []);

    return (
        <section id="about" className="about-section">
            <div className="about-container">
                <div className="about-header" data-aos="fade-up">
                    <span className="about-badge">About Us</span>
                    <h2 className="about-title">Crafting Unforgettable Moments</h2>
                    <p className="about-subtitle">Where Innovation Meets Excellence in Event Management</p>
                </div>

                <div className="about-content-wrapper">
                    <div className="about-image-grid" data-aos="fade-right">
                        <div className="about-image main">
                            <video ref={videoRef} autoPlay loop muted playsInline>
                                <source src="/assets/videos/qawalli_video.mp4" type="video/mp4" />
                            </video>
                            <div className="experience-tag">
                                <span>5+</span>
                                <p>Years of Excellence</p>
                            </div>
                        </div>
                        <div className="about-image secondary">
                            {/* Empty secondary image container */}
                        </div>
                    </div>

                    <div className="about-content" data-aos="fade-left">
                        <div className="about-cards">
                            <div className="about-card">
                                <div className="card-icon">
                                    <i className="fas fa-eye"></i>
                                </div>
                                <h3>Our Vision</h3>
                                <p>To revolutionize event experiences through innovation and creativity.</p>
                            </div>
                            <div className="about-card">
                                <div className="card-icon">
                                    <i className="fas fa-bullseye"></i>
                                </div>
                                <h3>Our Mission</h3>
                                <p>Delivering exceptional events that exceed expectations and create lasting memories.</p>
                            </div>
                        </div>

                        <div className="about-features">
                            <div className="feature">
                                <i className="fas fa-paint-brush"></i>
                                <div>
                                    <h4>Creative Excellence</h4>
                                    <p>Innovative designs and unique concepts</p>
                                </div>
                            </div>
                            <div className="feature">
                                <i className="fas fa-users"></i>
                                <div>
                                    <h4>Expert Team</h4>
                                    <p>Dedicated professionals at your service</p>
                                </div>
                            </div>
                            <div className="feature">
                                <i className="fas fa-cog"></i>
                                <div>
                                    <h4>Custom Solutions</h4>
                                    <p>Tailored to your unique requirements</p>
                                </div>
                            </div>
                        </div>

                        <div className="about-stats">
                            <div className="stat">
                                <span className="stat-number">100+</span>
                                <span className="stat-label">Events</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Clients</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">15+</span>
                                <span className="stat-label">Team</span>
                            </div>
                        </div>

                        <a href="#contact" className="about-cta">
                            <span>Start Your Journey</span>
                            <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
