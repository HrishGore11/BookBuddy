import express from 'express';
import { getAllBookTypes } from '../controllers/bookTypeController';

const router = express.Router();
router.get('/bookTypes', getAllBookTypes);

export { router as BookTypeRouter };
