import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssociateHomeComponent } from './components/associateHome/associate-home/associate-home.component';
import { QuickResViewComponent } from './components/associateHome/quick-res-view/quick-res-view.component';

import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ResourceFormComponent } from './components/shared/resource-form/resource-form.component';
import { AdminVerifiedComponent } from './components/admin/admin-verified/admin-verified.component';

import { SearchComponent } from './components/search/search/search.component';
import { ViewResourcesComponent } from './components/search/view-resources/view-resources.component';
import { ReservationsComponent } from './components/reservations/reservations/reservations.component';
import { ErrorComponent } from './components/error/error/error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReservationService } from './services/reservation/reservation.service';
import { ResourceService } from './services/resource/resource.service';
import { LoginComponent } from './components/login/login/login.component';
import { UserService } from './services/user/user.service';
import { LoadingComponent } from './components/loading/loading/loading.component';
import { CancelReservationPopupComponent } from './components/reservations/cancel-reservation-popup/cancel-reservation-popup.component';
import { ConfirmCreateComponent } from './components/search/confirm-create/confirm-create.component';
import { CalendarComponent } from './components/shared/calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './components/admin/admin-registration/admin-registration.component';
import { IsAdminBehaviorSetService } from './services/shared/is-admin-behavior-set.service';
import { TitleBehaviorSetService } from './services/shared/title-behavior-set.service';
import { AdminEditReservationComponent } from './components/admin/admin-edit-reservation/admin-edit-reservation/admin-edit-reservation.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';

@NgModule({
  declarations: [
    AppComponent,
    AssociateHomeComponent,
    QuickResViewComponent,
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    ResourceFormComponent,
    SearchComponent,
    ViewResourcesComponent,
    ReservationsComponent,
    ErrorComponent,
    LoginComponent,
    ConfirmCreateComponent,
    CancelReservationPopupComponent,
    LoadingComponent,
    CalendarComponent,
    AdminLoginComponent,
    AdminRegistrationComponent,
    AdminVerifiedComponent,
    AdminEditReservationComponent,
    AdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatIconModule,
    BrowserAnimationsModule,
  ],
  exports: [
    CalendarComponent,
  ],
  providers: [
    ReservationService,
    ResourceService,
    UserService,
    IsAdminBehaviorSetService,
    TitleBehaviorSetService,
  ],
  entryComponents: [
    ConfirmCreateComponent,
    CancelReservationPopupComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})

export class AppModule { }
