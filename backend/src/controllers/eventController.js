import Event from "../entities/Event.js";
import Attendance from "../entities/Attendance.js";
import { Op as LikeOp } from "sequelize";

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
        include: ["Attendances"]
    });
}

async function deleteEvent(id) {
    let elem = await Event.findByPk(id);

    if (!elem) {
        console.log("This elem does not exist")
        return;
    }

    return await elem.destroy();
}

async function updateEvent(id, event) {
    let elem = await Event.findByPk(id);

    if (!elem) {
        console.log("This elem does not exist")
        return null;
    }

    return await elem.update(event);
}

async function getEventWithFilterAndPagination(filter) {

    // Default pagination
    if (!filter.take) filter.take = 10;
    if (!filter.skip) filter.skip = 1;

    let whereClause = {};

    // TEXT FILTERS
    if (filter.name)
        whereClause.name = { [LikeOp]: `%${filter.name}%` };

    if (filter.description)
        whereClause.description = { [LikeOp]: `%${filter.description}%` };

    if (filter.accessCode)
        whereClause.accessCode = { [LikeOp]: `%${filter.accessCode}%` };

    // EXACT MATCH FILTERS
    if (filter.status)
        whereClause.status = filter.status.toUpperCase(); // OPEN/CLOSED

    // NUMERIC FILTER
    if (filter.duration)
        whereClause.duration = filter.duration;

    // DATE FILTER (startTime)
    if (filter.startTime)
        whereClause.startTime = { [LikeOp]: `%${filter.startTime}%` };

    // Address filters
    let whereIncludeClause = {};
    if (filter.city)
        whereIncludeClause.City = { [LikeOp]: `%${filter.city}%` };

    // Ordering (column + direction)
    let orderClause = [];
    if (filter.OrderColumn && filter.Order)
        orderClause = [[filter.OrderColumn, filter.Order.toUpperCase()]];

    return await Event.findAndCountAll({
        distinct: true,
        include: [
            {
                model: Attendance,
                as: "Attendances",
                where: whereIncludeClause,
                required: false
            }
        ],
        where: whereClause,
        order: orderClause,
        limit: parseInt(filter.take),
        offset: (parseInt(filter.skip) - 1) * parseInt(filter.take)
    });
}


export {
    createEvent,
    getEvents,
    getEventById,
    getEventWithAttendances,
    deleteEvent,
    updateEvent,
    getEventWithFilterAndPagination
};
