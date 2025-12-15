import { useState } from 'react';
import './Tutorial.css';

const Tutorial = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Welcome to Event Creator! 🎉",
            description: "Design your perfect event layout with our easy-to-use drag-and-drop canvas. Let's take a quick tour!",
            icon: "🎨"
        },
        {
            title: "Object Library",
            description: "Browse through our collection of event objects in the left panel. We have stages, booths, seating, decorations, and more!",
            icon: "📦",
            highlight: "left"
        },
        {
            title: "Drag & Drop",
            description: "Simply drag any object from the library and drop it onto the canvas. It's that easy!",
            icon: "👆",
            highlight: "canvas"
        },
        {
            title: "Edit Properties",
            description: "Select any object on the canvas to edit its size, color, rotation, and position in the right panel.",
            icon: "⚙️",
            highlight: "right"
        },
        {
            title: "Zoom & Grid",
            description: "Use the toolbar to zoom in/out and toggle the grid for precise placement.",
            icon: "🔍",
            highlight: "toolbar"
        },
        {
            title: "Save & Export",
            description: "Save your designs for later or export them as images. Your creativity is just beginning!",
            icon: "💾"
        },
        {
            title: "Keyboard Shortcuts",
            description: "No mouse? No problem! Use Tab to navigate, Enter to select items, and Arrow keys to move them around.",
            icon: "⌨️"
        }
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const skipTutorial = () => {
        localStorage.setItem('eventCreatorTutorialCompleted', 'true');
        onClose();
    };

    const step = steps[currentStep];

    return (
        <div className="tutorial-overlay">
            <div className="tutorial-modal">
                <button
                    className="tutorial-close"
                    onClick={skipTutorial}
                    aria-label="Close tutorial"
                >
                    <i className="fas fa-times"></i>
                </button>

                <div className="tutorial-content">
                    <div className="tutorial-icon">{step.icon}</div>
                    <h2>{step.title}</h2>
                    <p>{step.description}</p>

                    <div className="tutorial-progress">
                        {steps.map((_, index) => (
                            <div
                                key={index}
                                className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                            ></div>
                        ))}
                    </div>

                    <div className="tutorial-actions">
                        {currentStep > 0 && (
                            <button onClick={prevStep} className="btn-prev">
                                <i className="fas fa-arrow-left"></i> Previous
                            </button>
                        )}
                        <button onClick={nextStep} className="btn-next">
                            {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                            {currentStep < steps.length - 1 && <i className="fas fa-arrow-right"></i>}
                        </button>
                    </div>

                    <button onClick={skipTutorial} className="skip-tutorial">
                        Skip Tutorial
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tutorial;
