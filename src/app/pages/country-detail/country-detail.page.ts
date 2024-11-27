
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.page.html',
  styleUrls: ['./country-detail.page.scss'],
})
export class CountryDetailPage implements OnInit {
  country: any;
  loading = false;
  selectedSegment = 'general';
  favoriteCountries: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.loadFavorites();
  }

  ngOnInit() {
    this.loadCountryDetails();
  }

  async loadCountryDetails() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading country details...',
    });
    await loading.present();

    const countryName = this.route.snapshot.paramMap.get('name');
    if (countryName) {
      this.countryService.getCountryByName(countryName).subscribe({
        next: async (data) => {
          this.country = data;
          await loading.dismiss();
        },
        error: async (error) => {
          console.error('Error fetching country details:', error);
          await loading.dismiss();
          this.showError('Failed to load country details');
        }
      });
    }
  }

  async toggleFavorite() {
    if (!this.country?.name) return;
    
    const favorites = this.favoriteCountries;
    const index = favorites.indexOf(this.country.name);
    
    if (index === -1) {
      favorites.push(this.country.name);
      await this.showToast('Added to favorites');
    } else {
      favorites.splice(index, 1);
      await this.showToast('Removed from favorites');
    }
    
    localStorage.setItem('favoriteCountries', JSON.stringify(favorites));
    this.favoriteCountries = favorites;
  }

  async showImageFullscreen(imageUrl: string) {
    const alert = await this.alertCtrl.create({
      header: this.country?.name,
      message: `<img src="${imageUrl}" style="width: 100%">`,
      buttons: ['Close']
    });
    await alert.present();
  }

  private loadFavorites() {
    const favorites = localStorage.getItem('favoriteCountries');
    this.favoriteCountries = favorites ? JSON.parse(favorites) : [];
  }

  isFavorite(): boolean {
    return this.favoriteCountries.includes(this.country?.name);
  }

  openMap() {
    if (this.country?.capital && this.country?.name) {
      const searchQuery = `${this.country.capital}, ${this.country.name}`;
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
      window.open(mapsUrl, '_blank');
    } else {
      this.showError('Unable to open map: location information not available');
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  private async showError(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }
}
