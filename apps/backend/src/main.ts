import express from 'express';
import 'reflect-metadata';
import * as path from 'path';
import cors from 'cors';
import { DataSource } from 'typeorm';
import { Book } from './entities/book';
import { BookType } from './entities/bookType';
import { Genre } from './entities/genre';
import { SeedData1738820245752 } from './migrations/1738820245752-seedData';
import { BookRouter } from './routes/books';
import 'dotenv/config';
import { GenreRouter } from './routes/genre';
import { BookTypeRouter } from './routes/bookType';

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api', BookRouter);
app.use('/api', BookTypeRouter);
app.use('/api', GenreRouter);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

const appDataSource = new DataSource({
  type: 'mysql',
  host: process.env.HOST,
  port: Number.parseInt(process.env.DB_PORT, 10),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [Book, BookType, Genre],
  migrations: [SeedData1738820245752],
  migrationsRun: true,
  synchronize: true,
  logging: true,
});

appDataSource
  .initialize()
  .then(() => {
    console.log(`${process.env.DATABASE} connected`);
  })
  .catch((error) => console.log(error));

export default app;
