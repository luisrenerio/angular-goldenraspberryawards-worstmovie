import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DOCUMENT } from '@angular/common';
import { MatDrawer } from '@angular/material/sidenav';
import { provideHttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let breakpointSubject: Subject<BreakpointState>;
  let document: Document;

  beforeEach(async () => {
    breakpointSubject = new Subject<BreakpointState>();

    const breakpointObserverMock = {
      observe: jasmine.createSpy('observe').and.returnValue(breakpointSubject.asObservable())
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserverMock },
        provideHttpClient(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    document = TestBed.inject(DOCUMENT);

    component.drawer = {
      close: jasmine.createSpy('close'),
      open: jasmine.createSpy('open')
    } as unknown as MatDrawer;
  });

  afterEach(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
  });

  it('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize with light-theme applied to body', () => {
    fixture.detectChanges();
    expect(document.body.classList.contains('light-theme')).toBeTrue();
  });

  it('should toggle isDarkMode and update body classes accordingly', () => {
    fixture.detectChanges();

    component.toggleTheme();
    expect(component.isDarkMode).toBeTrue();
    expect(document.body.classList.contains('dark-theme')).toBeTrue();

    component.toggleTheme();
    expect(component.isDarkMode).toBeFalse();
    expect(document.body.classList.contains('dark-theme')).toBeFalse();
  });

});