import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { DashboardComponent } from './dashboard.component';
import { TopStudioWithWinnersComponent } from '../../components/top-studio-with-wins/top-studio-with-wins.component';
import { MovieWinnersByYearComponent } from '../../components/movie-winners-by-year/movie-winners-by-year.component';
import { YearsWithMultipleWinnersComponent } from '../../components/years-with-multiple-winners/years-with-multiple-winners.component';
import { ProducersWinIntervalsComponent } from '../../components/producers-win-intervals/producers-win-intervals.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render TopStudioWithWinnersComponent', () => {
    const topStudioComponent = fixture.debugElement.query(
      el => el.name === 'app-top-studio-with-wins'
    );
    expect(topStudioComponent).toBeTruthy();
  });

  it('should render MovieWinnersByYearComponent', () => {
    const movieWinnersComponent = fixture.debugElement.query(
      el => el.name === 'app-movie-winners-by-year'
    );
    expect(movieWinnersComponent).toBeTruthy();
  });

  it('should render YearsWithMultipleWinnersComponent', () => {
    const yearsComponent = fixture.debugElement.query(
      el => el.name === 'app-years-with-multiple-winners'
    );
    expect(yearsComponent).toBeTruthy();
  });

  it('should render ProducersWinIntervalsComponent', () => {
    const producersComponent = fixture.debugElement.query(
      el => el.name === 'app-producers-win-intervals'
    );
    expect(producersComponent).toBeTruthy();
  });

  it('should have all child components in the template', () => {
    const template = fixture.nativeElement.innerHTML;
    expect(template).toContain('app-top-studio-with-wins');
    expect(template).toContain('app-movie-winners-by-year');
    expect(template).toContain('app-years-with-multiple-winners');
    expect(template).toContain('app-producers-win-intervals');
  });
});
