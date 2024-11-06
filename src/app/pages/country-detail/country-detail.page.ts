import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.page.html',
  styleUrls: ['./country-detail.page.scss'],
})
export class CountryDetailPage implements OnInit {
  country: any;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private loadingCtrl: LoadingController
  ) {}

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
        next: (data) => {
          this.country = data;
          loading.dismiss();
        },
        error: (error) => {
          console.error('Error fetching country details:', error);
          loading.dismiss();
        }
      });
    }
  }

  openMap() {
    if (this.country?.maps) {
      window.open(this.country.maps, '_blank');
    }
  }
}