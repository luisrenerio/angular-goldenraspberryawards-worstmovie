import { Component, inject, OnInit } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, catchError, Observable, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-top-studio-with-wins',
  standalone: true,
  imports: [MatGridListModule, MatTableModule, MatButtonModule, NgIf, AsyncPipe],
  templateUrl: './top-studio-with-wins.component.html',
  styleUrl: './top-studio-with-wins.component.scss'
})
export class TopStudioWithWinnersComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  public readonly displayedColumns: string[] = ['name', 'winCount'];

  public topStudios$!: Observable<any[] | null>;
  public errorMessage$ = new BehaviorSubject<string | null>(null);
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  ngOnInit(): void {
    this.topStudios$ = this.refresh$.pipe(
      tap(() => this.errorMessage$.next(null)),
      switchMap(() => this.dashboardService.getTopStudios().pipe(
        map(data => data.studios.slice(0, 3)),
        catchError(err => {
          this.errorMessage$.next(err.message || 'Ocorreu um erro ao carregar os estúdios.');
          return of(null);
        })
      ))
    );
  }

  loadData(): void {
    this.refresh$.next();
  }
}
