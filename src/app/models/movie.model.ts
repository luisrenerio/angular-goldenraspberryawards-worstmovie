export class Movie {
  id: number;
  title: string;
  year: number;
  studios: string[];
  producers: string[];
  winner: boolean;

  constructor(id: number, title: string, year: number, studios: string[], producers: string[], winner: boolean) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.studios = studios;
    this.producers = producers;
    this.winner = winner;
  }

}

export interface YearsWithMultipleWinners {
  years: YearWithMultipleWinners[];
}

export interface YearWithMultipleWinners {
  year: number;
  winnerCount: number;
}

export interface StudiosWithWinCount {
  studios: StudioWithWinCount[];
}

export interface StudioWithWinCount {
  name: string;
  winCount: number;
} 

export interface ProducerInterval {
  min: ProducerIntervalResult[];
  max: ProducerIntervalResult[];
}

export interface ProducerIntervalResult {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface MovieResponse {
  content: Movie[];
  totalElements: number;
  totalPages: number;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
  unpaged: boolean;
}


