import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { TopStudioWithWinnersComponent } from './top-studio-with-wins.component';
import { DashboardService } from '../../services/dashboard.service';

describe('TopStudioWithWinnersComponent', () => {
  let component: TopStudioWithWinnersComponent;
  let fixture: ComponentFixture<TopStudioWithWinnersComponent>;
  let dashboardService: jasmine.SpyObj<DashboardService>;

  const mockStudiosData = {
    studios: [
      { name: 'Studio A', winCount: 10 },
      { name: 'Studio B', winCount: 8 },
      { name: 'Studio C', winCount: 7 },
      { name: 'Studio D', winCount: 5 }
    ]
  };

  beforeEach(async () => {
    const dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['getTopStudios']);
    dashboardServiceSpy.getTopStudios.and.returnValue(of(mockStudiosData));

    await TestBed.configureTestingModule({
      imports: [TopStudioWithWinnersComponent],
      providers: [
        provideHttpClient(),
        { provide: DashboardService, useValue: dashboardServiceSpy }
      ]
    }).compileComponents();

    dashboardService = TestBed.inject(DashboardService) as jasmine.SpyObj<DashboardService>;
    fixture = TestBed.createComponent(TopStudioWithWinnersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct displayedColumns', () => {
    expect(component.displayedColumns).toEqual(['name', 'winCount']);
  });

  it('should load top studios and limit to 3 on ngOnInit', fakeAsync(() => {
    dashboardService.getTopStudios.and.returnValue(of(mockStudiosData));
    fixture.detectChanges();

    let result: any[] | null = null;
    component.topStudios$.subscribe((data: any[] | null) => {
      result = data;
    });
    tick();

    expect(result).toBeTruthy();
    expect(result!.length).toBe(3);
    expect(result![0]).toEqual({ name: 'Studio A', winCount: 10 });
    expect(result![1]).toEqual({ name: 'Studio B', winCount: 8 });
    expect(result![2]).toEqual({ name: 'Studio C', winCount: 7 });
  }));

  it('should clear error message when loadData is called', fakeAsync(() => {
    fixture.detectChanges();
    component.errorMessage$.next('Previous error');

    dashboardService.getTopStudios.and.returnValue(of(mockStudiosData));
    component.loadData();
    tick();

    expect(component.errorMessage$.value).toBeNull();
  }));

  it('should display table with top 3 studios', fakeAsync(() => {
    dashboardService.getTopStudios.and.returnValue(of(mockStudiosData));
    fixture.detectChanges();
    component.loadData();
    tick();

    component.topStudios$.subscribe();
    tick();
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('table[mat-table]');
    expect(table).toBeTruthy();

    const rows = fixture.nativeElement.querySelectorAll('tr[mat-row]');
    expect(rows.length).toBe(3);
  }));

  it('should display correct headers', fakeAsync(() => {
    dashboardService.getTopStudios.and.returnValue(of(mockStudiosData));
    fixture.detectChanges();
    component.loadData();
    tick();

    component.topStudios$.subscribe();
    tick();
    fixture.detectChanges();

    const headerCells = fixture.nativeElement.querySelectorAll('th[mat-header-cell]');
    expect(headerCells.length).toBe(2);
    expect(headerCells[0].textContent).toContain('Name');
    expect(headerCells[1].textContent).toContain('Win Count');
  }));

  it('should display section heading', fakeAsync(() => {
    dashboardService.getTopStudios.and.returnValue(of(mockStudiosData));
    fixture.detectChanges();
    component.loadData();
    tick();

    component.topStudios$.subscribe();
    tick();
    fixture.detectChanges();

    const heading = fixture.nativeElement.querySelector('h5');
    expect(heading.textContent).toContain('Top 3 studios with winners');
  }));

});
