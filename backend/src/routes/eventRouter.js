import express from 'express';
import {createEvent, getEventById, getEvents, getEventWithAttendances, deleteEvent, updateEvent, getEventWithFilterAndPagination} from "../controllers/eventController.js";
import { getQRCode } from "../services/exportService.js";
import { exportEventAttendance } from "../services/attendanceExportService.js";

let eventRouter = express.Router();
  
eventRouter.route('/event').post( async (req, res) => {
  return res.json(await createEvent(req.body));
})

eventRouter.route('/event').get( async (req, res) => {
  return res.json(await getEvents());
})

// Route params vs query params
eventRouter.route('/event/:id').get(async (req, res) => {
    let event = await getEventById(req.params.id);
    if(event)
        return res.json(event);
    else
        return res.status(404).json({message: 'not found'});
})

eventRouter.route('/event/:id').delete(async (req, res) => {
  const deleted = await deleteEvent(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Event not found' });
  }
    return res.json(deleted);
  })

eventRouter.route('/event/:id').put( async (req, res) => {
      const updated = await updateEvent(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.json(updated);  
})

eventRouter.route('/eventFilter').get( async (req, res) => {
  return res.json(await getEventWithFilterAndPagination(req.query));
})

eventRouter.route('/event/:id/qrcode').get(getQRCode);

eventRouter.route('/event/:id/export').get(exportEventAttendance);

export default eventRouter;