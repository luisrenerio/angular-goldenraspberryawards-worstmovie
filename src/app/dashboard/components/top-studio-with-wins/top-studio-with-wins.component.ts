import { Component, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-top-studio-with-wins',
  imports: [MatGridListModule, MatTableModule],
  templateUrl: './top-studio-with-wins.component.html',
  styleUrl: './top-studio-with-wins.component.scss'
})
export class TopStudioWithWinnersComponent {
  private readonly dashboardService = inject(DashboardService);
  public readonly displayedColumns: string[] = ['name', 'winCount'];

  topStudios: any[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dashboardService.getTopStudios()
      .subscribe(data => this.topStudios = data.studios.slice(0, 3));
  }
}
