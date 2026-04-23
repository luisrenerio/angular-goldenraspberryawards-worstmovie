import { Component, inject, OnInit } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ProducerInterval } from '../../models/movie.model';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-producers-win-intervals',
  standalone: true,
  imports: [MatGridListModule, MatTableModule, MatButtonModule, NgIf, AsyncPipe],
  templateUrl: './producers-win-intervals.component.html',
  styleUrl: './producers-win-intervals.component.scss'
})
export class ProducersWinIntervalsComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  public readonly displayedColumns: string[] = ['producer', 'interval', 'previousWin', 'followingWin'];

  public producersInterval$!: Observable<ProducerInterval | null>;
  public errorMessage$ = new BehaviorSubject<string | null>(null);
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  ngOnInit(): void {
    this.producersInterval$ = this.refresh$.pipe(
      tap(() => this.errorMessage$.next(null)),
      switchMap(() => this.dashboardService.getProducersInterval().pipe(
        catchError(err => {
          this.errorMessage$.next(err.message || 'Ocorreu um erro ao carregar os intervalos dos produtores.');
          return of(null);
        })
      ))
    );
  }

  loadData(): void {
    this.refresh$.next();
  }
}
