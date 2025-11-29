import Attendance from "../entities/Attendance.js";
import Event from "../entities/Event.js";

async function createAttendance(attendanceData) {
    return await Attendance.create(attendanceData, {
        include: [{ model: Event }]
    });
}

async function getAttendances() {
    return await Attendance.findAll({
        include: ["Event"]
    });
}

async function getAttendanceById(id) {
    return await Attendance.findByPk(id, {
        include: ["Event"]
    });
}

export {
    createAttendance,
    getAttendances,
    getAttendanceById
};
