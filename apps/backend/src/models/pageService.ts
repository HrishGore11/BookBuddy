import { Repository } from 'typeorm';

export class PageService {
  static async paginate<T>(
    repository: Repository<T>,
    where?: any,
    relations?: any
  ) {
    return await repository.findAndCount({
      where,
      relations: relations,
    });
  }
}
