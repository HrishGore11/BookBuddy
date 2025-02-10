import { BookType } from '../entities/bookType';
import { PageService } from '../models/pageService';

const listOfAllBookTypeService = async () => {
  try {
    const bookTypes = await PageService.paginate(BookType.getRepository());
    return bookTypes[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { listOfAllBookTypeService };
