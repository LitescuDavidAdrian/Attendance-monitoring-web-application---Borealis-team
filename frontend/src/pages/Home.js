import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container">
            <div className="card">
                <h2>Welcome to Attendance Monitoring System</h2>
                <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                    Track attendance for your events with ease using QR codes and access codes.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="card" style={{ backgroundColor: '#ecf0f1' }}>
                        <h3>Event Organizer</h3>
                        <p style={{ margin: '1rem 0' }}>
                            Create events, generate QR codes, monitor attendance, and export reports.
                        </p>
                        <Link to="/organizer" className="btn btn-primary">
                            Go to Organizer Dashboard
                        </Link>
                    </div>

                    <div className="card" style={{ backgroundColor: '#ecf0f1' }}>
                        <h3>Participant</h3>
                        <p style={{ margin: '1rem 0' }}>
                            Check in to events by scanning QR codes or entering access codes.
                        </p>
                        <Link to="/checkin" className="btn btn-success">
                            Check In to Event
                        </Link>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3>Features</h3>
                <ul style={{ marginTop: '1rem', lineHeight: '2' }}>
                    <li>Create and manage event groups</li>
                    <li>Generate unique access codes and QR codes for each event</li>
                    <li>Automatic event lifecycle management (OPEN/CLOSED)</li>
                    <li>Real-time attendance monitoring</li>
                    <li>Export attendance data to CSV or XLSX</li>
                    <li>Mobile-friendly interface</li>
                </ul>
            </div>
        </div>
    );
}

export default Home;
