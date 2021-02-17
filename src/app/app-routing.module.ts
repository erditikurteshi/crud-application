import { LocationViewComponent } from './location/location-view/location-view.component';
import { LocationUpdateComponent } from './location/location-update/location-update.component';
import { LocationCreateComponent } from './location/location-create/location-create.component';
import { LocationComponent } from './location/location.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'location', pathMatch: 'full'},
  { path: 'location', component: LocationComponent },
  { path: 'create', component: LocationCreateComponent },
  { path: 'location/:locationId/edit', component: LocationUpdateComponent },
  { path: 'location/:locationId/view', component: LocationViewComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
