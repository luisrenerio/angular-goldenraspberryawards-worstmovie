import { Component, inject, OnInit } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, catchError, Observable, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-years-with-multiple-winners',
  standalone: true,
  imports: [MatGridListModule, MatTableModule, MatButtonModule, NgIf, AsyncPipe],
  templateUrl: './years-with-multiple-winners.component.html',
  styleUrl: './years-with-multiple-winners.component.scss'
})
export class YearsWithMultipleWinnersComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  public readonly displayedColumns: string[] = ['year', 'winnerCount'];

  public yearsWithMultipleWinners$!: Observable<any[] | null>;
  public errorMessage: string | null = null;
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  ngOnInit(): void {
    this.yearsWithMultipleWinners$ = this.refresh$.pipe(
      tap(() => this.errorMessage = null),
      switchMap(() => this.dashboardService.getYearsWithMultipleWinners().pipe(
        map(data => data.years),
        catchError(err => {
          this.errorMessage = err.message || 'Ocorreu um erro ao carregar os anos com múltiplos vencedores.';
          return of(null);
        })
      ))
    );
  }

  loadData(): void {
    this.refresh$.next();
  }
}
