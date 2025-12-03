import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import CorporatePage from './pages/CorporatePage';
import EventCreator from './pages/EventCreator';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/corporate" element={<CorporatePage />} />
        <Route path="/event-creator" element={<EventCreator />} />
      </Routes>
    </Router>
  );
}

export default App;

