import { Subscription } from 'rxjs';
import { City } from '../../shared/models/city';
import { LocationService } from '../../shared/service/location.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.scss']
})
export class LocationCreateComponent implements OnInit {
  cities: City[];
  createLocationForm: FormGroup;
  subscription:Subscription;
  constructor(private _locationService: LocationService, private _formBuilder: FormBuilder, private _router: Router, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.createLocationForm = this.buildLocationForm();
    this.getCities();
  }

  getCities() {
    return this.subscription = this._locationService.getAllCities().subscribe(responsedData => {
      this.cities = responsedData;
    });
  }

  onCreate() {
    console.log(this.createLocationForm.value);
    let locationFormData = this.createLocationForm.value;
    this.subscription = this._locationService.create(locationFormData).subscribe(responsedData => {
      this._snackBar.open("Created succesfully", "Close", {
        duration: 3000,
      });
      this._router.navigateByUrl('/location');
    }, err => {
      console.log("error");
      this._snackBar.open("Updated succesfully", "Close", {
        duration: 3000,
      });
    })
  }

  get locationFormControls() {
    return this.createLocationForm.controls;
  }

  private buildLocationForm(): FormGroup {
    return this._formBuilder.group({
      id: [],
      name: ['', [Validators.required, Validators.maxLength(20)]],
      city: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      address: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
