import express from 'express';
import { getAllGenres } from '../controllers/genreController';

const router = express.Router();
router.get('/genres', getAllGenres);

export { router as GenreRouter };
