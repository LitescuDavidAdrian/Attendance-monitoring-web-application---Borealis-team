import express from 'express';
import {
    createEventGroup,
    getEventGroups,
    getEventGroupById,
    getEventGroupWithEvents,
    deleteEventGroup,
    updateEventGroup,
    getEventGroupWithFilterAndPagination
} from "../controllers/eventGroupController.js";
import { exportEventGroupAttendance } from "../services/attendanceExportService.js";

let eventGroupRouter = express.Router();

eventGroupRouter.route('/eventgroup').post(async (req, res) => {
    return res.json(await createEventGroup(req.body));
});

eventGroupRouter.route('/eventgroup').get(async (req, res) => {
    return res.json(await getEventGroups());
});

eventGroupRouter.route('/eventgroup/:id').get(async (req, res) => {
    let eventGroup = await getEventGroupById(req.params.id);
    if (eventGroup)
        return res.json(eventGroup);
    else
        return res.status(404).json({ message: 'EventGroup not found' });
});

eventGroupRouter.route('/eventgroup/:id/events').get(async (req, res) => {
    let eventGroup = await getEventGroupWithEvents(req.params.id);
    if (eventGroup)
        return res.json(eventGroup);
    else
        return res.status(404).json({ message: 'EventGroup not found' });
});

eventGroupRouter.route('/eventgroup/:id').delete(async (req, res) => {
    const deleted = await deleteEventGroup(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'EventGroup not found' });
    }
    return res.json(deleted);
});

eventGroupRouter.route('/eventgroup/:id').put(async (req, res) => {
    const updated = await updateEventGroup(req.params.id, req.body);
    if (!updated) {
        return res.status(404).json({ message: 'EventGroup not found' });
    }
    return res.json(updated);
});

eventGroupRouter.route('/eventgroupFilter').get(async (req, res) => {
    return res.json(await getEventGroupWithFilterAndPagination(req.query));
});

eventGroupRouter.route('/eventgroup/:id/export').get(exportEventGroupAttendance);

export default eventGroupRouter;
