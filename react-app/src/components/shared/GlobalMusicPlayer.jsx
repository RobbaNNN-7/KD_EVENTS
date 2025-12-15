import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaMusic, FaVolumeUp, FaVolumeMute, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const GlobalMusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    const playlist = [
        {
            title: "Ethereal Dreams",
            artist: "KD Ambience",
            url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
        },
        {
            title: "Wedding Bells",
            artist: "KD Classical",
            url: "https://cdn.pixabay.com/download/audio/2022/02/22/audio_c06fba1b22.mp3?filename=wedding-love-story-20092.mp3"
        },
        {
            title: "Party Pulse",
            artist: "KD Beats",
            url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_2551be3c45.mp3?filename=summer-party-21272.mp3"
        }
    ];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex, volume, isMuted]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    return (
        <div className={`global-music-player ${isMinimized ? 'minimized' : ''}`}>
            <audio
                ref={audioRef}
                src={playlist[currentTrackIndex].url}
                onEnded={nextTrack}
            />

            <div className="player-header">
                <div className="player-title" onClick={() => setIsMinimized(!isMinimized)}>
                    <FaMusic className="music-icon" />
                    <span>KD Radio Live</span>
                </div>
                <button className="minimize-btn" onClick={() => setIsMinimized(!isMinimized)}>
                    {isMinimized ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>

            {!isMinimized && (
                <div className="player-content">
                    <div className="track-info">
                        <div className="track-name">{playlist[currentTrackIndex].title}</div>
                        <div className="track-artist">{playlist[currentTrackIndex].artist}</div>
                    </div>

                    <div className="player-controls">
                        <button onClick={prevTrack}><FaStepBackward /></button>
                        <button className="play-btn" onClick={togglePlay}>
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                        <button onClick={nextTrack}><FaStepForward /></button>
                    </div>

                    <div className="volume-control">
                        <button onClick={() => setIsMuted(!isMuted)}>
                            {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => {
                                setVolume(parseFloat(e.target.value));
                                setIsMuted(false);
                            }}
                        />
                    </div>
                </div>
            )}

            <style jsx>{`
                .global-music-player {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(10px);
                    color: white;
                    border-radius: 16px;
                    width: 280px;
                    z-index: 9999;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                    transition: all 0.3s ease;
                    font-family: 'Poppins', sans-serif;
                }

                .global-music-player.minimized {
                    width: 180px;
                    bottom: 10px;
                    right: 10px;
                }

                .player-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 15px;
                    cursor: pointer;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .global-music-player.minimized .player-header {
                    border-bottom: none;
                }

                .player-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    font-size: 0.9rem;
                }

                .music-icon {
                    color: #E91E63;
                    animation: pulse 2s infinite;
                }

                .minimize-btn {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.6);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                }

                .player-content {
                    padding: 15px;
                }

                .track-info {
                    margin-bottom: 15px;
                    text-align: center;
                }

                .track-name {
                    font-weight: 500;
                    font-size: 0.95rem;
                    margin-bottom: 4px;
                }

                .track-artist {
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.6);
                }

                .player-controls {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-bottom: 15px;
                }

                .player-controls button {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 1rem;
                    display: flex;
                    align-items: center;
                    transition: all 0.2s;
                }

                .player-controls button:hover {
                    color: #E91E63;
                }

                .play-btn {
                    background: white !important;
                    color: #0f172a !important;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .play-btn:hover {
                    transform: scale(1.1);
                }

                .volume-control {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .volume-control button {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.7);
                    cursor: pointer;
                }

                .volume-control input {
                    flex: 1;
                    height: 4px;
                    -webkit-appearance: none;
                    background: rgba(255,255,255,0.2);
                    border-radius: 2px;
                    outline: none;
                }

                .volume-control input::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 12px;
                    height: 12px;
                    background: white;
                    border-radius: 50%;
                    cursor: pointer;
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default GlobalMusicPlayer;
