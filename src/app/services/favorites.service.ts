import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private FAVORITES_KEY = 'favorite_countries';
  private _favorites = new BehaviorSubject<any[]>([]);

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const favorites = await this.storage.get(this.FAVORITES_KEY) || [];
    this._favorites.next(favorites);
  }

  getFavorites(): Observable<any[]> {
    return this._favorites.asObservable();
  }

  async addToFavorites(country: any) {
    const currentFavorites = this._favorites.value;
    const updatedFavorites = [...currentFavorites, country];
    await this.storage.set(this.FAVORITES_KEY, updatedFavorites);
    this._favorites.next(updatedFavorites);
  }

  async removeFromFavorites(countryName: string) {
    const currentFavorites = this._favorites.value;
    const updatedFavorites = currentFavorites.filter(c => c.name !== countryName);
    await this.storage.set(this.FAVORITES_KEY, updatedFavorites);
    this._favorites.next(updatedFavorites);
  }

  async isFavorite(countryName: string): Promise<boolean> {
    const favorites = await this.storage.get(this.FAVORITES_KEY) || [];
    return favorites.some((country: any) => country.name === countryName);
  }
}