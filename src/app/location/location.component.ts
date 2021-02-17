import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocationService } from '../shared/service/location.service';
import { Location } from '../shared/models/location';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Location } from '../../app/shared/services/'

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  locations: Location[] = [];
  locationData: MatTableDataSource<any>;
  displayedLocationColumn: string[] = ['name', 'address', 'city', 'longitude', 'latitude', 'actions'];
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  subscription: Subscription;
  constructor(private _locationService: LocationService, private _dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations() {
    return this.subscription = this._locationService.getAllLocations().subscribe(responsedData => {
      this.locations = responsedData;

      // Table dataSource data
      this.locationData = new MatTableDataSource(this.locations);
      this.locationData.paginator = this.paginator;
      this.locationData.sort = this.sort;
    });
  }

  openDeleteLocationDialog(id: number): void {
    this.confirmDialogRef = this._dialog.open(ConfirmDialogComponent, {
      disableClose: false,
    });

    this.confirmDialogRef.componentInstance.confirmDeleteMessage =
      "Are you sure you want to delete this location?";

    this.confirmDialogRef.afterClosed().subscribe((result) => {

      if (result) {
        this.deleteLocation(id);
      }
      this.confirmDialogRef = null;
    });
  }

  deleteLocation(id: number) {

    this.subscription = this._locationService.delete(id).subscribe(res => {
      this.locations = this.locations.filter(item => item.id !== id);

      this._snackBar.open("Deleted successfully", "Close", {
        duration: 3000,
      });

      this.getLocations();
    }, err => {
      this._snackBar.open("Something went wrong", "Close", {
        duration: 3000,
      });
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
