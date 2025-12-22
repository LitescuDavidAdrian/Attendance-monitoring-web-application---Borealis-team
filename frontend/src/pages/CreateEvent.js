import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventAPI, eventGroupAPI } from '../services/api';

function CreateEvent() {
    const navigate = useNavigate();
    const [eventGroups, setEventGroups] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startTime: '',
        duration: 60,
        EventGroupId: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchEventGroups();
    }, []);

    const fetchEventGroups = async () => {
        try {
            const response = await eventGroupAPI.getAll();
            setEventGroups(response.data);
        } catch (err) {
            console.error('Failed to load event groups');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const dataToSubmit = { ...formData };
            if (dataToSubmit.EventGroupId === '') {
                delete dataToSubmit.EventGroupId;
            }

            await eventAPI.create(dataToSubmit);
            setSuccess(true);
            setTimeout(() => {
                navigate('/events');
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create event');
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Create New Event</h2>
                <p style={{ marginBottom: '2rem', color: '#7f8c8d' }}>
                    Create a new event. An access code and QR code will be automatically generated.
                </p>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">Event created successfully! Redirecting...</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Event Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., Web Technologies Lecture 5"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Optional event description"
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label>Start Time *</label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Duration (minutes) *</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            min="1"
                            placeholder="e.g., 60"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Event Group (Optional)</label>
                        <select
                            name="EventGroupId"
                            value={formData.EventGroupId}
                            onChange={handleChange}
                        >
                            <option value="">-- No Group --</option>
                            {eventGroups.map((group) => (
                                <option key={group.EventGroupId} value={group.EventGroupId}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button type="submit" className="btn btn-primary">
                            Create Event
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/events')}
                            className="btn"
                            style={{ backgroundColor: '#95a5a6', color: 'white' }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateEvent;
