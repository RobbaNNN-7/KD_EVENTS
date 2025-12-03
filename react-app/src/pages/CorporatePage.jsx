import MainLayout from '../components/layout/MainLayout';
import { Link } from 'react-router-dom';
import './CorporatePage.css';

const CorporatePage = () => {
    return (
        <MainLayout>
            <div className="corporate-page">
                {/* Hero Section */}
                <section className="service-hero">
                    <div className="floating-circles">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                    <div className="hero-particles"></div>

                    <div className="hero-grid">
                        <div className="hero-content">
                            <span className="hero-label">Corporate Events</span>
                            <h1>Elevate Your <br />Business Identity</h1>
                            <p className="hero-description">
                                We craft immersive corporate experiences that align with your brand vision and business objectives.
                            </p>

                            <div className="hero-stats">
                                <div className="stat-item">
                                    <span className="stat-number">500+</span>
                                    <span className="stat-label">Corporate Events</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">50+</span>
                                    <span className="stat-label">Fortune 500 Clients</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="abstract-shapes">
                                <div className="shape shape-1"></div>
                                <div className="shape shape-2"></div>
                                <div className="shape shape-3"></div>
                                <div className="shape shape-4"></div>
                            </div>
                            <div className="decorative-text">
                                <span>Impact</span>
                                <span>Vision</span>
                                <span>Success</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="features-section">
                    <div className="features-grid">
                        <div className="feature-card">
                            <i className="fas fa-bullseye"></i>
                            <h3>Strategic Planning</h3>
                            <p>Meticulous planning aligned with your business goals and ROI targets.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-layer-group"></i>
                            <h3>Brand Integration</h3>
                            <p>Seamless incorporation of your brand identity into every event element.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-magic"></i>
                            <h3>Innovative Concepts</h3>
                            <p>Cutting-edge themes and technologies to engage your audience.</p>
                        </div>
                    </div>
                </section>

                {/* Decor Details */}
                <section className="decor-details">
                    <div className="section-header">
                        <h2>Premium Decor Solutions</h2>
                        <p className="subtitle">Creating environments that inspire and impress</p>
                    </div>

                    <div className="decor-grid">
                        <div className="decor-card">
                            <div className="card-image">
                                <img src="/assets/images/event-1.jpeg" alt="Stage Design" />
                                <div className="hover-overlay">
                                    <i className="fas fa-search-plus"></i>
                                </div>
                            </div>
                            <div className="card-content">
                                <h3>Stage Design</h3>
                                <ul>
                                    <li><i className="fas fa-check"></i> 3D Visualization</li>
                                    <li><i className="fas fa-check"></i> Custom Fabrication</li>
                                    <li><i className="fas fa-check"></i> LED Integration</li>
                                </ul>
                            </div>
                        </div>

                        <div className="decor-card">
                            <div className="card-image">
                                <img src="/assets/images/SMD.jpg" alt="AV Production" />
                                <div className="hover-overlay">
                                    <i className="fas fa-search-plus"></i>
                                </div>
                            </div>
                            <div className="card-content">
                                <h3>AV Production</h3>
                                <ul>
                                    <li><i className="fas fa-check"></i> SMD Screens</li>
                                    <li><i className="fas fa-check"></i> Professional Sound</li>
                                    <li><i className="fas fa-check"></i> Intelligent Lighting</li>
                                </ul>
                            </div>
                        </div>

                        <div className="decor-card">
                            <div className="card-image">
                                <img src="/assets/images/outdoor_event.png" alt="Venue Styling" />
                                <div className="hover-overlay">
                                    <i className="fas fa-search-plus"></i>
                                </div>
                            </div>
                            <div className="card-content">
                                <h3>Venue Styling</h3>
                                <ul>
                                    <li><i className="fas fa-check"></i> Floral Arrangements</li>
                                    <li><i className="fas fa-check"></i> Furniture Rentals</li>
                                    <li><i className="fas fa-check"></i> Thematic Props</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Interactive Showcase */}
                <section className="interactive-showcase">
                    <div className="showcase-text">
                        <h3>Our Process</h3>
                        <div className="process-steps">
                            <div className="step">
                                <div className="step-number">1</div>
                                <h4>Consultation</h4>
                                <p>Understanding your objectives and requirements</p>
                            </div>
                            <div className="step">
                                <div className="step-number">2</div>
                                <h4>Design</h4>
                                <p>Creating concepts and 3D visualizations</p>
                            </div>
                            <div className="step">
                                <div className="step-number">3</div>
                                <h4>Execution</h4>
                                <p>Flawless on-site management and delivery</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <h2>Ready to Transform Your Next Event?</h2>
                    <p>Let's create something extraordinary together</p>
                    <Link to="/event-creator" className="cta-button">
                        Start Designing Now
                    </Link>
                </section>
            </div>
        </MainLayout>
    );
};

export default CorporatePage;
