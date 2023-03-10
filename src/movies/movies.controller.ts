import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ResponseMovieDto } from './dto/response-movie.dto';
import { ResponseSearchDto } from './dto/resonse-search.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  getSearch(@Query('s') name: string): Promise<ResponseSearchDto[]> {
    try {
      const searchData = this.moviesService.requestSearch(name);
      return searchData;
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  getMovie(@Query('t') title: string): Promise<ResponseMovieDto> {
    try {
      const movieData = this.moviesService.requestMovie(title);
      return movieData;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'movie doesnt exist',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }
}
