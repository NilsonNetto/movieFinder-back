import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ResponseSearchDto } from './dto/resonse-search.dto';
import { ResponseMovieDto } from './dto/response-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  async requestSearch(name: string): Promise<ResponseSearchDto[]> {
    const apiKey = process.env.OMDB_API_KEY;
    const searchData = (
      await this.httpService.axiosRef.get(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${name}`,
      )
    ).data.Search;
    const responseData = [];
    const maxLength = searchData.length >= 3 ? 3 : searchData.length - 1;
    for (let i = 0; i < maxLength; i++) {
      const movie = new ResponseSearchDto();
      movie.title = searchData[i].Title;
      movie.year = searchData[i].Year;
      movie.imbdId = searchData[i].imdbID;
      responseData.push(movie);
    }
    return responseData;
  }

  async requestMovie(title: string): Promise<ResponseMovieDto> {
    const apiKey = process.env.OMDB_API_KEY;
    const movieData = (
      await this.httpService.axiosRef.get(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}&plot=full`,
      )
    ).data;
    const responseData = new ResponseMovieDto();
    responseData.title = movieData.Title;
    responseData.year = movieData.Year;
    responseData.poster = movieData.Poster;
    responseData.imbdRating = movieData.imdbRating;
    responseData.plot = movieData.Plot;
    responseData.director = movieData.Director;
    responseData.actor = movieData.Actors;
    return responseData;
  }
}
