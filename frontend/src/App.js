import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import OrganizerDashboard from './pages/OrganizerDashboard';
import ParticipantCheckin from './pages/ParticipantCheckin';
import EventGroupList from './pages/EventGroupList';
import EventList from './pages/EventList';
import CreateEvent from './pages/CreateEvent';
import EventDetail from './pages/EventDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>Attendance Monitoring System</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/organizer">Organizer Dashboard</Link>
            <Link to="/checkin">Participant Check-in</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/organizer" element={<OrganizerDashboard />} />
          <Route path="/checkin" element={<ParticipantCheckin />} />
          <Route path="/eventgroups" element={<EventGroupList />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
