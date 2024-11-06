import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-country-compare',
  templateUrl: './country-compare.page.html',
  styleUrls: ['./country-compare.page.scss'],
})
export class CountryComparePage implements OnInit {
  countries: any[] = [];
  selectedCountry1: any = null;
  selectedCountry2: any = null;
  filteredCountries1: any[] = [];
  filteredCountries2: any[] = [];
  loading = false;

  constructor(
    private countryService: CountryService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadCountries();
  }

  async loadCountries() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading countries...',
    });
    await loading.present();

    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.filteredCountries1 = data;
        this.filteredCountries2 = data;
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
        loading.dismiss();
      }
    });
  }

  handleSearch(event: any, listNumber: number) {
    const searchTerm = event.target.value.toLowerCase();
    const targetList = listNumber === 1 ? 'filteredCountries1' : 'filteredCountries2';
    
    if (searchTerm && searchTerm.length > 0) {
      this[targetList] = this.countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm) ||
        country.region.toLowerCase().includes(searchTerm)
      );
    } else {
      this[targetList] = this.countries;
    }
  }

  async selectCountry(country: any, position: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading country details...',
    });
    await loading.present();

    this.countryService.getCountryByName(country.name).subscribe({
      next: (detailedCountry) => {
        if (position === 1) {
          this.selectedCountry1 = detailedCountry;
        } else {
          this.selectedCountry2 = detailedCountry;
        }
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error fetching country details:', error);
        loading.dismiss();
      }
    });
  }

  calculatePopulationDensity(country: any): number {
    return country ? Number((country.population / country.area).toFixed(2)) : 0;
  }

  getPercentageDifference(value1: number, value2: number): string {
    if (!value1 || !value2) return '0%';
    const diff = ((Math.abs(value1 - value2) / ((value1 + value2) / 2)) * 100).toFixed(1);
    return `${diff}%`;
  }
}