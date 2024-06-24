import { Component, OnInit } from '@angular/core';
import { CountryService } from './country.service';

@Component({
  selector: 'app-fee-installment-plans',
  templateUrl: './fee-installment-plans.component.html',
  styleUrls: ['./fee-installment-plans.component.css']
})
export class FeeInstallmentPlansComponent implements OnInit {
  countries: { name: string, code: string }[] = [];
  selectedCountry: string = '';

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((data: any) => {
      this.countries = data.map((country: any) => ({
        name: country.name.common,
        code: country.cca2
      }));
    });
  }

  onCountryChange(countryCode: string): void {
    this.selectedCountry = countryCode;
  }
}
