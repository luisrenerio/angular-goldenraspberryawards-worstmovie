import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieResponse } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesListService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://challenge.outsera.tech/api/movies';

  getMovies(page: number, size: number, winner?: boolean, year?: number): Observable<MovieResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (winner !== undefined && winner !== null) {
      params = params.set('winner', winner.toString());
    }

    if (year) {
      params = params.set('year', year.toString());
    }

    return this.http.get<MovieResponse>(this.baseUrl, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Ocorreu um erro no servidor, entre em contato com o suporte.`;
    } else {
      errorMessage = `Ocorreu um erro no servidor, entre em contato com o suporte.`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
