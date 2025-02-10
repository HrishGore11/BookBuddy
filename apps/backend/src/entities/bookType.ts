import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Book } from './book';

@Entity()
export class BookType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'bookType_id' })
  bookTypeId: string;

  @Column({ name: 'bookType_name', unique: true })
  boookTypeName: string;

  // @OneToMany(() => Book, (book) => book.bookType)
  // books: Book[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
