import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { Subscription } from 'rxjs';

/**
 * confirm-create component verifies that the user wants to confirm a reservation
 */
@Component({
  selector: 'app-confirm-create',
  templateUrl: './confirm-create.component.html',
  styleUrls: ['./confirm-create.component.css'],
})
export class ConfirmCreateComponent implements OnDestroy {
  @Input() reservation;

  createNewResSub: Subscription;
  getUserResSub: Subscription;

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) { }

  /**
   * should save reservation information to database, and should route to the reservations homepage
   */
  confirmReservation() {
    this.reservation.resourceId = this.reservation.resource.id;
    this.reservationService.createNewReservation(this.reservation).subscribe( () => {
      this.reservationService.getUserReservations().subscribe( (data) => {
        this.reservationService.pushNewUserReservations(data);
        this.router.navigateByUrl('/reservations');
        this.activeModal.dismiss();
      });
    }, () => {
      alert('There was an error with the server! Please try again.');
      this.activeModal.dismiss();
    });
  }

  ngOnDestroy() {
    if (this.createNewResSub) {
      this.createNewResSub.unsubscribe();
    }
    if (this.getUserResSub) {
      this.getUserResSub.unsubscribe();
    }
  }

}
