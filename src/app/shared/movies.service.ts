import { Injectable } from '@angular/core';
import { IMovie, IMovieDetails } from '@/app/interfaces/movies';
import { ApiService } from '@/app/shared/api/api.service';
// import api from '@/api';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private list: Map<number, IMovie> = new Map();
  private cache: Map<number, IMovie | IMovieDetails> = new Map();

  constructor(
    private apiService: ApiService
  ) { }

  getDetails(id: number): IMovie | IMovieDetails {
    return this.cache.get(id);
  }

  getList(): Array<IMovie | IMovieDetails> {
    return Array.from(this.list.values());
  }

  public async fetchList({ page }): Promise<void> {
    const { results } = await this.apiService.getMovies({ page }).toPromise();
    results.forEach(movie => {
      this.list.set(movie.id, movie);
    });
  }

  public async fetchDetails({ id }): Promise<void> {
    this.cache.set(id, this.list.get(id));
    const result = await this.apiService.getMovie({ id }).toPromise();
    this.cache.set(result.id, result);
  }
}
