import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie, ProducerInterval, StudiosWithWinCount, YearsWithMultipleWinners } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://challenge.outsera.tech/api/movies';

  getYearsWithMultipleWinners(): Observable<YearsWithMultipleWinners> {
    return this.http.get<YearsWithMultipleWinners>(`${this.baseUrl}/yearsWithMultipleWinners`)
      .pipe(catchError(this.handleError));
  }

  getTopStudios(): Observable<StudiosWithWinCount> {
    return this.http.get<StudiosWithWinCount>(`${this.baseUrl}/studiosWithWinCount`)
      .pipe(catchError(this.handleError));
  }

  getProducersInterval(): Observable<ProducerInterval> {
    return this.http.get<ProducerInterval>(`${this.baseUrl}/maxMinWinIntervalForProducers`)
      .pipe(catchError(this.handleError));
  }

  getWinnersByYear(year: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/winnersByYear?year=${year}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro no servidor, entre em contato com o suporte.';
    console.error(error);
    return throwError(() => new Error(errorMessage));
  }
}
