import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import './VenueScout.css';

const VenueScout = () => {
    const [filter, setFilter] = useState('');

    const venues = [
        {
            id: 1,
            name: 'Grand Royal Palace',
            location: 'Downtown City',
            capacity: '500-1000',
            price: '$$$$',
            type: 'Banquet Hall',
            image: '/assets/images/dest_wedding-1.jpeg',
            features: ['AC', 'Parking', 'Catering']
        },
        {
            id: 2,
            name: 'Sunset Beach Resort',
            location: 'Coastal Highway',
            capacity: '200-500',
            price: '$$$',
            type: 'Outdoor',
            image: '/assets/images/dest_wedding-3.jpeg',
            features: ['Ocean View', 'Open Air', 'Stay']
        },
        {
            id: 3,
            name: 'Urban Loft Studio',
            location: 'Arts District',
            capacity: '50-150',
            price: '$$',
            type: 'Studio',
            image: '/assets/images/corporate_event.jpg',
            features: ['Modern', 'Sound System', 'Intimate']
        },
        {
            id: 4,
            name: 'Greenfield Estate',
            location: 'Countryside',
            capacity: '1000+',
            price: '$$$',
            type: 'Garden',
            image: '/assets/images/outdoor_event.png',
            features: ['Lawn', 'Tent', 'Eco-friendly']
        },
        {
            id: 5,
            name: 'Skyline Rooftop',
            location: 'City Center',
            capacity: '100-300',
            price: '$$$$',
            type: 'Rooftop',
            image: '/assets/images/concert.jpg',
            features: ['City View', 'Bar', 'Nightlife']
        },
        {
            id: 6,
            name: 'Historic Opera House',
            location: 'Old Town',
            capacity: '800',
            price: '$$$$$',
            type: 'Theater',
            image: '/assets/images/concert-1.jpg',
            features: ['Stage', 'Lighting', 'Classic']
        }
    ];

    const filteredVenues = venues.filter(venue =>
        venue.name.toLowerCase().includes(filter.toLowerCase()) ||
        venue.location.toLowerCase().includes(filter.toLowerCase()) ||
        venue.type.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <MainLayout>
            <div className="venue-scout-page">
                <header className="page-header">
                    <h1>Venue Scout</h1>
                    <p>Discover the perfect backdrop for your story</p>
                </header>

                <div className="search-container">
                    <div className="search-bar">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search by name, location, or type..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                </div>

                <div className="venues-grid">
                    {filteredVenues.map(venue => (
                        <div key={venue.id} className="venue-card">
                            <div className="venue-image">
                                <img src={venue.image} alt={venue.name} />
                                <div className="venue-price">{venue.price}</div>
                            </div>
                            <div className="venue-details">
                                <div className="venue-meta">
                                    <span className="venue-type">{venue.type}</span>
                                    <span className="venue-capacity">
                                        <i className="fas fa-users"></i> {venue.capacity}
                                    </span>
                                </div>
                                <h3>{venue.name}</h3>
                                <p className="venue-location">
                                    <i className="fas fa-map-marker-alt"></i> {venue.location}
                                </p>
                                <div className="venue-features">
                                    {venue.features.map((feature, i) => (
                                        <span key={i} className="feature-tag">{feature}</span>
                                    ))}
                                </div>
                                <button className="btn-scout">
                                    Scout This Venue <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default VenueScout;
