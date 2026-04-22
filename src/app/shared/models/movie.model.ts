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
