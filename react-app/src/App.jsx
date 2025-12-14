import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/utils/ScrollToTop';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import CorporatePage from './pages/CorporatePage';
import EventCreator from './pages/EventCreator';
import VenueScout from './pages/VenueScout';
import PackagesPage from './pages/PackagesPage';
import LiveExperience from './pages/LiveExperience';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event-creator" element={<EventCreator />} />
        <Route path="/venues" element={<VenueScout />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/live" element={<LiveExperience />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/corporate" element={<CorporatePage />} />
      </Routes>
    </Router>
  );
}

export default App;

