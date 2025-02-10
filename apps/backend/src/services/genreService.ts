import { Genre } from '../entities/genre';
import { PageService } from '../models/pageService';

const listOfAllGenreService = async () => {
  try {
    const genres = await PageService.paginate(Genre.getRepository());
    return genres[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { listOfAllGenreService };
