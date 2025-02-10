import { Book } from '../entities/book';
import { BookTypeDto } from './bookTypeDto';
import { GenreDto } from './genreDto';

class BookDetailsDto {
  bookId: string;
  bookName: string;
  author: string;
  bookType: BookTypeDto | {};
  genre: GenreDto | {};
  publication: string;
  pages: number;
  price: number;
  coverPhoto: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(book: any) {
    this.bookId = book.bookId;
    this.bookName = book.bookName;
    this.author = book.author;
    this.bookType = book?.__book_type__
      ? new BookTypeDto(book.__book_type__)
      : {};
    this.genre = book?.__genre__ ? new GenreDto(book.__genre__) : {};
    this.publication = book.publication;
    this.pages = book.pages;
    this.price = book.price;
    this.coverPhoto = book.coverPhoto;
    this.isActive = book.isActive;
    this.createdAt = new Date(book.createdAt); // Ensure Date object
    this.updatedAt = new Date(book.updatedAt);
  }

  public static toDto(books: Book[]): BookDetailsDto[] {
    return books.map((book) => new BookDetailsDto(book));
  }
}

export { BookDetailsDto };
