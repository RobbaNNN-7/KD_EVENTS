import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
    const services = [
        {
            title: 'Decor and Ambience',
            image: '/assets/images/event-1.jpeg',
            icon: 'fa-building',
            description: 'Transform your business gatherings into unforgettable experiences',
            features: ['Conferences & Seminars', 'Team Building Events', 'Product Launches'],
            link: '/corporate'
        },
        {
            title: 'Wedding Planning',
            image: '/assets/images/dest_wedding-1.jpeg',
            icon: 'fa-heart',
            description: 'Creating magical moments for your special day',
            features: ['Full Wedding Planning', 'Destination Weddings', 'Wedding Design & Decor'],
            link: '/services/weddings'
        },
        {
            title: 'Entertainment Solutions',
            image: '/assets/images/concert.jpg',
            icon: 'fa-music',
            description: 'Bringing life to your events with premium entertainment',
            features: ['Live Music & DJs', 'Cultural Performances', 'Interactive Shows'],
            link: '/services/entertainment'
        },
        {
            title: 'Catering Services',
            image: '/assets/images/dest_wedding-3.jpeg',
            icon: 'fa-utensils',
            description: 'Exquisite culinary experiences for your events',
            features: ['Custom Menu Planning', 'International Cuisine', 'Dietary Accommodations'],
            link: '/services/catering'
        },
        {
            title: 'Technical Production',
            image: '/assets/images/SMD.jpg',
            icon: 'fa-video',
            description: 'State-of-the-art technical support for flawless events',
            features: ['Sound & Lighting', 'Video Production', 'Live Streaming'],
            link: '/services/technical'
        }
    ];

    return (
        <section id="services" className="services-section">
            <div className="section-header">
                <h2>Our Services</h2>
            </div>

            <div className="services-grid">
                {services.map((service, index) => (
                    <div className="service-card" key={index}>
                        <div className="service-image">
                            <img src={service.image} alt={service.title} />
                            <div className="service-overlay"></div>
                        </div>
                        <div className="service-content">
                            <div className="service-icon">
                                <i className={`fas ${service.icon}`}></i>
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <ul className="service-list">
                                {service.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                            {service.link.startsWith('/corporate') ? (
                                <Link to={service.link} className="service-btn">
                                    <span>Explore</span>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M7 7l5 5-5 5m5-5h-12" />
                                    </svg>
                                </Link>
                            ) : (
                                <button
                                    className="service-btn disabled"
                                    disabled
                                    style={{
                                        opacity: 0.5,
                                        cursor: 'not-allowed',
                                        pointerEvents: 'none'
                                    }}
                                >
                                    <span>Coming Soon</span>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M7 7l5 5-5 5m5-5h-12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
