import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { NewMushroomDialogComponent } from './new-mushroom-dialog/new-mushroom-dialog.component';

const routes: Routes = [
  { path: '', redirectTo: '/observations', pathMatch: 'full' },
  { path: 'observations', component: ItemListComponent },
  { path: 'new-mushroom', component: NewMushroomDialogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
