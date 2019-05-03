import { NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { AssociateHomeComponent } from './components/associateHome/associate-home/associate-home.component';
import { SearchComponent } from './components/search/search/search.component';
import { ReservationsComponent } from './components/reservations/reservations/reservations.component';
import { ErrorComponent } from './components/error/error/error.component';
import { LoginComponent } from './components/login/login/login.component';
import { LoadingComponent } from './components/loading/loading/loading.component';
import { CalendarComponent } from './components/shared/calendar/calendar.component';
import { UserService } from './services/user/user.service';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './components/admin/admin-registration/admin-registration.component';
import { AdminVerifiedComponent } from './components/admin/admin-verified/admin-verified.component';
import { AdminEditReservationComponent } from './components/admin/admin-edit-reservation/admin-edit-reservation/admin-edit-reservation.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';

const routes: Routes = [{
  component: LoginComponent,
  path: '',
}, {
  component: LoadingComponent,
  path: 'loading',
}, {
  component: AssociateHomeComponent,
  path: 'home',
 canActivate: [UserService],
}, {
  component: SearchComponent,
  path: 'search',
 canActivate: [UserService],
}, {
  component: SearchComponent,
  path: 'search/:openForm',
  canActivate: [UserService],
}, {
  component: ReservationsComponent,
  path: 'reservations',
 canActivate: [UserService],
}, {
  component: ErrorComponent,
  path: 'error',
}, {
  component: CalendarComponent,
  path: 'calendar',
}, {
  component: AdminLoginComponent,
  path: 'adminLogin',
}, {
  component: AdminRegistrationComponent,
  path: 'adminRegistration',
}, {
  component: AdminEditReservationComponent,
  path: 'editReservation',
}, {
  component: AdminVerifiedComponent,
  path: 'adminVerified',
}, {
  component: AdminHomeComponent,
  path: 'adminHome',
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
