import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { ProducersWinIntervalsComponent } from './producers-win-intervals.component';
import { DashboardService } from '../../services/dashboard.service';
import { ProducerInterval } from '../../models/movie.model';

describe('ProducersWinIntervalsComponent', () => {
  let component: ProducersWinIntervalsComponent;
  let fixture: ComponentFixture<ProducersWinIntervalsComponent>;
  let dashboardService: jasmine.SpyObj<DashboardService>;

  const mockProducerData: ProducerInterval = {
    max: [
      { producer: 'Producer A', interval: 10, previousWin: 2000, followingWin: 2010 },
      { producer: 'Producer B', interval: 8, previousWin: 2001, followingWin: 2009 }
    ],
    min: [
      { producer: 'Producer C', interval: 1, previousWin: 2005, followingWin: 2006 }
    ]
  };

  beforeEach(async () => {
    const dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['getProducersInterval']);
    dashboardServiceSpy.getProducersInterval.and.returnValue(of(mockProducerData));

    await TestBed.configureTestingModule({
      imports: [ProducersWinIntervalsComponent],
      providers: [
        provideHttpClient(),
        { provide: DashboardService, useValue: dashboardServiceSpy }
      ]
    }).compileComponents();

    dashboardService = TestBed.inject(DashboardService) as jasmine.SpyObj<DashboardService>;
    fixture = TestBed.createComponent(ProducersWinIntervalsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct displayedColumns', () => {
    expect(component.displayedColumns).toEqual(['producer', 'interval', 'previousWin', 'followingWin']);
  });

  it('should clear error message when loadData is called', fakeAsync(() => {
    fixture.detectChanges();
    component.errorMessage$.next('Previous error');

    dashboardService.getProducersInterval.and.returnValue(of(mockProducerData));
    component.loadData();
    tick();

    expect(component.errorMessage$.value).toBeNull();
  }));

  it('should display both max and min tables when data loads', fakeAsync(() => {
    dashboardService.getProducersInterval.and.returnValue(of(mockProducerData));
    fixture.detectChanges();
    component.loadData();
    tick();

    component.producersInterval$.subscribe();
    tick();
    fixture.detectChanges();

    const tables = fixture.nativeElement.querySelectorAll('table[mat-table]');
    expect(tables.length).toBe(2);
  }));

  it('should display correct headers in tables', fakeAsync(() => {
    dashboardService.getProducersInterval.and.returnValue(of(mockProducerData));
    fixture.detectChanges();
    component.loadData();
    tick();

    component.producersInterval$.subscribe();
    tick();
    fixture.detectChanges();

    const headerCells = fixture.nativeElement.querySelectorAll('th[mat-header-cell]');
    expect(headerCells.length).toBeGreaterThan(0);
    expect(headerCells[0].textContent).toContain('Producer');
    expect(headerCells[1].textContent).toContain('Interval');
  }));

  it('should display Maximum and Minimum section headings', fakeAsync(() => {
    dashboardService.getProducersInterval.and.returnValue(of(mockProducerData));
    fixture.detectChanges();
    component.loadData();
    tick();

    component.producersInterval$.subscribe();
    tick();
    fixture.detectChanges();

    const headings = fixture.nativeElement.querySelectorAll('h5');
    expect(headings[0].textContent).toContain('Maximum');
    expect(headings[1].textContent).toContain('Minimum');
  }));

});
