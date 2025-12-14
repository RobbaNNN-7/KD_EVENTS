import { useState, useRef, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import './VenueScout.css';

const VenueScout = () => {
    const scrollContainerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(false);

    const venues = [
        {
            id: 1,
            name: "The Royal Palace",
            tagline: "Where Legends Are Born",
            description: "A colossal structure of marble and gold, echoing with the whispers of history.",
            image: "/assets/images/dest_wedding-1.jpeg",
            color: "#FFD700", // Gold
            soundType: "classical",
            coordinates: { lat: 33.7294, lng: 73.0931 } // Islamabad - Margalla area
        },
        {
            id: 2,
            name: "Midnight Garden",
            tagline: "Nature's Secret Ballroom",
            description: "Surrounded by bioluminescent flora, this garden comes alive when the sun sets.",
            image: "/assets/images/outdoor_event.png",
            color: "#00FF7F", // Spring Green
            soundType: "nature",
            coordinates: { lat: 33.6844, lng: 73.0479 } // Islamabad - F-7 sector
        },
        {
            id: 3,
            name: "Neon Sky Deck",
            tagline: "Touch the Stars",
            description: "A futuristic rooftop suspending you above the pulse of the city.",
            image: "/assets/images/concert.jpg",
            color: "#00BFFF", // Deep Sky Blue
            soundType: "city",
            coordinates: { lat: 33.7077, lng: 73.0498 } // Islamabad - Blue Area
        },
        {
            id: 4,
            name: "Ocean's Edge",
            tagline: "Serenity meets Infinity",
            description: "Where the waves compose the symphony for your vows.",
            image: "/assets/images/dest_wedding-3.jpeg",
            color: "#00CED1", // Dark Turquoise
            soundType: "ocean",
            coordinates: { lat: 24.8607, lng: 67.0011 } // Karachi - Beach area
        }
    ];

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = scrollContainerRef.current.scrollLeft;
            const width = scrollContainerRef.current.offsetWidth;
            const index = Math.round(scrollLeft / width);
            setActiveIndex(index);
        }
    };

    const toggleSound = () => {
        setSoundEnabled(!soundEnabled);
        // In a real implementation, this would trigger different audio tracks based on venues[activeIndex].soundType
    };

    // Dynamic background style based on active venue
    const activeColor = venues[activeIndex].color;

    return (
        <MainLayout>
            <div className="venue-immersion" style={{ '--accent-color': activeColor }}>
                <div className="immersion-header">
                    <div className="brand">Venue Immersion</div>
                    <div className="controls">
                        <button
                            className={`sound-toggle ${soundEnabled ? 'active' : ''}`}
                            onClick={toggleSound}
                        >
                            <i className={`fas ${soundEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
                            <span>{soundEnabled ? 'Ambience On' : 'Ambience Off'}</span>
                        </button>
                    </div>
                </div>

                <div
                    className="film-strip"
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                >
                    {venues.map((venue, index) => (
                        <section key={venue.id} className="venue-scene">
                            <div className="scene-bg">
                                <img src={venue.image} alt={venue.name} />
                                <div className="overlay"></div>
                            </div>

                            <div className={`scene-content ${index === activeIndex ? 'active' : ''}`}>
                                <h2 className="venue-title" data-text={venue.name}>{venue.name}</h2>
                                <h3 className="venue-tagline">{venue.tagline}</h3>
                                <p className="venue-description">{venue.description}</p>
                                <button
                                    className="explore-btn"
                                    onClick={() => {
                                        // Open Google Maps 3D aerial view of the venue
                                        const url = `https://www.google.com/maps/@${venue.coordinates.lat},${venue.coordinates.lng},500a,35y,39.48t/data=!3m1!1e3`;
                                        window.open(url, '_blank');
                                    }}
                                >
                                    <span>Teleport Here</span>
                                    <div className="btn-line"></div>
                                </button>
                            </div>
                        </section>
                    ))}
                </div>

                <div className="cinematic-indicators">
                    {venues.map((_, i) => (
                        <div
                            key={i}
                            className={`indicator ${i === activeIndex ? 'active' : ''}`}
                            onClick={() => {
                                scrollContainerRef.current.scrollTo({
                                    left: i * scrollContainerRef.current.offsetWidth,
                                    behavior: 'smooth'
                                });
                            }}
                        />
                    ))}
                </div>

                <div className="scroll-hint">
                    <span>Swipe to Explore</span>
                    <i className="fas fa-arrow-right"></i>
                </div>
            </div>
        </MainLayout>
    );
};

export default VenueScout;
