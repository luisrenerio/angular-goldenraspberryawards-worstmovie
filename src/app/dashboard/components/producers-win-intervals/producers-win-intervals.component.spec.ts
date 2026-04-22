import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersWinIntervalsComponent } from './producers-win-intervals.component';

describe('ProducersWinIntervalsComponent', () => {
  let component: ProducersWinIntervalsComponent;
  let fixture: ComponentFixture<ProducersWinIntervalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducersWinIntervalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducersWinIntervalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
