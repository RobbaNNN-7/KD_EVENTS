import { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            text: "HD Events transformed our corporate gathering into an unforgettable experience. Their attention to detail and innovative approach exceeded all expectations.",
            author: "Sarah Johnson",
            position: "Corporate Event Manager"
        },
        {
            text: "The team's creativity and professionalism made our product launch a remarkable success. They truly understand how to create impact.",
            author: "Michael Chen",
            position: "Marketing Director"
        },
        {
            text: "From concept to execution, their dedication to excellence was evident. They delivered beyond our expectations.",
            author: "Emma Thompson",
            position: "Event Coordinator"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="testimonials" className="testimonials-section">
            <div className="testimonials-wrapper" style={{ textAlign: 'center', fontSize: '2rem' }}>
                <div className="testimonials-intro">
                    <span className="testimonial-badge">Client Stories</span>
                    <h2>What Our Clients Say</h2>
                </div>

                <div className="testimonials-slider">
                    {testimonials.map((testimonial, index) => (
                        <div
                            className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
                            key={index}
                            style={{
                                visibility: index === currentIndex ? 'visible' : 'hidden',
                                opacity: index === currentIndex ? '1' : '0',
                                transform: index === currentIndex ? 'translateX(0)' : 'translateX(50px)'
                            }}
                        >
                            <div className="quote-icon">
                                <i className="fas fa-quote-right"></i>
                            </div>
                            <p className="testimonial-text">{testimonial.text}</p>
                            <div className="testimonial-author">
                                <h4>{testimonial.author}</h4>
                                <span>{testimonial.position}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="testimonial-controls">
                    <div className="testimonial-dots">
                        {testimonials.map((_, index) => (
                            <div
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
