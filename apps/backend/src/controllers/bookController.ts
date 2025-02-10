import { Request, Response } from 'express';
import {
  addBookService,
  getBookByIdService,
  inActiveBookService,
  listOfAllBookService,
  updateBookService,
} from '../services/bookService';
import { BookDetailsDto } from '../dto/bookDto';

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const listofBooks = await listOfAllBookService();
    const bookDto = BookDetailsDto.toDto(listofBooks);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: bookDto ? 'Book list fetched successfully.' : 'no books found',
      data: bookDto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const existingbook = await getBookByIdService(bookId);

    if (!existingbook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Book found successfully.',
      data: new BookDetailsDto(existingbook),
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addBook = async (req: Request, res: Response) => {
  try {
    const addBook = await addBookService(req.body);
    const data = new BookDetailsDto(addBook);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Book added successfully.',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const existingBook = await updateBookService(bookId, req.body);
    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Book updated successfully.',
      data: new BookDetailsDto(existingBook),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const inActiveBook = async (req: Request, res: Response) => {
  try {
    const inActivatedBook = await inActiveBookService(req.params.id);
    if (!inActivatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json({
      statusCode: 200,
      status: 'success',
      message: 'Book marked as inactive successfully.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllBooks, getBookById, addBook, updateBook, inActiveBook };
