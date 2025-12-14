import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import './PackagesPage.css';

const PackagesPage = () => {
    const [guests, setGuests] = useState(100);
    const [eventType, setEventType] = useState('wedding');

    // Simple estimator logic
    const baseRate = eventType === 'wedding' ? 150 : eventType === 'corporate' ? 100 : 80;
    const estimatedCost = guests * baseRate;

    return (
        <MainLayout>
            <div className="packages-page">
                <header className="packages-header">
                    <h1>Curated Packages</h1>
                    <p>Transparent pricing for extraordinary experiences</p>
                </header>

                <div className="pricing-tiers">
                    <div className="price-card silver">
                        <div className="card-header">
                            <h3>Silver</h3>
                            <div className="price">$2,999</div>
                            <p>Essential Elegance</p>
                        </div>
                        <ul className="features-list">
                            <li><i className="fas fa-check"></i> Venue Selection</li>
                            <li><i className="fas fa-check"></i> Basic Decor</li>
                            <li><i className="fas fa-check"></i> Standard Sound</li>
                            <li><i className="fas fa-check"></i> Day-of Coordination</li>
                        </ul>
                        <button className="btn-select">Select Silver</button>
                    </div>

                    <div className="price-card gold popular">
                        <div className="badge">Most Popular</div>
                        <div className="card-header">
                            <h3>Gold</h3>
                            <div className="price">$5,999</div>
                            <p>Premium Experience</p>
                        </div>
                        <ul className="features-list">
                            <li><i className="fas fa-check"></i> Full Event Design</li>
                            <li><i className="fas fa-check"></i> Floral Arrangements</li>
                            <li><i className="fas fa-check"></i> Professional DJ/AV</li>
                            <li><i className="fas fa-check"></i> Catering Coordination</li>
                            <li><i className="fas fa-check"></i> Photography (4 Hours)</li>
                        </ul>
                        <button className="btn-select">Select Gold</button>
                    </div>

                    <div className="price-card platinum">
                        <div className="card-header">
                            <h3>Platinum</h3>
                            <div className="price">$12,999+</div>
                            <p>The Royal Treatment</p>
                        </div>
                        <ul className="features-list">
                            <li><i className="fas fa-check"></i> Luxury Venue Styling</li>
                            <li><i className="fas fa-check"></i> Gourmet Catering</li>
                            <li><i className="fas fa-check"></i> Live Entertainment</li>
                            <li><i className="fas fa-check"></i> Cinematography</li>
                            <li><i className="fas fa-check"></i> Guest Concierge</li>
                            <li><i className="fas fa-check"></i> Full Planning Service</li>
                        </ul>
                        <button className="btn-select">Select Platinum</button>
                    </div>
                </div>

                <div className="estimator-section">
                    <h2>Custom Event Estimator</h2>
                    <div className="estimator-box">
                        <div className="input-group">
                            <label>Event Type</label>
                            <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                                <option value="wedding">Wedding</option>
                                <option value="corporate">Corporate</option>
                                <option value="social">Social Party</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Guest Count: {guests}</label>
                            <input
                                type="range"
                                min="50"
                                max="1000"
                                step="10"
                                value={guests}
                                onChange={(e) => setGuests(parseInt(e.target.value))}
                            />
                        </div>
                        <div className="estimated-total">
                            <span>Estimated Base Cost:</span>
                            <div className="cost">${estimatedCost.toLocaleString()}</div>
                            <p className="disclaimer">*Approximation only. Final quote varies by requirements.</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default PackagesPage;
