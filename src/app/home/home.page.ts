import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  countries: any[] = [];
  filteredCountries: any[] = [];
  searchTerm: string = '';
  favorites: any[] = []; 

  constructor(
    private countryService: CountryService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private favoritesService: FavoritesService 
  ) {}

  ngOnInit() {
    this.loadCountries();
    this.loadFavorites(); 
  }

  async loadCountries() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading countries...',
    });
    await loading.present();

    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.filteredCountries = data; 
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
        loading.dismiss();
      }
    });
  }

  loadFavorites() {
    this.favoritesService.getFavorites().subscribe(favorites => {
      this.favorites = favorites; 
    });
  }

  handleSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredCountries = searchTerm && searchTerm.length > 0
      ? this.countries.filter(country =>
          country.name.toLowerCase().includes(searchTerm) ||
          country.region.toLowerCase().includes(searchTerm)
        )
      : this.countries; 
  }

  async toggleFavorite(country: any) {
    const isFavorite = await this.favoritesService.isFavorite(country.name);
    if (isFavorite) {
      await this.favoritesService.removeFromFavorites(country.name);
    } else {
      await this.favoritesService.addToFavorites(country);
    }
    this.loadFavorites(); 
  }

  isFavorite(countryName: string): boolean {
    return this.favorites.some(fav => fav.name === countryName); 
  }

  goToCountryDetail(countryName: string) {
    this.router.navigate(['/country', countryName]); 
  }
}