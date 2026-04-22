import { Component, inject, OnInit } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MoviesListService } from '../../services/movies-list.service';
import { MovieResponse } from '../../models/movie.model';
import { MatFormField } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MatGridListModule, MatTableModule, MatCardModule, MatFormField, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatPaginatorModule, NgIf, AsyncPipe, MatButton],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {
  private readonly movieListService = inject(MoviesListService);
  public readonly displayedColumns: string[] = ['id', 'year', 'title', 'winner'];

  public moviesData$!: Observable<MovieResponse | null>;
  public errorMessage: string | null = null;
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  pageSize = 10;
  pageIndex = 0;
  filterYear?: number;
  filterWinner?: boolean;

  ngOnInit(): void {
    this.moviesData$ = this.refresh$.pipe(
      tap(() => this.errorMessage = null),
      switchMap(() =>
        this.movieListService.getMovies(this.pageIndex, this.pageSize, this.filterWinner, this.filterYear).pipe(
          catchError(err => {
            this.errorMessage = err.message || 'Ocorreu um erro ao carregar os filmes.';
            return of(null);
          })
        )
      )
    );
  }

  loadData(): void {
    this.refresh$.next();
  }

  onPageChange(event: PageEvent): void {
    if (this.pageSize !== event.pageSize) {
      this.onPageSizeChange(event);
    } else {
      this.pageIndex = event.pageIndex;
      this.loadData();
    }
  }

  onPageSizeChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = 0;
    this.loadData();
  }

  onFilterChange(): void {
    this.pageIndex = 0;
    this.loadData();
  }
}