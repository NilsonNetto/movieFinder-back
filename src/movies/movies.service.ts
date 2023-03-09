import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ResponseMovieDto } from './dto/response-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  async requestMovie(title: string): Promise<void> {
    const apiKey = process.env.OMDB_API_KEY;
    const movieData = (
      await this.httpService.axiosRef.get(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}&plot=full`,
      )
    ).data;
    return movieData;
  }
}
