import './WhyUs.css';

const WhyUs = () => {
    return (
        <section id="why-us" className="choose-section">
            <div className="choose-container">
                <div className="choose-header" data-aos="fade-up">
                    <span className="choose-badge">Why Choose Us</span>
                    <h2 className="choose-title">Elevating Events to Art</h2>
                    <p className="choose-subtitle">We combine creativity with precision to deliver extraordinary experiences</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card" data-aos="fade-up">
                        <div className="feature-icon">
                            <div className="icon-circle">
                                <i className="fas fa-wand-magic-sparkles"></i>
                            </div>
                        </div>
                        <div className="feature-content">
                            <h3>Create Your Own Design</h3>
                            <p>At HD Events, we believe in the power of creativity to transform ordinary spaces into extraordinary experiences. Our team of talented designers and event planners work closely with you to create a design that perfectly reflects your vision and style.</p>
                        </div>
                        <div className="hover-line"></div>
                    </div>

                    <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
                        <div className="feature-icon">
                            <div className="icon-circle">
                                <i className="fas fa-gem"></i>
                            </div>
                        </div>
                        <div className="feature-content">
                            <h3>Premium Quality</h3>
                            <p>Uncompromising attention to detail and use of premium materials in every event.</p>
                        </div>
                        <div className="hover-line"></div>
                    </div>

                    <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
                        <div className="feature-icon">
                            <div className="icon-circle">
                                <i className="fas fa-clock"></i>
                            </div>
                        </div>
                        <div className="feature-content">
                            <h3>Timely Execution</h3>
                            <p>Precise planning and flawless execution, ensuring every moment unfolds perfectly.</p>
                        </div>
                        <div className="hover-line"></div>
                    </div>

                    <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
                        <div className="feature-icon">
                            <div className="icon-circle">
                                <i className="fas fa-handshake"></i>
                            </div>
                        </div>
                        <div className="feature-content">
                            <h3>Dedicated Support</h3>
                            <p>Personal attention and professional guidance throughout your event journey.</p>
                        </div>
                        <div className="hover-line"></div>
                    </div>
                </div>

                <div className="experience-block" data-aos="fade-up">
                    <div className="experience-content">
                        <div className="experience-text">
                            <h3>Experience the Difference</h3>
                            <p>Join the growing family of satisfied clients who trust HD Events for their special moments.</p>
                            <a href="#contact" className="experience-cta">
                                <span>Start Planning</span>
                                <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                        <div className="achievement-stats">
                            <div className="achievement-item">
                                <span className="achievement-value">5+</span>
                                <span className="achievement-label">Years of Excellence</span>
                            </div>
                            <div className="achievement-item">
                                <span className="achievement-value">100+</span>
                                <span className="achievement-label">Happy Clients</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
