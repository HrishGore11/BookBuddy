import { BookType } from '../entities/bookType';

class BookTypeDto {
  bookTypeId: string;
  bookTypeName: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(bookType: any) {
    this.bookTypeId = bookType?.bookTypeId;
    this.bookTypeName = bookType?.boookTypeName;
    this.createdAt = bookType?.createdAt;
    this.updatedAt = bookType?.updatedAt;
  }
  public static toDto(bookTypes: BookType[]) {
    return bookTypes?.map((type) => new BookTypeDto(type));
  }
}

export { BookTypeDto };
