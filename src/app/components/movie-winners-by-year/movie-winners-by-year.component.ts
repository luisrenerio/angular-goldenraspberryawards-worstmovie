import { Component, inject, OnInit } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { Movie } from '../../models/movie.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-movie-winners-by-year',
  standalone: true,
  imports: [MatGridListModule, MatTableModule, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, MatIconModule, NgIf, AsyncPipe],
  templateUrl: './movie-winners-by-year.component.html',
  styleUrl: './movie-winners-by-year.component.scss'
})
export class MovieWinnersByYearComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  public readonly displayedColumns: string[] = ['id', 'year', 'title'];
  public year: number | undefined;

  public movies$!: Observable<Movie[] | null>;
  public errorMessage$ = new BehaviorSubject<string | null>(null);
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  ngOnInit(): void {
    this.movies$ = this.refresh$.pipe(
      tap(() => this.errorMessage$.next(null)),
      switchMap(() => {
        if (!this.year) return of([]);
        return this.dashboardService.getWinnersByYear(this.year).pipe(
          catchError(err => {
            this.errorMessage$.next(err.message || 'Ocorreu um erro ao carregar os vencedores.');
            return of(null);
          })
        );
      })
    );
  }

  loadData(): void {
    this.refresh$.next();
  }
}
