import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IMoviesList, IMovieDetails } from '@/app/interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getMovie({ id }): Observable<IMovieDetails> {
    return this.http.get<IMovieDetails>(`/movie/${id}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getMovies({ page }): Observable<IMoviesList> {
    return this.http.get<IMoviesList>('/movie/popular', { params: { page } })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error) {
     // handle error
     return throwError(error);
  }
}
