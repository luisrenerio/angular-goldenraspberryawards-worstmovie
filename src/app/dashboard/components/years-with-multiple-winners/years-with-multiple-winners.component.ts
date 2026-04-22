import { Component, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-years-with-multiple-winners',
  imports: [MatGridListModule, MatTableModule],
  templateUrl: './years-with-multiple-winners.component.html',
  styleUrl: './years-with-multiple-winners.component.scss'
})
export class YearsWithMultipleWinnersComponent {
  private readonly dashboardService = inject(DashboardService);
  public readonly displayedColumns: string[] = ['year', 'winnerCount'];

  yearsWithMultipleWinners: any[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dashboardService.getYearsWithMultipleWinners()
      .subscribe(data => this.yearsWithMultipleWinners = data.years);
  }
}
