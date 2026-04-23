import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { MovieWinnersByYearComponent } from './movie-winners-by-year.component';
import { DashboardService } from '../../services/dashboard.service';
import { Movie } from '../../models/movie.model';

describe('MovieWinnersByYearComponent', () => {
  let component: MovieWinnersByYearComponent;
  let fixture: ComponentFixture<MovieWinnersByYearComponent>;
  let dashboardService: jasmine.SpyObj<DashboardService>;

  const mockMovies: Movie[] = [
    { id: 1, year: 2020, title: 'Movie 1', producers: [], studios: [], winner: true },
    { id: 2, year: 2020, title: 'Movie 2', producers: [], studios: [], winner: false }
  ];

  beforeEach(async () => {
    const dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['getWinnersByYear']);
    dashboardServiceSpy.getWinnersByYear.and.returnValue(of(mockMovies));

    await TestBed.configureTestingModule({
      imports: [MovieWinnersByYearComponent],
      providers: [
        provideHttpClient(),
        { provide: DashboardService, useValue: dashboardServiceSpy }
      ]
    }).compileComponents();

    dashboardService = TestBed.inject(DashboardService) as jasmine.SpyObj<DashboardService>;
    fixture = TestBed.createComponent(MovieWinnersByYearComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with undefined year and empty movies', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(component.year).toBeUndefined();
    expect(component.errorMessage$.value).toBeNull();
  }));

  it('should have correct displayedColumns', () => {
    expect(component.displayedColumns).toEqual(['id', 'year', 'title']);
  });

  it('should load data and return movies when loadData is called with a valid year', fakeAsync(() => {
    dashboardService.getWinnersByYear.and.returnValue(of(mockMovies));
    fixture.detectChanges();

    component.year = 2020;
    component.loadData();
    tick();

    let result: Movie[] | null = [];
    component.movies$.subscribe(movies => {
      result = movies;
    });
    tick();

    expect(result).toEqual(mockMovies);
    expect(dashboardService.getWinnersByYear).toHaveBeenCalledWith(2020);
  }));

  it('should return empty array when no year is selected', fakeAsync(() => {
    dashboardService.getWinnersByYear.and.returnValue(of(mockMovies));
    fixture.detectChanges();

    component.year = undefined;
    component.loadData();
    tick();

    let result: Movie[] | null = [];
    component.movies$.subscribe(movies => {
      result = movies;
    });
    tick();

    expect(result).toEqual([]);
    expect(dashboardService.getWinnersByYear).not.toHaveBeenCalled();
  }));

  it('should handle errors and set errorMessage', fakeAsync(() => {
    const errorMessage = 'Network error';
    dashboardService.getWinnersByYear.and.returnValue(
      throwError(() => new Error(errorMessage))
    );
    fixture.detectChanges();

    component.year = 2020;
    component.loadData();
    tick();

    let result: Movie[] | null = [];
    component.movies$.subscribe(movies => {
      result = movies;
    });
    tick();

    expect(result).toBeNull();
    expect(component.errorMessage$.value).toBe(errorMessage);
  }));

  it('should use default error message when error has no message', fakeAsync(() => {
    dashboardService.getWinnersByYear.and.returnValue(
      throwError(() => new Error())
    );
    fixture.detectChanges();

    component.year = 2020;
    component.loadData();
    tick();

    let result: Movie[] | null = [];
    component.movies$.subscribe(movies => {
      result = movies;
    });
    tick();

    expect(component.errorMessage$.value).toBe('Ocorreu um erro ao carregar os vencedores.');
  }));

  it('should clear error message when loadData is called', fakeAsync(() => {
    fixture.detectChanges();
    component.errorMessage$.next('Previous error');

    component.year = 2020;
    dashboardService.getWinnersByYear.and.returnValue(of(mockMovies));
    component.loadData();
    tick();

    expect(component.errorMessage$.value).toBeNull();
  }));

  it('should call loadData when search button is clicked', fakeAsync(() => {
    spyOn(component, 'loadData');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[mat-fab]');
    button.click();

    expect(component.loadData).toHaveBeenCalled();
  }));

  it('should update year when input changes', fakeAsync(() => {
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input[type="number"]');
    input.value = '2020';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();

    expect(component.year).toBe(2020);
  }));

  it('should display error message when error occurs', fakeAsync(() => {
    const errorMessage = 'Test error';
    dashboardService.getWinnersByYear.and.returnValue(
      throwError(() => new Error(errorMessage))
    );
    fixture.detectChanges();

    component.year = 2020;
    component.loadData();
    tick();

    component.movies$.subscribe();
    tick();
    fixture.detectChanges();

    const errorContainer = fixture.nativeElement.querySelector('.error-container');
    expect(errorContainer).toBeTruthy();
    expect(errorContainer.textContent).toContain(errorMessage);
  }));

  it('should display retry button when error occurs', fakeAsync(() => {
    dashboardService.getWinnersByYear.and.returnValue(
      throwError(() => new Error('Test error'))
    );
    fixture.detectChanges();

    component.year = 2020;
    component.loadData();
    tick();

    component.movies$.subscribe();
    tick();
    fixture.detectChanges();

    const retryButton = fixture.nativeElement.querySelector('.error-container button[mat-stroked-button]');
    expect(retryButton).toBeTruthy();
    expect(retryButton.textContent).toContain('Tentar novamente');
  }));

  it('should retry loading when retry button is clicked', fakeAsync(() => {
    dashboardService.getWinnersByYear.and.returnValue(
      throwError(() => new Error('Test error'))
    );
    fixture.detectChanges();

    component.year = 2020;
    component.loadData();
    tick();

    component.movies$.subscribe();
    tick();
    fixture.detectChanges();

    dashboardService.getWinnersByYear.and.returnValue(of(mockMovies));

    const retryButton = fixture.nativeElement.querySelector('.error-container button[mat-stroked-button]');
    retryButton.click();
    tick();

    component.movies$.subscribe();
    tick();
    fixture.detectChanges();

    expect(component.errorMessage$.value).toBeNull();
  }));

  it('should display table with movies when data loads successfully', fakeAsync(() => {
    dashboardService.getWinnersByYear.and.returnValue(of(mockMovies));
    fixture.detectChanges();

    component.year = 2020;
    component.loadData();
    tick();

    component.movies$.subscribe();
    tick();
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('table[mat-table]');
    expect(table).toBeTruthy();

    const rows = fixture.nativeElement.querySelectorAll('tr[mat-row]');
    expect(rows.length).toBe(mockMovies.length);
  }));

  it('should display table headers correctly', fakeAsync(() => {
    dashboardService.getWinnersByYear.and.returnValue(of(mockMovies));
    fixture.detectChanges();

    component.year = 2020;
    component.loadData();
    tick();

    component.movies$.subscribe();
    tick();
    fixture.detectChanges();

    const headerCells = fixture.nativeElement.querySelectorAll('th[mat-header-cell]');
    expect(headerCells.length).toBe(3);
    expect(headerCells[0].textContent).toContain('Id');
    expect(headerCells[1].textContent).toContain('Year');
    expect(headerCells[2].textContent).toContain('Title');
  }));

  it('should display correct movie data in table cells', fakeAsync(() => {
    dashboardService.getWinnersByYear.and.returnValue(of(mockMovies));
    fixture.detectChanges();

    component.year = 2020;
    component.loadData();
    tick();

    component.movies$.subscribe();
    tick();
    fixture.detectChanges();

    const cells = fixture.nativeElement.querySelectorAll('td[mat-cell]');
    expect(cells[0].textContent).toContain('1');
    expect(cells[1].textContent).toContain('2020');
    expect(cells[2].textContent).toContain('Movie 1');
  }));

  it('should not display table when errorMessage is set', fakeAsync(() => {
    dashboardService.getWinnersByYear.and.returnValue(
      throwError(() => new Error('Test error'))
    );
    fixture.detectChanges();

    component.year = 2020;
    component.loadData();
    tick();

    component.movies$.subscribe();
    tick();
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('table[mat-table]');
    expect(table).toBeFalsy();
  }));

  
});
