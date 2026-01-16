import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventAPI } from '../services/api';

function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
        const interval = setInterval(fetchEvents, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await eventAPI.getAll();
            setEvents(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load events');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await eventAPI.delete(id);
                fetchEvents();
            } catch (err) {
                alert('Failed to delete event');
            }
        }
    };

    if (loading) return <div className="container">Loading events...</div>;
    if (error) return <div className="container"><div className="alert alert-error">{error}</div></div>;

    return (
        <div className="container">
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2>All Events</h2>
                    <Link to="/events/create" className="btn btn-primary">
                        Create New Event
                    </Link>
                </div>

                {events.length === 0 ? (
                    <p>No events found. Create your first event!</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Start Time</th>
                                <th>Duration (min)</th>
                                <th>Status</th>
                                <th>Access Code</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.EventId}>
                                    <td>{event.name}</td>
                                    <td>{new Date(event.startTime).toLocaleString()}</td>
                                    <td>{event.duration}</td>
                                    <td>
                                        <span
                                            style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '12px',
                                                backgroundColor: event.status === 'OPEN' ? '#27ae60' : '#e74c3c',
                                                color: 'white',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            {event.status}
                                        </span>
                                    </td>
                                    <td><code>{event.accessCode}</code></td>
                                    <td>
                                        <Link
                                            to={`/events/${event.EventId}`}
                                            className="btn btn-primary"
                                            style={{ marginRight: '0.5rem', padding: '0.5rem 1rem' }}
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(event.EventId)}
                                            className="btn btn-danger"
                                            style={{ padding: '0.5rem 1rem' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default EventList;
