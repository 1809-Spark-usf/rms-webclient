import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';

/**
 * cancel-reservation component cancels a reservation and then updates the list
 */
@Component({
  selector: 'app-cancel-reservation-popup',
  templateUrl: './cancel-reservation-popup.component.html',
  styleUrls: ['./cancel-reservation-popup.component.css'],
})
export class CancelReservationPopupComponent implements OnInit, OnDestroy {

  @Input() reservation: Reservation;
  @Input() loaded: boolean;
  user;
  // Booleans used to show/hide information in the component
  resolved: boolean;
  error: boolean;
  cancelResSub: Subscription;
  getUserResSub: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private reservationService: ReservationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.resolved = false;
    this.error = false;
    this.user = this.userService.currentUser;
  }

  /**
   * Cancels reservation, and then updates the list on the page behind the popup.
   */
  cancelReservation() {
    this.cancelResSub = this.reservationService.cancelReservations(this.reservation.id).subscribe(() => {
      this.getUserResSub = this.reservationService.getUserReservations().subscribe((data) => {
        this.reservationService.pushNewUserReservations(data);
        this.activeModal.dismiss();
      });
      this.resolved = true;
    }, () => {
      this.resolved = true;
      this.error = true;
      this.activeModal.dismiss();
    });
  }

  ngOnDestroy() {
    if (this.cancelResSub) {
      this.cancelResSub.unsubscribe();
    }
    if (this.getUserResSub) {
      this.getUserResSub.unsubscribe();
    }
  }

}