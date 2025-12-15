import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Hero from '../components/sections/Hero';
import WhyUs from '../components/sections/WhyUs';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Experience from '../components/sections/Experience';
import Team from '../components/sections/Team';
import RecentProjects from '../components/sections/RecentProjects';
import Testimonials from '../components/sections/Testimonials';
import GalleryShowcase from '../components/sections/GalleryShowcase';
import Contact from '../components/sections/Contact';
import FAQ from '../components/sections/FAQ';

const WelcomeModal = ({ onClose, onNavigate }) => (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
        backdropFilter: 'blur(5px)'
    }}>
        <div style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            padding: '50px',
            borderRadius: '24px',
            maxWidth: '550px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            animation: 'fadeIn 0.5s ease-out'
        }}>
            <h2 style={{
                fontSize: '2.8rem',
                marginBottom: '20px',
                background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700',
                letterSpacing: '-0.5px'
            }}>Welcome to KD Events</h2>
            <p style={{
                fontSize: '1.2rem',
                color: '#cccccc',
                marginBottom: '40px',
                lineHeight: '1.6',
                fontWeight: '300'
            }}>
                Start planning your dream event with our immersive 3D creator, or explore our premium services.
            </p>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <button
                    onClick={onNavigate}
                    style={{
                        padding: '20px 40px',
                        background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '16px',
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        boxShadow: '0 10px 30px rgba(255, 107, 107, 0.4)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 107, 0.5)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.4)';
                    }}
                >
                    <i className="fas fa-magic" style={{ marginRight: '12px' }}></i>
                    Curate Your Event
                </button>
                <button
                    onClick={onClose}
                    style={{
                        padding: '14px 28px',
                        background: 'rgba(255,255,255,0.05)',
                        color: '#999',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.color = '#999';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    }}
                >
                    Explore Website
                </button>
            </div>
        </div>
    </div>
);

const HomePage = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Show modal on first visit (session storage)
        const hasVisited = sessionStorage.getItem('hasVisitedHome');
        if (!hasVisited) {
            setShowModal(true);
            sessionStorage.setItem('hasVisitedHome', 'true');
        }
    }, []);

    const handleCreateEvent = () => {
        setShowModal(false);
        navigate('/event-creator');
    };

    return (
        <MainLayout>
            {showModal && (
                <WelcomeModal
                    onClose={() => setShowModal(false)}
                    onNavigate={handleCreateEvent}
                />
            )}
            <Hero />
            <WhyUs />
            <About />
            <Services />
            <Experience />
            <Team />
            <RecentProjects />
            <Testimonials />
            <GalleryShowcase />
            <Contact />
            <FAQ />
        </MainLayout>
    );
};

export default HomePage;
