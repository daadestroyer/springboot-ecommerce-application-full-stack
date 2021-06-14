import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../entitys/country';
import { map } from 'rxjs/operators';
import { State } from '../entitys/state';

@Injectable({
  providedIn: 'root',
})
export class CheckoutFormService {
  private countryurl = 'http://localhost:8081/api/countries';
  private statesurl = 'http://localhost:8081/api/states';

  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.httpClient
      .get<GetResponseCountries>(this.countryurl)
      .pipe(map((response) => response._embedded.countries));
  }

  getStates(theCountryCode: string): Observable<State[]> {
    // search url
    const searchurl = `${this.statesurl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchurl).pipe(
      map((response)=>response._embedded.states)
    );
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data); // the of operator from rxjs , will wrap an object as an Observable
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }
    return of(data); // the of operator from rxjs , will wrap an object as an Observable
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}
interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}