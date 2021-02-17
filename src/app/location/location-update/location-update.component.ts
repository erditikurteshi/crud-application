import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../shared/service/location.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { City } from 'src/app/shared/models/city';
import { Location } from 'src/app/shared/models/location';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-location-update',
  templateUrl: './location-update.component.html',
  styleUrls: ['./location-update.component.scss']
})
export class LocationUpdateComponent implements OnInit, OnDestroy {
  id: number;
  updateLocationForm: FormGroup;
  cities: City[];
  location: Location;
  subscription: Subscription;
  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private _locationService: LocationService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['locationId'];
    this.subscription = this._locationService.findLocation(this.id).subscribe((response: any) => {
      this.location = response;

      this.updateLocationForm.patchValue({
        id: this.location.id,
        name: this.location.name,
        city: this.location.city,
        longitude: this.location.longitude,
        latitude: this.location.latitude,
        address: this.location.address
      });
    });

    this.updateLocationForm = this.buildLocationForm();
    this.getCities();
  }

  getCities() {
    return this._locationService.getAllCities().subscribe(responsedData => {
      this.cities = responsedData;
    });
  }

  onUpdate() {
    let locationId = this.id;
    let locationData = this.updateLocationForm.value;
    this.subscription = this._locationService.update(locationId, locationData).subscribe((responsedData: any) => {
      this._snackBar.open("Updated succesfully", "Close", {
        duration: 3000,
      });
      this._router.navigateByUrl('/location');
    }, err => {
      this._snackBar.open("Something went wrong", "Close", {
        duration: 3000,
      });
    })
  }

  get locationFormControls() {
    return this.updateLocationForm.controls;
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
