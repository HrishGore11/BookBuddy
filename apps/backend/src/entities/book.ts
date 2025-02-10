import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { BookType } from './bookType';
import { Genre } from './genre';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'book_id' })
  bookId: string;

  @Column({ name: 'book_name' })
  bookName: string;

  @Column()
  author: string;

  // @ManyToOne(() => BookType, (bookType) => bookType.books)
  // book_type: BookType;

  @ManyToOne(() => BookType, { lazy: true })
  @JoinColumn({ name: 'bookType_id' })
  book_type: Promise<BookType>;

  // @ManyToOne(() => Genre, (genre) => genre.books)
  // genre: Genre;

  @ManyToOne(() => Genre, { lazy: true })
  @JoinColumn({ name: 'genre_id' })
  genre: Promise<Genre>;

  @Column({ nullable: true })
  publication: string;

  @Column({ type: 'int' })
  pages: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'cover_photo' })
  coverPhoto: string;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
