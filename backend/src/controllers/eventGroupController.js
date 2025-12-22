import EventGroup from "../entities/EventGroup.js";
import Event from "../entities/Event.js";
import { Op as LikeOp } from "sequelize";

async function createEventGroup(eventGroupData) {
    return await EventGroup.create(eventGroupData);
}

async function getEventGroups() {
    return await EventGroup.findAll();
}

async function getEventGroupById(id) {
    return await EventGroup.findByPk(id);
}

async function getEventGroupWithEvents(id) {
    return await EventGroup.findByPk(id, {
        include: ["Events"]
    });
}

async function deleteEventGroup(id) {
    let elem = await EventGroup.findByPk(id);

    if (!elem) {
        console.log("This elem does not exist");
        return;
    }

    return await elem.destroy();
}

async function updateEventGroup(id, eventGroupData) {
    let elem = await EventGroup.findByPk(id);

    if (!elem) {
        console.log("This elem does not exist");
        return null;
    }

    return await elem.update(eventGroupData);
}

async function getEventGroupWithFilterAndPagination(filter) {

    // Default pagination
    if (!filter.take) filter.take = 10;
    if (!filter.skip) filter.skip = 1;

    let whereClause = {};

    // TEXT FILTERS
    if (filter.name)
        whereClause.name = { [LikeOp]: `%${filter.name}%` };

    if (filter.description)
        whereClause.description = { [LikeOp]: `%${filter.description}%` };

    // Ordering
    let orderClause = [];
    if (filter.OrderColumn && filter.Order)
        orderClause = [[filter.OrderColumn, filter.Order.toUpperCase()]];

    return await EventGroup.findAndCountAll({
        distinct: true,
        include: [
            {
                model: Event,
                as: "Events",
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
    createEventGroup,
    getEventGroups,
    getEventGroupById,
    getEventGroupWithEvents,
    deleteEventGroup,
    updateEventGroup,
    getEventGroupWithFilterAndPagination
};
