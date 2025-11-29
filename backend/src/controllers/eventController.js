import Event from "../entities/Event.js";
import Attendance from "../entities/Attendance.js";

async function createEvent(eventData) {
    return await Event.create(eventData);
}

async function getEvents() {
    return await Event.findAll();
}

async function getEventById(id) {
    return await Event.findByPk(id);
}

async function getEventWithAttendances(id) {
    return await Event.findByPk(id, {
        include: ["attendances"]   
    });
}

export {
    createEvent,
    getEvents,
    getEventById,
    getEventWithAttendances
};
