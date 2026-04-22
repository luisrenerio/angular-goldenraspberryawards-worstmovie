import { Component, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-producers-win-intervals',
  imports: [MatGridListModule, MatTableModule],
  templateUrl: './producers-win-intervals.component.html',
  styleUrl: './producers-win-intervals.component.scss'
})
export class ProducersWinIntervalsComponent {
  private readonly dashboardService = inject(DashboardService);
  public readonly displayedColumns: string[] = ['producer', 'interval', 'previousWin', 'followingWin'];

  producersInterval: any = { min: [], max: [] };

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dashboardService.getProducersInterval().subscribe(data => {
      this.producersInterval.min = data.min;
      this.producersInterval.max = data.max;
    });
  }
}
