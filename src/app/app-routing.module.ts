import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ObservationDetailsComponent } from './observation-details/observation-details.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { SpeciesListComponent } from './species-list/species-list.component';

const routes: Routes = [
  { path: 'regions/:regionId/observations/:observationId', component: ObservationDetailsComponent },
  { path: 'regions/:regionId/observations', component: ItemListComponent },
  { path: 'regions/:regionId/taxons/:taxonId', component: ItemListComponent },
  { path: 'regions/:regionId/taxons', component: SpeciesListComponent },
  { path: 'regions/:regionId', redirectTo: '/regions/:regionId/taxons' },
  { path: 'regions', component: PlaceListComponent },
  { path: '', redirectTo: '/regions', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
