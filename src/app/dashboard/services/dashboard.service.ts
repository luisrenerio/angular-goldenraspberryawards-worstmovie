import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../shared/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://challenge.outsera.tech/api/movies';


  getYearsWithMultipleWinners(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/yearsWithMultipleWinners`);
  }

  getTopStudios(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/studiosWithWinCount`);
  }

  getProducersInterval(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/maxMinWinIntervalForProducers`);
  }

  getWinnersByYear(year: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/winnersByYear?year=${year}`);
  }
}
