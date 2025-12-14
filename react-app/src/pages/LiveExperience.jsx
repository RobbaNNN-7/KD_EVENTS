import { useState, useRef } from 'react';
import MainLayout from '../components/layout/MainLayout';
import './LiveExperience.css';

const LiveExperience = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <MainLayout>
            <div className="live-experience">
                <video
                    ref={videoRef}
                    className="background-video"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                >
                    <source src="/assets/videos/dest_wedding_video-1.mp4" type="video/mp4" />
                </video>

                <div className="experience-overlay">
                    <div className="vibe-content">
                        <h1>Feel The Vibe</h1>
                        <p>Immerse yourself in the magic of our events</p>

                        <div className="controls">
                            <button onClick={togglePlay} className="control-btn">
                                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                            </button>
                            <button onClick={toggleMute} className="control-btn">
                                <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
                                <span>{isMuted ? 'Unmute Sound' : 'Mute Sound'}</span>
                            </button>
                        </div>

                        <div className="headphones-advisory">
                            <i className="fas fa-headphones-alt"></i>
                            <span>Use headphones for 3D Audio Experience</span>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default LiveExperience;
