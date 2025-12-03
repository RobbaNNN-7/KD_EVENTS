import { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: 'What types of events do you manage?',
            answer: 'We manage a wide range of events including weddings, corporate events, concerts, cultural shows, private parties, and academic events. Our experience spans events with 20 to 1500+ attendees.'
        },
        {
            question: 'How far in advance should I book your services?',
            answer: 'We recommend booking at least 2-3 months in advance for large events and 1-2 months for smaller events to ensure availability and adequate planning time.'
        },
        {
            question: 'Do you provide custom packages?',
            answer: 'Yes, we create customized packages based on your specific needs and budget. Our team will work with you to design a package that perfectly matches your requirements.'
        },
        {
            question: 'What is your payment structure?',
            answer: 'We typically require a 50% advance payment to secure the booking, with the remaining balance due one week before the event. We offer flexible payment plans for large events.'
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-container">
                {faqs.map((faq, index) => (
                    <div className="faq-item" key={index}>
                        <div className="faq-question" onClick={() => toggleFAQ(index)}>
                            <h3>{faq.question}</h3>
                            <i
                                className="fas fa-chevron-down"
                                style={{
                                    transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease'
                                }}
                            ></i>
                        </div>
                        <div
                            className={`faq-answer ${activeIndex === index ? 'active' : ''}`}
                            style={{
                                height: activeIndex === index ? 'auto' : '0',
                                opacity: activeIndex === index ? '1' : '0',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
