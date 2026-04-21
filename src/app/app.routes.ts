import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/views/dashboard/dashboard.component';
import { MovieListComponent } from './movies-list/views/movies-list/movie-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'movies', component: MovieListComponent }
];
