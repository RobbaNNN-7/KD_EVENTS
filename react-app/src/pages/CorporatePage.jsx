import MainLayout from '../components/layout/MainLayout';
import './CorporatePage.css';

const CorporatePage = () => {
    return (
        <MainLayout>
            <div className="corporate-page">
                <div className="page-header">
                    <h1>Corporate Events & Decor</h1>
                    <p>Professional event management solutions for your business</p>
                </div>

                <section className="corporate-intro">
                    <h2>Transform Your Business Gatherings</h2>
                    <p>
                        At HD Events, we specialize in creating impactful corporate events that leave lasting impressions.
                        From intimate board meetings to large-scale conferences, our team delivers exceptional experiences
                        tailored to your business objectives.
                    </p>
                </section>

                <section className="corporate-services">
                    <h2>Our Corporate Services</h2>
                    <div className="services-list">
                        <div className="service-item">
                            <i className="fas fa-users"></i>
                            <h3>Conferences & Seminars</h3>
                            <p>Professional setup and management for corporate gatherings of all sizes</p>
                        </div>
                        <div className="service-item">
                            <i className="fas fa-rocket"></i>
                            <h3>Product Launches</h3>
                            <p>Make a bold statement with innovative and engaging product unveilings</p>
                        </div>
                        <div className="service-item">
                            <i className="fas fa-hands-helping"></i>
                            <h3>Team Building Events</h3>
                            <p>Foster collaboration and boost morale with expertly planned team activities</p>
                        </div>
                        <div className="service-item">
                            <i className="fas fa-award"></i>
                            <h3>Awards Ceremonies</h3>
                            <p>Celebrate achievements with elegant and memorable award shows</p>
                        </div>
                    </div>
                </section>

                <section className="why-corporate">
                    <h2>Why Choose HD Events for Corporate Events?</h2>
                    <ul>
                        <li>
                            <i className="fas fa-check-circle"></i>
                            Professional event coordination and management
                        </li>
                        <li>
                            <i className="fas fa-check-circle"></i>
                            State-of-the-art audio-visual equipment
                        </li>
                        <li>
                            <i className="fas fa-check-circle"></i>
                            Customized decor and branding solutions
                        </li>
                        <li>
                            <i className="fas fa-check-circle"></i>
                            On-site technical support
                        </li>
                        <li>
                            <i className="fas fa-check-circle"></i>
                            Flexible packages to suit your budget
                        </li>
                    </ul>
                </section>

                <section className="corporate-cta">
                    <h2>Ready to Elevate Your Corporate Event?</h2>
                    <p>Let's discuss how we can make your next business event a success</p>
                    <a href="#contact" className="cta-button">Get in Touch</a>
                </section>
            </div>
        </MainLayout>
    );
};

export default CorporatePage;
