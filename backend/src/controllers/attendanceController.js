import Attendance from "../entities/Attendance.js";
import Event from "../entities/Event.js";
import { Op as LikeOp } from "sequelize";

async function createAttendance(attData) {
    return await Attendance.create(attData);
}

async function getAttendances() {
    return await Attendance.findAll();
}

async function getAttendanceById(id) {
    return await Attendance.findByPk(id);
}

async function getAttendanceWithEvent(id) {
    return await Attendance.findByPk(id, {
        include: ["event"]    // depends on your association alias
    });
}

async function deleteAttendance(id) {
    let elem = await Attendance.findByPk(id);

    if (!elem) {
        console.log("This elem does not exist");
        return;
    }

    return await elem.destroy();
}

async function updateAttendance(id, attendanceData) {
    let elem = await Attendance.findByPk(id);

    if (!elem) {
        console.log("This elem does not exist");
        return null;
    }

    return await elem.update(attendanceData);
}

// ------------------------------------------------------------
//      FILTER + PAGINATION CONTROLLER
// ------------------------------------------------------------
async function getAttendanceWithFilterAndPagination(filter) {

    // Default pagination
    if (!filter.take) filter.take = 10;
    if (!filter.skip) filter.skip = 1;

    let whereClause = {};

    // TEXT FILTERS
    if (filter.StudentName)
        whereClause.StudentName = { [LikeOp]: `%${filter.StudentName}%` };

    if (filter.StudentId)
        whereClause.StudentId = { [LikeOp]: `%${filter.StudentId}%` };

    // DATE FILTER (Timestamp)
    if (filter.Timestamp)
        whereClause.Timestamp = { [LikeOp]: `%${filter.Timestamp}%` };

    // Event include filters (if needed)
    let includeWhere = {};

    if (filter.EventName)
        includeWhere.name = { [LikeOp]: `%${filter.EventName}%` };

    if (filter.EventStatus)
        includeWhere.status = filter.EventStatus.toUpperCase();

    // Ordering
    let orderClause = [];
    if (filter.OrderColumn && filter.Order)
        orderClause = [[filter.OrderColumn, filter.Order.toUpperCase()]];

    return await Attendance.findAndCountAll({
        distinct: true,
        include: [
            {
                model: Event,
                as: "event",             // use your association alias
                where: includeWhere,
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
    createAttendance,
    getAttendances,
    getAttendanceById,
    getAttendanceWithEvent,
    deleteAttendance,
    updateAttendance,
    getAttendanceWithFilterAndPagination
};
