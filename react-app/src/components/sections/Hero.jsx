import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const mainVideoRef = useRef(null);
    const accentVideoRef = useRef(null);

    useEffect(() => {
        const videos = [mainVideoRef.current, accentVideoRef.current];

        videos.forEach(video => {
            if (video) {
                video.load();
                video.play().catch(error => {
                    console.log('Video autoplay failed:', error);
                    video.currentTime = 0.1;
                });
            }
        });
    }, []);

    return (
        <section className="hero-new">
            <div className="hero-split">
                {/* Left Content */}
                <div className="hero-content-left">
                    <div className="hero-eyebrow" data-aos="fade-down">
                        <span className="line"></span>
                        <span className="text">HD Events Presents</span>
                    </div>

                    <div className="hero-main-text" data-aos="fade-right">
                        <h1>
                            Your Vision <br />
                            <span className="accent-text">Our Expertise</span> Into
                            <span className="gradient-text">A Perfect Event</span>
                        </h1>
                    </div>

                    <div className="hero-stats" data-aos="fade-up">
                        <div className="stat">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Events Completed</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <div className="stat-number">100%</div>
                            <div className="stat-label">Client Satisfaction</div>
                        </div>
                    </div>

                    <div className="hero-cta" data-aos="fade-up" data-aos-delay="200">
                        <Link to="/event-creator" className="cta-primary">
                            <span>Curate your Event</span>
                            <div className="btn-glow"></div>
                        </Link>
                        <Link to="/packages" className="cta-secondary">
                            View Packages
                        </Link>
                    </div>
                </div>

                {/* Right Content */}
                <div className="hero-content-right">
                    <div className="video-stack">
                        <div className="video-container main" data-aos="fade-left">
                            <video ref={mainVideoRef} autoPlay loop muted playsInline>
                                <source src="/assets/videos/hd-reel.mp4" type="video/mp4" />
                            </video>
                            <div className="video-overlay"></div>
                        </div>
                        <div className="video-container accent" data-aos="fade-up">
                            <video ref={accentVideoRef} autoPlay loop muted playsInline>
                                <source src="/assets/videos/dest_wedding_video-11.mp4" type="video/mp4" />
                            </video>
                            <div className="video-overlay"></div>
                        </div>
                    </div>
                    <div className="floating-badge" data-aos="zoom-in">
                        <div className="badge-content">
                            <span className="badge-title">Premium</span>
                            <span className="badge-text">Event Design</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-prompt" data-aos="fade-up" data-aos-delay="400">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <div className="prompt-text">Scroll to Discover</div>
            </div>
        </section>
    );
};

export default Hero;
