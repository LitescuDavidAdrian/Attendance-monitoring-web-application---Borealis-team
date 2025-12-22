import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventAPI, attendanceAPI } from '../services/api';
import { QRCodeSVG } from 'qrcode.react';

function EventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [attendances, setAttendances] = useState([]);
    const [qrData, setQrData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshInterval, setRefreshInterval] = useState(null);

    useEffect(() => {
        fetchEventDetails();
        fetchQRCode();

        // Auto-refresh attendance every 10 seconds
        const interval = setInterval(() => {
            fetchEventDetails();
        }, 10000);

        setRefreshInterval(interval);

        return () => {
            if (refreshInterval) clearInterval(interval);
        };
    }, [id]);

    const fetchEventDetails = async () => {
        try {
            const eventResponse = await eventAPI.getById(id);
            setEvent(eventResponse.data);

            const attendanceResponse = await attendanceAPI.getAll();
            const filteredAttendances = attendanceResponse.data.filter(
                att => att.EventId === parseInt(id)
            );
            setAttendances(filteredAttendances);
            setLoading(false);
        } catch (err) {
            setError('Failed to load event details');
            setLoading(false);
        }
    };

    const fetchQRCode = async () => {
        try {
            const response = await eventAPI.getQRCode(id);
            setQrData(response.data);
        } catch (err) {
            console.error('Failed to load QR code');
        }
    };

    const handleExport = async (format) => {
        try {
            const response = await eventAPI.export(id, format);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `attendance-${event.name}.${format}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert('Failed to export attendance data');
        }
    };

    if (loading) return <div className="container">Loading event details...</div>;
    if (error) return <div className="container"><div className="alert alert-error">{error}</div></div>;
    if (!event) return <div className="container">Event not found</div>;

    return (
        <div className="container">
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '2rem' }}>
                    <div>
                        <h2>{event.name}</h2>
                        <p style={{ color: '#7f8c8d', marginTop: '0.5rem' }}>{event.description}</p>
                    </div>
                    <span
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '12px',
                            backgroundColor: event.status === 'OPEN' ? '#27ae60' : '#e74c3c',
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >
                        {event.status}
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <div>
                        <strong>Start Time:</strong>
                        <p>{new Date(event.startTime).toLocaleString()}</p>
                    </div>
                    <div>
                        <strong>Duration:</strong>
                        <p>{event.duration} minutes</p>
                    </div>
                    <div>
                        <strong>Access Code:</strong>
                        <p><code style={{ fontSize: '1.2rem', backgroundColor: '#f8f9fa', padding: '0.5rem', borderRadius: '4px' }}>{event.accessCode}</code></p>
                    </div>
                </div>

                <Link to="/events" className="btn" style={{ backgroundColor: '#95a5a6', color: 'white' }}>
                    Back to Events
                </Link>
            </div>

            {qrData && (
                <div className="card">
                    <h3>QR Code</h3>
                    <p style={{ marginBottom: '1rem', color: '#7f8c8d' }}>
                        Display this QR code to participants for easy check-in
                    </p>
                    <div className="qr-code-container">
                        <QRCodeSVG value={qrData.accessCode} size={256} level="H" />
                        <p style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {qrData.accessCode}
                        </p>
                    </div>
                </div>
            )}

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3>Attendance ({attendances.length})</h3>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleExport('csv')} className="btn btn-primary">
                            Export CSV
                        </button>
                        <button onClick={() => handleExport('xlsx')} className="btn btn-success">
                            Export XLSX
                        </button>
                    </div>
                </div>

                {attendances.length === 0 ? (
                    <p>No attendances recorded yet.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Student ID</th>
                                <th>Check-in Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendances.map((att) => (
                                <tr key={att.AttendanceId}>
                                    <td>{att.StudentName}</td>
                                    <td>{att.StudentId}</td>
                                    <td>{new Date(att.Timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default EventDetail;
