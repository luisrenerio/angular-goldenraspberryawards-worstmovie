import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStudioWithWinnersComponent } from './top-studio-with-wins.component';

describe('TopStudioWithWinnersComponent', () => {
  let component: TopStudioWithWinnersComponent;
  let fixture: ComponentFixture<TopStudioWithWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopStudioWithWinnersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopStudioWithWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
