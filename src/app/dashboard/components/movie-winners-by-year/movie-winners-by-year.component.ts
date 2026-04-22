import { Component, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Movie } from '../../../shared/models/movie.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-winners-by-year',
  imports: [MatGridListModule, MatTableModule, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, MatIconModule],
  templateUrl: './movie-winners-by-year.component.html',
  styleUrl: './movie-winners-by-year.component.scss'
})
export class MovieWinnersByYearComponent {
  private readonly dashboardService = inject(DashboardService);
  public readonly displayedColumns: string[] = ['id', 'year', 'title'];
  public year: number | undefined;

  moviesByYear: Movie[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    if (this.year) {
      this.dashboardService.getWinnersByYear(this.year).subscribe(data => this.moviesByYear = data);
    }
  }
}
