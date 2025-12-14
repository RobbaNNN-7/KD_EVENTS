import { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import './PackagesPage.css';

const PackagesPage = () => {
    const [vibe, setVibe] = useState({
        scale: 50,
        luxury: 30,
        wildness: 20
    });
    const [manifestedPackage, setManifestedPackage] = useState(null);
    const [isManifesting, setIsManifesting] = useState(false);

    // Dynamic price calculation
    const calculateEstimate = () => {
        const base = 5000;
        const scaleCost = vibe.scale * 100;
        const luxuryCost = vibe.luxury * 200;
        const wildCost = vibe.wildness * 50;
        return base + scaleCost + luxuryCost + wildCost;
    };

    const handleSliderChange = (e, type) => {
        setVibe({ ...vibe, [type]: parseInt(e.target.value) });
        setManifestedPackage(null); // Reset if changed
    };

    const manifestEvent = () => {
        setIsManifesting(true);
        setTimeout(() => {
            let pkgName = "Custom Creation";
            if (vibe.luxury > 80) pkgName = "The Royal Edict";
            else if (vibe.wildness > 80) pkgName = "Neon Jungle";
            else if (vibe.scale > 80) pkgName = "Grand Symposium";
            else pkgName = "Essence of Elegance";

            setManifestedPackage({
                name: pkgName,
                price: calculateEstimate(),
                description: `A blend of ${vibe.scale}% Scale, ${vibe.luxury}% Luxury, and ${vibe.wildness}% Wild energy.`
            });
            setIsManifesting(false);
        }, 1500);
    };

    return (
        <MainLayout>
            <div className="dream-weaver">
                <div className="weaver-container">
                    <header className="weaver-header">
                        <h1>Dream Weaver</h1>
                        <p>Don't just book a package. Manifest an experience.</p>
                    </header>

                    <div className="equalizer-board">
                        {/* Scale Slider */}
                        <div className="vibe-channel">
                            <label>Scale</label>
                            <div className="slider-container">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={vibe.scale}
                                    onChange={(e) => handleSliderChange(e, 'scale')}
                                    className="vibe-slider scale-slider"
                                />
                                <div className="channel-glow" style={{ height: `${vibe.scale}%`, opacity: vibe.scale / 100 }}></div>
                            </div>
                            <span className="value">{vibe.scale}%</span>
                        </div>

                        {/* Luxury Slider */}
                        <div className="vibe-channel">
                            <label>Luxury</label>
                            <div className="slider-container">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={vibe.luxury}
                                    onChange={(e) => handleSliderChange(e, 'luxury')}
                                    className="vibe-slider luxury-slider"
                                />
                                <div className="channel-glow luxury" style={{ height: `${vibe.luxury}%`, opacity: vibe.luxury / 100 }}></div>
                            </div>
                            <span className="value">{vibe.luxury}%</span>
                        </div>

                        {/* Wildness Slider */}
                        <div className="vibe-channel">
                            <label>Wildness</label>
                            <div className="slider-container">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={vibe.wildness}
                                    onChange={(e) => handleSliderChange(e, 'wildness')}
                                    className="vibe-slider wild-slider"
                                />
                                <div className="channel-glow wild" style={{ height: `${vibe.wildness}%`, opacity: vibe.wildness / 100 }}></div>
                            </div>
                            <span className="value">{vibe.wildness}%</span>
                        </div>
                    </div>

                    <div className="manifest-section">
                        {!manifestedPackage && (
                            <button
                                className={`btn-manifest ${isManifesting ? 'pulsing' : ''}`}
                                onClick={manifestEvent}
                                disabled={isManifesting}
                            >
                                {isManifesting ? 'Weaving Reality...' : 'Manifest Your Event'}
                            </button>
                        )}

                        {manifestedPackage && (
                            <div className="manifest-result">
                                <div className="sparkles">✨</div>
                                <h2>{manifestedPackage.name}</h2>
                                <p>{manifestedPackage.description}</p>
                                <div className="manifest-price">
                                    <span className="currency">$</span>
                                    {manifestedPackage.price.toLocaleString()}
                                </div>
                                <button className="btn-claim">Claim This Reality</button>
                                <button className="btn-reset" onClick={() => setManifestedPackage(null)}>Weave Again</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Particle Effects Layer */}
                <div className="particles">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${Math.random() * 3 + 2}s`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default PackagesPage;
