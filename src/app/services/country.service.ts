import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  
  getAllCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`).pipe(
      map(countries => countries.map(country => ({
        name: country.name.common,
        flag: country.flags.png,
        capital: country.capital?.[0],
        population: country.population,
        region: country.region
      })))
    );
  }

  
  getCountryByName(name: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/name/${name}?fullText=true`).pipe(
      map(countries => {
        const country = countries[0];
        return {
          name: country.name.common,
          officialName: country.name.official,
          flag: country.flags.png,
          capital: country.capital?.[0],
          population: country.population,
          region: country.region,
          subregion: country.subregion,
          languages: Object.values(country.languages || {}),
          currencies: Object.values(country.currencies || {}).map((curr: any) => curr.name),
          area: country.area,
          timezones: country.timezones,
          borders: country.borders,
          independent: country.independent,
          unMember: country.unMember,
          maps: country.maps.googleMaps
        };
      })
    );
  }
}