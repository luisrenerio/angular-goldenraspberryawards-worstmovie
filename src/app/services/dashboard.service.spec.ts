import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://challenge.outsera.tech/api/movies';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService]
    });
    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch years with multiple winners', () => {
    const mockData = {
      years: [
        { year: 2000, winnerCount: 2 },
        { year: 2001, winnerCount: 3 }
      ]
    };

    service.getYearsWithMultipleWinners().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}/yearsWithMultipleWinners`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch top studios', () => {
    const mockData = {
      studios: [
        { name: 'Studio A', winCount: 10 },
        { name: 'Studio B', winCount: 8 }
      ]
    };

    service.getTopStudios().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}/studiosWithWinCount`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch producers interval', () => {
    const mockData = {
      max: [
        { producer: 'Producer A', interval: 10, previousWin: 2000, followingWin: 2010 }
      ],
      min: [
        { producer: 'Producer B', interval: 1, previousWin: 2005, followingWin: 2006 }
      ]
    };

    service.getProducersInterval().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}/maxMinWinIntervalForProducers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch winners by year', () => {
    const year = 2020;
    const mockData = [
      { id: 1, year: 2020, title: 'Movie 1', studios: ['Studio 1'], producers: ['Producer 1'], winner: true },
      { id: 2, year: 2020, title: 'Movie 2', studios: ['Studio 2'], producers: ['Producer 2'], winner: true }
    ];

    service.getWinnersByYear(year).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}/winnersByYear?year=${year}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle error when fetching years with multiple winners fails', () => {
    service.getYearsWithMultipleWinners().subscribe(
      () => fail('should have failed with 500 error'),
      (error: Error) => {
        expect(error.message).toBe('Ocorreu um erro no servidor, entre em contato com o suporte.');
      }
    );

    const req = httpMock.expectOne(`${baseUrl}/yearsWithMultipleWinners`);
    req.error(new ErrorEvent('Network error'));
  });

  it('should handle error when fetching top studios fails', () => {
    service.getTopStudios().subscribe(
      () => fail('should have failed with 500 error'),
      (error: Error) => {
        expect(error.message).toBe('Ocorreu um erro no servidor, entre em contato com o suporte.');
      }
    );

    const req = httpMock.expectOne(`${baseUrl}/studiosWithWinCount`);
    req.error(new ErrorEvent('Network error'));
  });

  it('should handle error when fetching producers interval fails', () => {
    service.getProducersInterval().subscribe(
      () => fail('should have failed with 500 error'),
      (error: Error) => {
        expect(error.message).toBe('Ocorreu um erro no servidor, entre em contato com o suporte.');
      }
    );

    const req = httpMock.expectOne(`${baseUrl}/maxMinWinIntervalForProducers`);
    req.error(new ErrorEvent('Network error'));
  });

  it('should handle error when fetching winners by year fails', () => {
    service.getWinnersByYear(2020).subscribe(
      () => fail('should have failed with 500 error'),
      (error: Error) => {
        expect(error.message).toBe('Ocorreu um erro no servidor, entre em contato com o suporte.');
      }
    );

    const req = httpMock.expectOne(`${baseUrl}/winnersByYear?year=2020`);
    req.error(new ErrorEvent('Network error'));
  });
});
