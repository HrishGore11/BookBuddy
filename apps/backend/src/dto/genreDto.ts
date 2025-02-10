import { Genre } from '../entities/genre';

class GenreDto {
  genreId: string;
  genreName: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(genre: Genre) {
    this.genreId = genre?.genreId;
    this.genreName = genre?.genreName;
    this.createdAt = genre?.createdAt;
    this.updatedAt = genre?.updatedAt;
  }

  public static toDto(genres: Genre[]) {
    return genres.map((genre) => new GenreDto(genre));
  }
}
export { GenreDto };
