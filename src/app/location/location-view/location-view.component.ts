import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from './../../shared/service/location.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
declare var google: any;

@Component({
  selector: 'app-location-view',
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.scss']
})
export class LocationViewComponent implements OnInit, OnDestroy {
  location: Location;
  locationId: string;
  lat: number;
  lng: number;
  subscription: Subscription;

  constructor(private _locationService: LocationService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.locationId = this._route.snapshot.params['locationId'];
    this.subscription = this._locationService.findLocation(+this.locationId).subscribe((response: any) => {
      this.location = response;
      this.lat = parseFloat(response.latitude);
      this.lng = parseFloat(response.longitude);
      console.log(this.location);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
