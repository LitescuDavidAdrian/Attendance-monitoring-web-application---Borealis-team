import { useState } from 'react';
import { checkinAPI } from '../services/api';
import QRScanner from '../components/QRScanner';

function ParticipantCheckin() {
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('');
    const [showScanner, setShowScanner] = useState(false);

    const handleCheckin = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!studentName || !studentId || !accessCode) {
            setMessage('Please fill in all fields');
            setMessageType('error');
            return;
        }

        try {
            const response = await checkinAPI.checkin(accessCode, studentName, studentId);
            setMessage(`Successfully checked in to ${response.data.event.name}!`);
            setMessageType('success');
            setAccessCode('');
        } catch (error) {
            setMessage(error.response?.data?.error || 'Failed to check in');
            setMessageType('error');
        }
    };

    const handleScanResult = (scannedCode) => {
        setAccessCode(scannedCode);
        setShowScanner(false);
        setMessage('QR Code scanned! Please review and submit.');
        setMessageType('success');
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Participant Check-in</h2>
                <p style={{ marginBottom: '2rem', color: '#7f8c8d' }}>
                    Enter your details and access code or scan the QR code to check in.
                </p>

                {message && (
                    <div className={`alert alert-${messageType}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleCheckin}>
                    <div className="form-group">
                        <label>Student Name</label>
                        <input
                            type="text"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Student ID</label>
                        <input
                            type="text"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="Enter your student ID"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Access Code</label>
                        <input
                            type="text"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            placeholder="Enter the access code"
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button type="submit" className="btn btn-success">
                            Check In
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setShowScanner(!showScanner)}
                        >
                            {showScanner ? 'Hide Scanner' : 'Scan QR Code'}
                        </button>
                    </div>
                </form>

                {showScanner && (
                    <div style={{ marginTop: '2rem' }}>
                        <QRScanner onScanSuccess={handleScanResult} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ParticipantCheckin;
