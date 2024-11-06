import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryDetailPage } from './country-detail.page';

describe('CountryDetailPage', () => {
  let component: CountryDetailPage;
  let fixture: ComponentFixture<CountryDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
