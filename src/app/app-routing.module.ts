import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ObservationDetailsComponent } from './observation-details/observation-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/observations', pathMatch: 'full' },
  { path: 'observations', component: ItemListComponent },
  { path: 'observations/:id', component: ObservationDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
