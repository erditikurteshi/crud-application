import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { LocationUpdateComponent } from './location/location-update/location-update.component';
import { LocationViewComponent } from './location/location-view/location-view.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationCreateComponent } from './location/location-create/location-create.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationComponent } from './location/location.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    LocationCreateComponent,
    LocationUpdateComponent,
    ConfirmDialogComponent,
    LocationViewComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4uAw7EqVjGerYcDpSZjCHxqdRagB-ExA'
    }),
    MaterialModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
