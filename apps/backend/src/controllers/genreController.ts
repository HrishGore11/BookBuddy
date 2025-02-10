import { Request, Response } from 'express';
import { GenreDto } from '../dto/genreDto';
import { listOfAllGenreService } from '../services/genreService';

const getAllGenres = async (req: Request, res: Response) => {
  try {
    const listofGenres = await listOfAllGenreService();
    const genreDto = GenreDto.toDto(listofGenres);
    return res.json({
      statusCode: 200,
      status: 'success',
      message: genreDto
        ? 'Genre list fetched successfully.'
        : 'no Genres found',
      data: genreDto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllGenres };
