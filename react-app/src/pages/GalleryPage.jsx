import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import './GalleryPage.css';

const GalleryPage = () => {
    const [filter, setFilter] = useState('all');

    const galleryItems = [
        { id: 1, type: 'video', src: '/assets/videos/dest_wedding_video-1.mp4', title: 'Destination Wedding Highlights', category: 'wedding', size: 'vertical' },
        { id: 2, type: 'image', src: '/assets/images/qawalli.jpg', title: 'Qawalli Night', category: 'cultural', size: 'square' },
        { id: 3, type: 'image', src: '/assets/images/bollywood.jpg', title: 'Bollywood Night', category: 'entertainment', size: 'horizontal' },
        { id: 4, type: 'image', src: '/assets/images/birthday.jpg', title: 'Birthday Celebration', category: 'social', size: 'square' },
        { id: 5, type: 'image', src: '/assets/images/concert.jpg', title: 'Live Concert', category: 'entertainment', size: 'vertical' },
        { id: 6, type: 'image', src: '/assets/images/dest_wedding-1.jpeg', title: 'Wedding Setup', category: 'wedding', size: 'horizontal' },
        { id: 7, type: 'image', src: '/assets/images/dest_wedding-3.jpeg', title: 'Floral Decor', category: 'wedding', size: 'square' },
        { id: 8, type: 'video', src: '/assets/videos/dest_wedding_video2.mp4', title: 'Wedding Moments', category: 'wedding', size: 'vertical' },
        { id: 9, type: 'image', src: '/assets/images/dest_wedding-5.jpg', title: 'Venue Lighting', category: 'wedding', size: 'horizontal' },
        { id: 10, type: 'image', src: '/assets/images/dest_wedding-6.jpg', title: 'Grand Entrance', category: 'wedding', size: 'square' },
        { id: 11, type: 'image', src: '/assets/images/dest_wedding-7.jpg', title: 'Reception Stage', category: 'wedding', size: 'horizontal' },
        { id: 12, type: 'image', src: '/assets/images/concert-1.jpg', title: 'Music Festival', category: 'entertainment', size: 'vertical' },
    ];

    const filteredItems = filter === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === filter);

    return (
        <MainLayout>
            <div className="gallery-page">
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-media">
                        <video autoPlay muted loop playsInline className="hero-video">
                            <source src="/assets/videos/dest_wedding_video-1.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="hero-content">
                        <h1 className="hero-title">Our Portfolio</h1>
                        <p>Capturing moments that last a lifetime</p>
                    </div>
                </section>

                {/* Dynamic Gallery */}
                <section className="dynamic-gallery">
                    <div className="gallery-nav">
                        <button
                            className={`nav-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`nav-btn ${filter === 'wedding' ? 'active' : ''}`}
                            onClick={() => setFilter('wedding')}
                        >
                            Weddings
                        </button>
                        <button
                            className={`nav-btn ${filter === 'entertainment' ? 'active' : ''}`}
                            onClick={() => setFilter('entertainment')}
                        >
                            Entertainment
                        </button>
                        <button
                            className={`nav-btn ${filter === 'social' ? 'active' : ''}`}
                            onClick={() => setFilter('social')}
                        >
                            Social Events
                        </button>
                    </div>

                    <div className="gallery-masonry">
                        {filteredItems.map(item => (
                            <div key={item.id} className={`masonry-item ${item.size}`}>
                                {item.type === 'video' ? (
                                    <video controls muted>
                                        <source src={item.src} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img src={item.src} alt={item.title} />
                                )}
                                <div className="item-content">
                                    <h3>{item.title}</h3>
                                    <p>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

export default GalleryPage;
