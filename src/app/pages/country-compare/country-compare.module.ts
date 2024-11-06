import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountryComparePageRoutingModule } from './country-compare-routing.module';

import { CountryComparePage } from './country-compare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountryComparePageRoutingModule
  ],
  declarations: [CountryComparePage]
})
export class CountryComparePageModule {}
