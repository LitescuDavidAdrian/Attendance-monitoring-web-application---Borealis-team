import { useState, useEffect } from 'react';
import { eventGroupAPI } from '../services/api';

function EventGroupList() {
    const [eventGroups, setEventGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchEventGroups();
    }, []);

    const fetchEventGroups = async () => {
        try {
            const response = await eventGroupAPI.getAll();
            setEventGroups(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load event groups');
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await eventGroupAPI.create(formData);
            setFormData({ name: '', description: '' });
            setShowCreateForm(false);
            fetchEventGroups();
        } catch (err) {
            alert('Failed to create event group');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event group?')) {
            try {
                await eventGroupAPI.delete(id);
                fetchEventGroups();
            } catch (err) {
                alert('Failed to delete event group');
            }
        }
    };

    const handleExport = async (id, name, format) => {
        try {
            const response = await eventGroupAPI.export(id, format);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `attendance-group-${name}.${format}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert('Failed to export attendance data');
        }
    };

    if (loading) return <div className="container">Loading event groups...</div>;
    if (error) return <div className="container"><div className="alert alert-error">{error}</div></div>;

    return (
        <div className="container">
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2>Event Groups</h2>
                    <button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className="btn btn-primary"
                    >
                        {showCreateForm ? 'Cancel' : 'Create Event Group'}
                    </button>
                </div>

                {showCreateForm && (
                    <form onSubmit={handleCreate} style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                        <div className="form-group">
                            <label>Group Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Web Technologies Fall 2024"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Optional description"
                                rows="3"
                            />
                        </div>
                        <button type="submit" className="btn btn-success">
                            Create Group
                        </button>
                    </form>
                )}

                {eventGroups.length === 0 ? (
                    <p>No event groups found. Create your first event group!</p>
                ) : (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {eventGroups.map((group) => (
                            <div key={group.EventGroupId} className="card" style={{ backgroundColor: '#f8f9fa' }}>
                                <h3>{group.name}</h3>
                                <p style={{ color: '#7f8c8d', margin: '0.5rem 0 1rem 0' }}>
                                    {group.description || 'No description'}
                                </p>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => handleExport(group.EventGroupId, group.name, 'csv')}
                                        className="btn btn-primary"
                                        style={{ padding: '0.5rem 1rem' }}
                                    >
                                        Export CSV
                                    </button>
                                    <button
                                        onClick={() => handleExport(group.EventGroupId, group.name, 'xlsx')}
                                        className="btn btn-success"
                                        style={{ padding: '0.5rem 1rem' }}
                                    >
                                        Export XLSX
                                    </button>
                                    <button
                                        onClick={() => handleDelete(group.EventGroupId)}
                                        className="btn btn-danger"
                                        style={{ padding: '0.5rem 1rem' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventGroupList;
