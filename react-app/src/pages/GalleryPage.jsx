import MainLayout from '../components/layout/MainLayout';
import './GalleryPage.css';

const GalleryPage = () => {
    return (
        <MainLayout>
            <div className="gallery-page">
                <div className="gallery-header">
                    <h1>Our Portfolio</h1>
                    <p>Explore our collection of memorable events</p>
                </div>

                <div className="gallery-grid">
                    <div className="gallery-item">
                        <img src="/assets/images/qawalli.jpg" alt="Qawalli Night" />
                        <div className="overlay">
                            <h3>Qawalli Night</h3>
                        </div>
                    </div>

                    <div className="gallery-item">
                        <img src="/assets/images/bollywood.jpg" alt="Bollywood Event" />
                        <div className="overlay">
                            <h3>Bollywood Night</h3>
                        </div>
                    </div>

                    <div className="gallery-item">
                        <img src="/assets/images/birthday.jpg" alt="Birthday Celebration" />
                        <div className="overlay">
                            <h3>Birthday Party</h3>
                        </div>
                    </div>

                    <div className="gallery-item">
                        <img src="/assets/images/concert.jpg" alt="Concert" />
                        <div className="overlay">
                            <h3>Live Concert</h3>
                        </div>
                    </div>

                    <div className="gallery-item">
                        <img src="/assets/images/concert-1.jpg" alt="Concert" />
                        <div className="overlay">
                            <h3>Music Festival</h3>
                        </div>
                    </div>

                    <div className="gallery-item">
                        <img src="/assets/images/dest_wedding-1.jpeg" alt="Destination Wedding" />
                        <div className="overlay">
                            <h3>Destination Wedding</h3>
                        </div>
                    </div>

                    <div className="gallery-item">
                        <img src="/assets/images/dest_wedding-3.jpeg" alt="Wedding Decor" />
                        <div className="overlay">
                            <h3>Wedding Decor</h3>
                        </div>
                    </div>

                    <div className="gallery-item">
                        <img src="/assets/images/dest_wedding-4.jpeg" alt="Wedding Setup" />
                        <div className="overlay">
                            <h3>Wedding Setup</h3>
                        </div>
                    </div>

                    <div className="gallery-item">
                        <img src="/assets/images/dest_wedding-5.jpg" alt="Wedding Venue" />
                        <div className="overlay">
                            <h3>Wedding Venue</h3>
                        </div>
                    </div>

                    <div className="gallery-item">
                        <img src="/assets/images/dest_wedding-6.jpg" alt="Wedding Celebration" />
                        <div className="overlay">
                            <h3>Wedding Celebration</h3>
                        </div>
                    </div>

                    <div className="gallery-item">
                        <img src="/assets/images/dest_wedding-7.jpg" alt="Wedding Reception" />
                        <div className="overlay">
                            <h3>Wedding Reception</h3>
                        </div>
                    </div>

                    <div className="gallery-item video-item">
                        <video controls>
                            <source src="/assets/videos/dest_wedding_video-1.mp4" type="video/mp4" />
                        </video>
                    </div>

                    <div className="gallery-item video-item">
                        <video controls>
                            <source src="/assets/videos/dest_wedding_video2.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default GalleryPage;
