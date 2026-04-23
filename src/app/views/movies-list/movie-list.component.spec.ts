import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { MovieListComponent } from './movie-list.component';
import { MoviesListService } from '../../services/movies-list.service';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let moviesListService: jasmine.SpyObj<MoviesListService>;

  beforeEach(async () => {
    const moviesListServiceSpy = jasmine.createSpyObj('MoviesListService', ['getMovies']);

    await TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [
        provideHttpClient(),
        { provide: MoviesListService, useValue: moviesListServiceSpy }
      ]
    })
    .compileComponents();

    moviesListService = TestBed.inject(MoviesListService) as jasmine.SpyObj<MoviesListService>;
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
