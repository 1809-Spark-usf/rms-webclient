import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociateHomeComponent } from './components/associateHome/associate-home/associate-home.component';
import { SearchComponent } from './components/search/search/search.component';
import { ReservationsComponent } from './components/reservations/reservations/reservations.component';
import { SuccessComponent } from './components/success/success/success.component';
import { ErrorComponent } from './components/error/error/error.component';


const routes: Routes = [{
  component: AssociateHomeComponent,
  path: ''
  }, {
    component: SearchComponent,
    path: 'search'
  }, {
    component: ReservationsComponent,
    path: 'reservations'
  }, {
    component: SuccessComponent,
    path: 'success'
  }, {
    component: ErrorComponent,
    path: 'error'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
