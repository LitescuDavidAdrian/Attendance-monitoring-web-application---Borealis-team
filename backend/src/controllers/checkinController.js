import Event from "../entities/Event.js";
import Attendance from "../entities/Attendance.js";

// Validate access code and create attendance record
async function checkinWithCode(req, res) {
    try {
        const { accessCode, StudentName, StudentId } = req.body;

        if (!accessCode || !StudentName || !StudentId) {
            return res.status(400).json({
                error: 'Missing required fields: accessCode, StudentName, StudentId'
            });
        }

        // Find event by access code
        const event = await Event.findOne({
            where: { accessCode: accessCode }
        });

        if (!event) {
            return res.status(404).json({
                error: 'Invalid access code'
            });
        }

        // Check if event is OPEN
        if (event.status !== 'OPEN') {
            return res.status(403).json({
                error: 'Event is not currently open for attendance',
                eventStatus: event.status
            });
        }

        // Check if student already checked in
        const existingAttendance = await Attendance.findOne({
            where: {
                EventId: event.EventId,
                StudentId: StudentId
            }
        });

        if (existingAttendance) {
            return res.status(409).json({
                error: 'Student already checked in to this event',
                attendance: existingAttendance
            });
        }

        // Create attendance record
        const attendance = await Attendance.create({
            StudentName: StudentName,
            StudentId: StudentId,
            EventId: event.EventId
        });

        return res.status(201).json({
            message: 'Successfully checked in',
            attendance: attendance,
            event: {
                name: event.name,
                description: event.description
            }
        });

    } catch (error) {
        console.error('Check-in error:', error);
        return res.status(500).json({
            error: 'Failed to process check-in'
        });
    }
}

export { checkinWithCode };
