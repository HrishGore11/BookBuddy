import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedData1738820245752 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const time = new Date();

    // Seed data for Genre entity if it does not exist
    const genreExists = await queryRunner.query(
      `SELECT * FROM genre WHERE genre_id = 'e4563e12-98cf-11ee-8263-04e56e7607c1'`
    );

    if (!genreExists.length) {
      await queryRunner.query(
        'INSERT INTO genre (genre_id, genre_name, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ['e4563e12-98cf-11ee-8263-04e56e7607c1', 'Science Fiction', time, time]
      );
    }

    const genreExists2 = await queryRunner.query(
      `SELECT * FROM genre WHERE genre_id = 'e4563e12-98cf-11ee-8263-04e56e7607c2'`
    );
    if (!genreExists2.length) {
      await queryRunner.query(
        'INSERT INTO genre (genre_id, genre_name, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ['e4563e12-98cf-11ee-8263-04e56e7607c2', 'History', time, time]
      );
    }

    const genreExists3 = await queryRunner.query(
      `SELECT * FROM genre WHERE genre_id = 'e4563e12-98cf-11ee-8263-04e56e7607c3'`
    );
    if (!genreExists3.length) {
      await queryRunner.query(
        'INSERT INTO genre (genre_id, genre_name, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ['e4563e12-98cf-11ee-8263-04e56e7607c3', 'Arts', time, time]
      );
    }

    const genreExists4 = await queryRunner.query(
      `SELECT * FROM genre WHERE genre_id = 'e4563e12-98cf-11ee-8263-04e56e7607c4'`
    );
    if (!genreExists4.length) {
      await queryRunner.query(
        'INSERT INTO genre (genre_id, genre_name, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ['e4563e12-98cf-11ee-8263-04e56e7607c4', 'Science', time, time]
      );
    }

    // Seed data for BookType entity if it does not exist
    const bookTypeExists = await queryRunner.query(
      `SELECT * FROM book_type WHERE bookType_id = 'f7893f34-98cf-11ee-8263-04e56e7607c1'`
    );

    if (!bookTypeExists.length) {
      await queryRunner.query(
        'INSERT INTO book_type (bookType_id, bookType_name, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ['f7893f34-98cf-11ee-8263-04e56e7607c1', 'Hardcover', time, time]
      );
    }

    const bookTypeExists2 = await queryRunner.query(
      `SELECT * FROM book_type WHERE bookType_id = 'f7893f34-98cf-11ee-8263-04e56e7607c2'`
    );
    if (!bookTypeExists2.length) {
      await queryRunner.query(
        'INSERT INTO book_type (bookType_id, bookType_name, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ['f7893f34-98cf-11ee-8263-04e56e7607c2', 'Auto-biography', time, time]
      );
    }

    const bookTypeExists3 = await queryRunner.query(
      `SELECT * FROM book_type WHERE bookType_id = 'f7893f34-98cf-11ee-8263-04e56e7607c3'`
    );
    if (!bookTypeExists3.length) {
      await queryRunner.query(
        'INSERT INTO book_type (bookType_id, bookType_name, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ['f7893f34-98cf-11ee-8263-04e56e7607c3', 'Novel', time, time]
      );
    }

    const bookTypeExists4 = await queryRunner.query(
      `SELECT * FROM book_type WHERE bookType_id = 'f7893f34-98cf-11ee-8263-04e56e7607c4'`
    );
    if (!bookTypeExists4.length) {
      await queryRunner.query(
        'INSERT INTO book_type (bookType_id, bookType_name, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ['f7893f34-98cf-11ee-8263-04e56e7607c4', 'Stories', time, time]
      );
    }

    const bookTypeExists5 = await queryRunner.query(
      `SELECT * FROM book_type WHERE bookType_id = 'f7893f34-98cf-11ee-8263-04e56e7607c5'`
    );
    if (!bookTypeExists5.length) {
      await queryRunner.query(
        'INSERT INTO book_type (bookType_id, bookType_name, created_at, updated_at) VALUES (?, ?, ?, ?)',
        ['f7893f34-98cf-11ee-8263-04e56e7607c5', 'Poems', time, time]
      );
    }

    // Seed data for Book entity if it does not exist
    const bookExists = await queryRunner.query(
      `SELECT * FROM book WHERE book_id = 'g8904a45-98cf-11ee-8263-04e56e7607c1'`
    );

    if (!bookExists.length) {
      await queryRunner.query(
        'INSERT INTO book (book_id, book_name, author, bookType_id, genre_id, publication, pages, price, cover_photo, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)',
        [
          'g8904a45-98cf-11ee-8263-04e56e7607c1',
          'The Martian',
          'Andy Weir',
          'f7893f34-98cf-11ee-8263-04e56e7607c1', // BookType ID (Hardcover)
          'e4563e12-98cf-11ee-8263-04e56e7607c1', // Genre ID (Science Fiction)
          'Andy Weir Publication',
          300,
          500,
          'https://example.com/images/the-martian.jpg',
          true,
          time,
          time,
        ]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM book WHERE book_id = 'g8904a45-98cf-11ee-8263-04e56e7607c1'`
    );
    await queryRunner.query(
      `DELETE FROM book_type WHERE bookType_id = 'f7893f34-98cf-11ee-8263-04e56e7607c1'`
    );
    await queryRunner.query(
      `DELETE FROM genre WHERE genre_id = 'e4563e12-98cf-11ee-8263-04e56e7607c1'`
    );
  }
}
