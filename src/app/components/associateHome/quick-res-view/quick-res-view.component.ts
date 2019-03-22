import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

/**
 * quick-res-view component creates a list of reservations
 */
@Component({
  selector: 'app-quick-res-view',
  templateUrl: './quick-res-view.component.html',
  styleUrls: ['./quick-res-view.component.css'],
})
export class QuickResViewComponent implements OnInit, OnDestroy {
  userReservations = [];

  loaded: boolean;
  error: boolean;

  constructor(private reservationService: ReservationService) {
    /*
    * Testing implementation
    *
    * this.loaded = true;
    * this.error = false;
    * this.userReservations = [
    *   {    id: 2,
    *     purpose: 'INTERVIEW',
    *     startTime: '2018-03-04T12:25:23.00',
    *     endTime:  '2018-03-04T13:25:23.00',
    *     resource: {name: 'block A'},
    *     userId: 1245,
    *     cancelled: false,
    *     approved: true
    * } , {    id: 3,
    *   purpose: 'PANEL',
    *   startTime: '2018-03-07T12:25:23.00',
    *   endTime:  '2018-03-07T13:25:23.00',
    *   resource: {name: 'block 8'},
    *   userId: 1245,
    *   cancelled: false,
    *   approved: true
    * }];
    */
  }
  ngOnInit() {
    this.viewReservation();
  }
  viewReservation() {
    // Hides results while the HTTP request is waiting for a response
    this.loaded = false;
    this.reservationService.getUserReservations().subscribe((list) => {
      // Updates list here and updates list, as /resverations will
      // share the same list.
      this.userReservations = list;
      this.reservationService.pushNewUserReservations(list);
      this.loaded = true;
      this.error = false;
    }, (err) => {
      // Error handling in case of connection issues.
      this.error = true;
      this.loaded = true;
    });
  }
  ngOnDestroy() {

  }
}
