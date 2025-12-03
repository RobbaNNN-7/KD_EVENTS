import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import './GalleryShowcase.css';

const GalleryShowcase = () => {
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
        <section className="gallery-showcase">
            <div className="container">
                {/* Header */}
                <div className="showcase-header" data-aos="fade-up">
                    <div className="header-content">
                        <span className="premium-tag">Portfolio</span>
                        <h2>Crafting Extraordinary Experiences</h2>
                        <p>Each event tells a unique story of innovation and elegance</p>
                    </div>
                </div>

                {/* Main Gallery Grid */}
                <div className="showcase-grid">
                    {/* Hero Piece */}
                    <div className="showcase-item hero" data-aos="fade-up">
                        <video ref={videoRef} autoPlay loop muted playsInline>
                            <source src="/assets/videos/hd-reel.mp4" type="video/mp4" />
                        </video>
                        <div className="item-overlay">
                            <div className="item-details">
                                <div className="category">Featured</div>
                                <h3>HD Events Signature</h3>
                                <p>Where dreams become reality</p>
                            </div>
                            <a href="/assets/videos/hd-reel.mp4" className="watch-btn" data-fancybox>
                                Watch Showreel
                                <span className="play-icon">
                                    <i className="fas fa-play"></i>
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Gallery Strip */}
                    <div className="gallery-strip">
                        <div className="strip-item" data-aos="fade-up" data-aos-delay="100">
                            <img src="/assets/images/qawalli.jpg" alt="Luxury Weddings" />
                            <div className="item-overlay">
                                <div className="category">Weddings</div>
                                <h4>Destination Dreams</h4>
                            </div>
                        </div>

                        <div className="strip-item" data-aos="fade-up" data-aos-delay="200">
                            <img src="/assets/images/dest_wedding-1.jpeg" alt="Corporate Events" />
                            <div className="item-overlay">
                                <div className="category">Corporate</div>
                                <h4>Business Excellence</h4>
                            </div>
                        </div>

                        <div className="strip-item" data-aos="fade-up" data-aos-delay="300">
                            <img src="/assets/images/concert-1.jpg" alt="Entertainment" />
                            <div className="item-overlay">
                                <div className="category">Entertainment</div>
                                <h4>Spectacular Shows</h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Explore Button */}
                <div className="explore-section" data-aos="fade-up">
                    <Link to="/gallery" className="explore-btn">
                        <span className="btn-text">Explore Full Gallery</span>
                        <span className="btn-icon">
                            <i className="fas fa-arrow-right"></i>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GalleryShowcase;
