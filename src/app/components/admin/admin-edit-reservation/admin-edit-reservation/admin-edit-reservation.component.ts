import { Component, OnInit } from '@angular/core';
import { ReservationIdBehaviorSetService } from '../../../../services/shared/reservation-id-behavior-set.service';
import { Reservation } from '../../../../models/reservation';
import { Resource } from '../../../../models/resource';
import { User } from '../../../../models/user';
import { ReservationService } from '../../../../services/reservation/reservation.service';
import { ResourceService } from '../../../../services/resource/resource.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-edit-reservation',
  templateUrl: './admin-edit-reservation.component.html',
  styleUrls: ['./admin-edit-reservation.component.css'],
})
export class AdminEditReservationComponent implements OnInit {
  reservation = new Reservation();
  resource = new Resource();
  user = new User();

  constructor(
    private reservationIdBehaviorSetService: ReservationIdBehaviorSetService,
    private reservationService: ReservationService,
    private resourceService: ResourceService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.reservationIdBehaviorSetService.currentMessage.subscribe((message) => this.findReservationById(message));
  }

  findReservationById(reservationId: number) {
    this.reservationService.getReservationById(reservationId).subscribe((reservation) => {
      this.reservation = reservation;
      this.findUserById(reservation.userId);
      this.findResourceById(reservation.resourceId);
    });
  }
  findResourceById(resourceId: number) {
    this.resourceService.getResourceById(resourceId).subscribe((resource) => this.resource = resource);
  }
  findUserById(userId: string) {
    this.userService.getUserById(userId).subscribe((user) => this.user = user);
  }

  /**
   * Submit the edit reservation form.
   */
  submit() {
    // TODO: send changes to database for given reservation
  }

  /**
   * Resets the information on the form.
   */
  reset() {
    // TODO: use two-way data binding to clear form
    // on button click from user
  }

}
