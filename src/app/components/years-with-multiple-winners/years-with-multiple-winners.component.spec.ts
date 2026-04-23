import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { YearsWithMultipleWinnersComponent } from './years-with-multiple-winners.component';
import { DashboardService } from '../../services/dashboard.service';

describe('YearsWithMultipleWinnersComponent', () => {
  let component: YearsWithMultipleWinnersComponent;
  let fixture: ComponentFixture<YearsWithMultipleWinnersComponent>;
  let dashboardService: jasmine.SpyObj<DashboardService>;

  const mockYearsData = {
    years: [
      { year: 2000, winnerCount: 2 },
      { year: 2001, winnerCount: 3 },
      { year: 2002, winnerCount: 2 }
    ]
  };

  beforeEach(async () => {
    const dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['getYearsWithMultipleWinners']);
    dashboardServiceSpy.getYearsWithMultipleWinners.and.returnValue(of(mockYearsData));

    await TestBed.configureTestingModule({
      imports: [YearsWithMultipleWinnersComponent],
      providers: [
        provideHttpClient(),
        { provide: DashboardService, useValue: dashboardServiceSpy }
      ]
    }).compileComponents();

    dashboardService = TestBed.inject(DashboardService) as jasmine.SpyObj<DashboardService>;
    fixture = TestBed.createComponent(YearsWithMultipleWinnersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct displayedColumns', () => {
    expect(component.displayedColumns).toEqual(['year', 'winnerCount']);
  });

  it('should clear error message when loadData is called', fakeAsync(() => {
    fixture.detectChanges();
    component.errorMessage$.next('Previous error');

    dashboardService.getYearsWithMultipleWinners.and.returnValue(of(mockYearsData));
    component.loadData();
    tick();

    expect(component.errorMessage$.value).toBeNull();
  }));

  it('should display table with years data', fakeAsync(() => {
    dashboardService.getYearsWithMultipleWinners.and.returnValue(of(mockYearsData));
    fixture.detectChanges();
    component.loadData();
    tick();

    component.yearsWithMultipleWinners$.subscribe();
    tick();
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('table[mat-table]');
    expect(table).toBeTruthy();

    const rows = fixture.nativeElement.querySelectorAll('tr[mat-row]');
    expect(rows.length).toBe(mockYearsData.years.length);
  }));

  it('should display correct headers', fakeAsync(() => {
    dashboardService.getYearsWithMultipleWinners.and.returnValue(of(mockYearsData));
    fixture.detectChanges();
    component.loadData();
    tick();

    component.yearsWithMultipleWinners$.subscribe();
    tick();
    fixture.detectChanges();

    const headerCells = fixture.nativeElement.querySelectorAll('th[mat-header-cell]');
    expect(headerCells.length).toBe(2);
    expect(headerCells[0].textContent).toContain('Year');
    expect(headerCells[1].textContent).toContain('Winner Count');
  }));

  it('should display section heading', fakeAsync(() => {
    dashboardService.getYearsWithMultipleWinners.and.returnValue(of(mockYearsData));
    fixture.detectChanges();
    component.loadData();
    tick();

    component.yearsWithMultipleWinners$.subscribe();
    tick();
    fixture.detectChanges();

    const heading = fixture.nativeElement.querySelector('h5');
    expect(heading.textContent).toContain('List years with multiple winners');
  }));

});
