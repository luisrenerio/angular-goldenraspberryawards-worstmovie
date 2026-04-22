import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [CommonModule, MatGridListModule, MatGridTile, DashboardComponent, MatTableModule],
  exports: [DashboardComponent]
})
export class DashboardModule { }
