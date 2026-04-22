import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieWinnersByYearComponent } from './movie-winners-by-year.component';

describe('MovieWinnersByYearComponent', () => {
  let component: MovieWinnersByYearComponent;
  let fixture: ComponentFixture<MovieWinnersByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieWinnersByYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieWinnersByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
