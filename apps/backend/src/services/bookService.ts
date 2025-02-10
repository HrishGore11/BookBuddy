import { Book } from '../entities/book';
import { PageService } from '../models/pageService';

const listOfAllBookService = async () => {
  try {
    const where = { isActive: true };
    const relations = ['book_type', 'genre'];
    const books = await PageService.paginate(
      Book.getRepository(),
      where,
      relations
    );
    return books[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getBookByIdService = async (bookId: string) => {
  try {
    const existingBook = await Book.findOne({
      where: { bookId },
      relations: ['book_type', 'genre'],
    });
    return existingBook;
  } catch (error) {
    console.log(error);
  }
};
const addBookService = async (body) => {
  try {
    const {
      bookName,
      author,
      book_type,
      genre,
      publication,
      pages,
      price,
      coverPhoto,
      isActive,
    } = body;
    const newRole = Book.create({
      bookName,
      author,
      book_type,
      genre,
      publication,
      pages,
      price,
      coverPhoto,
      isActive,
    });
    const addedRole = await Book.save(newRole);
    return addedRole;
  } catch (error) {
    console.log(error);
  }
};
const updateBookService = async (bookId, body) => {
  try {
    const {
      bookName,
      author,
      book_type,
      genre,
      publication,
      pages,
      price,
      coverPhoto,
      isActive,
    } = body;
    const existingBook = await Book.findOne({ where: { bookId } });
    existingBook.bookName = bookName;
    existingBook.author = author;
    existingBook.book_type = book_type;
    existingBook.genre = genre;
    existingBook.publication = publication;
    existingBook.pages = pages;
    existingBook.price = price;
    existingBook.coverPhoto = coverPhoto;
    existingBook.isActive = isActive;

    const updatedBook = await Book.save(existingBook);
    return updatedBook;
  } catch (error) {
    console.log(error);
  }
};

const inActiveBookService = async (bookId) => {
  try {
    const existingBook = await Book.findOne({ where: { bookId } });
    existingBook.isActive = false;
    const updatedBook = await Book.update(bookId, { isActive: false });
    return updatedBook;
  } catch (error) {
    console.log(error);
  }
};
export {
  listOfAllBookService,
  getBookByIdService,
  addBookService,
  updateBookService,
  inActiveBookService,
};
