import express from 'express';
import {
  addBook,
  inActiveBook,
  getAllBooks,
  getBookById,
  updateBook,
} from '../controllers/bookController';

const router = express.Router();

router.get('/books', getAllBooks);

router.get('/book/:id', getBookById);

router.post('/addBook', addBook);

router.put('/updateBook/:id', updateBook);

router.patch('/inActiveBook/:id', inActiveBook);

export { router as BookRouter };
