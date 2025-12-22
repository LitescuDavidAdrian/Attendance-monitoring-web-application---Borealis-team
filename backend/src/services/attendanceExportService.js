import XLSX from 'xlsx';
import Event from '../entities/Event.js';
import Attendance from '../entities/Attendance.js';
import EventGroup from '../entities/EventGroup.js';

// Export attendance for a single event as XLSX
export const exportEventAttendance = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id, {
            include: ['Attendances']
        });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const data = event.Attendances.map(att => ({
            'Student Name': att.StudentName,
            'Student ID': att.StudentId,
            'Check-in Time': att.Timestamp,
            'Event Name': event.name
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: req.query.format === 'csv' ? 'csv' : 'xlsx' });

        res.setHeader('Content-Disposition', `attachment; filename=attendance-${event.name}-${Date.now()}.${req.query.format === 'csv' ? 'csv' : 'xlsx'}`);
        res.setHeader('Content-Type', req.query.format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to export attendance' });
    }
};

// Export attendance for an event group as XLSX
export const exportEventGroupAttendance = async (req, res) => {
    try {
        const eventGroup = await EventGroup.findByPk(req.params.id, {
            include: [{
                model: Event,
                as: 'Events',
                include: ['Attendances']
            }]
        });

        if (!eventGroup) {
            return res.status(404).json({ error: 'Event Group not found' });
        }

        const data = [];
        eventGroup.Events.forEach(event => {
            event.Attendances.forEach(att => {
                data.push({
                    'Student Name': att.StudentName,
                    'Student ID': att.StudentId,
                    'Check-in Time': att.Timestamp,
                    'Event Name': event.name,
                    'Event Start': event.startTime,
                    'Event Duration': event.duration
                });
            });
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: req.query.format === 'csv' ? 'csv' : 'xlsx' });

        res.setHeader('Content-Disposition', `attachment; filename=attendance-group-${eventGroup.name}-${Date.now()}.${req.query.format === 'csv' ? 'csv' : 'xlsx'}`);
        res.setHeader('Content-Type', req.query.format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to export attendance' });
    }
};
