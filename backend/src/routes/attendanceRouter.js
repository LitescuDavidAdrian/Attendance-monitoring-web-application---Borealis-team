import express from 'express';
import { createAttendance, getAttendances, getAttendanceById, getAttendanceWithEvent, deleteAttendance, updateAttendance, getAttendanceWithFilterAndPagination
} from "../controllers/attendanceController.js";

let attendanceRouter = express.Router();

// CREATE
attendanceRouter.route('/Attendance').post(async (req, res) => {
  return res.json(await createAttendance(req.body));
});

// GET ALL
attendanceRouter.route('/Attendance').get(async (req, res) => {
  return res.json(await getAttendances());
});

// GET BY ID
attendanceRouter.route('/Attendance/:id').get(async (req, res) => {
  const attendance = await getAttendanceById(req.params.id);

  if (attendance)
    return res.json(attendance);
  else
    return res.status(404).json({ message: 'Attendance not found' });
});

// DELETE
attendanceRouter.route('/attendance/:id').delete(async (req, res) => {
  const deleted = await deleteAttendance(req.params.id);

  if (!deleted)
    return res.status(404).json({ message: 'Attendance not found' });

  return res.json(deleted);
});

// UPDATE
attendanceRouter.route('/attendance/:id').put(async (req, res) => {
  const updated = await updateAttendance(req.params.id, req.body);

  if (!updated)
    return res.status(404).json({ message: 'Attendance not found' });

  return res.json(updated);
});

// FILTER + PAGINATION
attendanceRouter.route('/attendanceFilter').get(async (req, res) => {
  return res.json(
    await getAttendanceWithFilterAndPagination(req.query)
  );
});

export default attendanceRouter;