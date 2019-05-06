import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { CancelReservationPopupComponent } from '../cancel-reservation-popup/cancel-reservation-popup.component';
import { UpdateReservationPopupComponent } from '../update-reservation-popup/update-reservation-popup.component';

/**
 * revervations component displays a list of reservations for the user
 */
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent implements OnInit, OnDestroy {
  userReservations = [];
  userResSub: Subscription;

  loaded: boolean;
  error; boolean;
  time = { hour: 9, minute: 30 };
  meridian = true;

  constructor(
    private config: NgbAccordionConfig,
    private modalService: NgbModal,
    private reservationService: ReservationService
  ) { }

  loadValues() {
    // customize default values of accordions used by this component tree
    this.config.closeOthers = true;
    this.config.type = 'warning';

    this.loaded = true;
    this.error = false;

    this.userResSub = this.reservationService.$userReservations.subscribe( (data) => {
      this.userReservations = data;
    });
    if (this.reservationService.userReservations) {
      this.userReservations = this.reservationService.userReservations;
    } else {
      this.reservationService.getUserReservations().subscribe( (data) => {
        this.reservationService.pushNewUserReservations(data);
      });
    }
  }

  /**
   * Open selected reservation.
   * @param selectedReservation Takes in the selected reservation.
   */
  open(selectedReservation: Reservation) {
    const modalRef = this.modalService.open(CancelReservationPopupComponent, { centered: true });
    modalRef.componentInstance.reservation = selectedReservation;
    modalRef.componentInstance.loaded = true;
  }

  update(selectedReservation: Reservation){
    const modalRef = this.modalService.open(UpdateReservationPopupComponent, { centered: true });
    modalRef.componentInstance.reservation = selectedReservation;
    modalRef.componentInstance.loaded = true;
  }

  ngOnInit() {
    this.loadValues();
  }

  ngOnDestroy() {
    if (this.userResSub) {
      this.userResSub.unsubscribe();
    }
  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

}
