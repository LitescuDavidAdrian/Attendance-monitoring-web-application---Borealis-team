import express from 'express';
import { checkinWithCode } from '../controllers/checkinController.js';

let checkinRouter = express.Router();

checkinRouter.route('/checkin').post(checkinWithCode);

export default checkinRouter;
