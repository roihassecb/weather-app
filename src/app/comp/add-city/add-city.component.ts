import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent {

  constructor(private weatherService: WeatherService, private fb: FormBuilder, private customValidation: CustomValidationService) { }

  FormStructure = this.fb.group({
    city: ['', [Validators.required]],
    units: ['', [Validators.required, this.customValidation.ValidateUnits]],
  });


  addCity() {
    const { city, units } = this.FormStructure.value;
    this.weatherService.addCity(city, units);
  }

  validation() {
    const units = this.FormStructure.controls.units;
    if (units.touched) {

      if (units.errors?.required) {
        return `This field is required!`;
      }
      else if (units.errors?.inValid) {
        return units.errors?.inValid;
      }
      else if (!units.errors) {
        return false;
      }
    }
  }

}
