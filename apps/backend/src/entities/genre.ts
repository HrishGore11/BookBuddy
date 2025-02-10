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
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'genre_id' })
  genreId: string;

  @Column({ name: 'genre_name', unique: true })
  genreName: string;

  // @OneToMany(() => Book, (book) => book.genre)
  // books: Book[];
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
