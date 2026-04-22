import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { TopStudioWithWinnersComponent } from "../../components/top-studio-with-wins/top-studio-with-wins.component";
import { MovieWinnersByYearComponent } from "../../components/movie-winners-by-year/movie-winners-by-year.component";
import { YearsWithMultipleWinnersComponent } from "../../components/years-with-multiple-winners/years-with-multiple-winners.component";
import { ProducersWinIntervalsComponent } from "../../components/producers-win-intervals/producers-win-intervals.component";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule, MatTableModule, TopStudioWithWinnersComponent, MovieWinnersByYearComponent, YearsWithMultipleWinnersComponent, ProducersWinIntervalsComponent, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent { }
