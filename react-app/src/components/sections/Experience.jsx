import './Experience.css';

const Experience = () => {
    return (
        <section id="experience" className="exp-section">
            <div className="exp-wrapper">
                <div className="exp-header">
                    <span className="exp-label">Our Journey</span>
                    <h2>Crafting Experiences Since 2019</h2>
                    <p>From intimate gatherings to grand celebrations, we've mastered the art of creating unforgettable moments</p>
                </div>

                <div className="exp-highlights">
                    <div className="highlight-card">
                        <div className="highlight-content">
                            <span className="highlight-number">100+</span>
                            <h3>Events Executed</h3>
                            <p>Every event, a masterpiece</p>
                        </div>
                        <div className="highlight-icon">
                            <i className="fas fa-star"></i>
                        </div>
                    </div>

                    <div className="highlight-card">
                        <div className="highlight-content">
                            <span className="highlight-number">50+</span>
                            <h3>Corporate Clients</h3>
                            <p>Trust built over years</p>
                        </div>
                        <div className="highlight-icon">
                            <i className="fas fa-building"></i>
                        </div>
                    </div>

                    <div className="highlight-card">
                        <div className="highlight-content">
                            <span className="highlight-number">15+</span>
                            <h3>Team Members</h3>
                            <p>Dedicated professionals</p>
                        </div>
                        <div className="highlight-icon">
                            <i className="fas fa-users"></i>
                        </div>
                    </div>
                </div>

                <div className="exp-categories">
                    <div className="category">
                        <div className="category-header">
                            <i className="fas fa-graduation-cap"></i>
                            <h3>Academic Events</h3>
                        </div>
                        <div className="category-list">
                            <span>Literary Festivals</span>
                            <span>Convocations</span>
                            <span>Cultural Nights</span>
                        </div>
                    </div>

                    <div className="category">
                        <div className="category-header">
                            <i className="fas fa-briefcase"></i>
                            <h3>Corporate Events</h3>
                        </div>
                        <div className="category-list">
                            <span>Conferences</span>
                            <span>Product Launches</span>
                            <span>Team Building</span>
                        </div>
                    </div>

                    <div className="category">
                        <div className="category-header">
                            <i className="fas fa-music"></i>
                            <h3>Entertainment</h3>
                        </div>
                        <div className="category-list">
                            <span>Music Festivals</span>
                            <span>Award Shows</span>
                            <span>Cultural Events</span>
                        </div>
                    </div>
                </div>

                <div className="exp-cta">
                    <div className="cta-content">
                        <h3>Ready to Create Something Special?</h3>
                        <p>Let's bring your vision to life</p>
                    </div>
                    <a href="#contact" className="cta-button">
                        Start Your Journey
                        <i className="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Experience;
