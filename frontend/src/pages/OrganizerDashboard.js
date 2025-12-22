import { Link } from 'react-router-dom';

function OrganizerDashboard() {
    return (
        <div className="container">
            <div className="card">
                <h2>Event Organizer Dashboard</h2>
                <p style={{ marginBottom: '2rem', color: '#7f8c8d' }}>
                    Manage your events, monitor attendance, and export reports.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div className="card" style={{ backgroundColor: '#3498db', color: 'white' }}>
                        <h3>Create Event</h3>
                        <p style={{ margin: '1rem 0' }}>
                            Create a new event with access code
                        </p>
                        <Link to="/events/create" className="btn btn-success">
                            Create New Event
                        </Link>
                    </div>

                    <div className="card" style={{ backgroundColor: '#2ecc71', color: 'white' }}>
                        <h3>View All Events</h3>
                        <p style={{ margin: '1rem 0' }}>
                            View and manage all events
                        </p>
                        <Link to="/events" className="btn btn-primary" style={{ backgroundColor: '#27ae60' }}>
                            View Events
                        </Link>
                    </div>

                    <div className="card" style={{ backgroundColor: '#9b59b6', color: 'white' }}>
                        <h3>Event Groups</h3>
                        <p style={{ margin: '1rem 0' }}>
                            Manage event groups
                        </p>
                        <Link to="/eventgroups" className="btn btn-primary" style={{ backgroundColor: '#8e44ad' }}>
                            View Groups
                        </Link>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3>Quick Guide</h3>
                <ul style={{ marginTop: '1rem', lineHeight: '2' }}>
                    <li>Create an event and it will automatically generate a unique access code</li>
                    <li>Events automatically open at their scheduled start time and close after the duration</li>
                    <li>Display the QR code or access code to participants for check-in</li>
                    <li>Monitor attendance in real-time from the event detail page</li>
                    <li>Export attendance data to CSV or XLSX for reporting</li>
                </ul>
            </div>
        </div>
    );
}

export default OrganizerDashboard;
