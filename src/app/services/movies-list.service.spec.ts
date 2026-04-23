import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MoviesListService } from './movies-list.service';

describe('MoviesListService', () => {
  let service: MoviesListService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://challenge.outsera.tech/api/movies';

  const createMockResponse = (content: any[], totalElements: number, pageNumber: number = 0, pageSize: number = 10) => ({
    content,
    totalElements,
    totalPages: Math.ceil(totalElements / pageSize),
    empty: content.length === 0,
    first: pageNumber === 0,
    last: pageNumber >= Math.ceil(totalElements / pageSize) - 1,
    number: pageNumber,
    numberOfElements: content.length,
    pageable: {
      offset: pageNumber * pageSize,
      pageNumber,
      pageSize,
      paged: true,
      sort: { empty: true, sorted: false, unsorted: true },
      unpaged: false
    },
    size: pageSize,
    sort: { empty: true, sorted: false, unsorted: true }
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesListService]
    });
    service = TestBed.inject(MoviesListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies with pagination', () => {
    const mockData = createMockResponse([
      { id: 1, year: 2020, title: 'Movie 1', studios: ['Studio 1'], producers: ['Producer 1'], winner: true },
      { id: 2, year: 2020, title: 'Movie 2', studios: ['Studio 2'], producers: ['Producer 2'], winner: false }
    ], 100, 0, 10);

    service.getMovies(0, 10).subscribe(data => {
      expect(data).toEqual(mockData);
      expect(data.content.length).toBe(2);
    });

    const req = httpMock.expectOne(`${baseUrl}?page=0&size=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch movies with winner filter', () => {
    const mockData = createMockResponse([
      { id: 1, year: 2020, title: 'Movie 1', studios: ['Studio 1'], producers: ['Producer 1'], winner: true }
    ], 50, 0, 10);

    service.getMovies(0, 10, true).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}?page=0&size=10&winner=true`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch movies with year filter', () => {
    const mockData = createMockResponse([
      { id: 1, year: 2020, title: 'Movie 1', studios: ['Studio 1'], producers: ['Producer 1'], winner: true }
    ], 20, 0, 10);

    service.getMovies(0, 10, undefined, 2020).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}?page=0&size=10&year=2020`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch movies with winner and year filters', () => {
    const mockData = createMockResponse([
      { id: 1, year: 2020, title: 'Movie 1', studios: ['Studio 1'], producers: ['Producer 1'], winner: true }
    ], 10, 0, 10);

    service.getMovies(0, 10, true, 2020).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}?page=0&size=10&winner=true&year=2020`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch movies with false winner filter', () => {
    const mockData = createMockResponse([
      { id: 2, year: 2020, title: 'Movie 2', studios: ['Studio 2'], producers: ['Producer 2'], winner: false }
    ], 50, 0, 10);

    service.getMovies(0, 10, false).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}?page=0&size=10&winner=false`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle pagination', () => {
    const mockData = createMockResponse([], 100, 3, 10);

    service.getMovies(3, 10).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}?page=3&size=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle different page sizes', () => {
    const mockData = createMockResponse([], 100, 0, 5);

    service.getMovies(0, 5).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}?page=0&size=5`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle error when fetching movies fails', () => {
    service.getMovies(0, 10).subscribe(
      () => fail('should have failed with error'),
      (error: Error) => {
        expect(error.message).toBe('Ocorreu um erro no servidor, entre em contato com o suporte.');
      }
    );

    const req = httpMock.expectOne(`${baseUrl}?page=0&size=10`);
    req.error(new ErrorEvent('Network error'));
  });

  it('should handle null winner parameter', () => {
    const mockData = createMockResponse([], 100, 0, 10);

    service.getMovies(0, 10, null as any).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}?page=0&size=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
