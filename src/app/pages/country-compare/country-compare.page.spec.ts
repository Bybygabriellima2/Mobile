import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryComparePage } from './country-compare.page';

describe('CountryComparePage', () => {
  let component: CountryComparePage;
  let fixture: ComponentFixture<CountryComparePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryComparePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
