import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from 'src/app/models/reservation';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SearchDto } from 'src/app/models/search-dto';
import { Resource } from 'src/app/models/resource';
import { UserService } from '../user/user.service';
import { CalendarEvent } from 'angular-calendar';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {

  /**
   * A user will be able to navigate to a different page and see the same
   * input on the form for creating a reservation with this
   */
  formInput: SearchDto;

  /**
   * This is the current reservation in the process of being created or updated.
   * This is the reservation that needs to be passed around components that are
   * involved with creating a new reservation or editing (cancelling) and existing one
   */
  currentReservation: Reservation;
  $currentReservation = new Subject<Reservation>();

  /**
   * This is the list of current reservations that a user has.
   * This is shared by a component on the home page and on the
   * current reservations (/reservations) view
   */
  userReservations: Reservation[];
  $userReservations = new Subject<Reservation[]>();

  apiUrl = `${environment.apiUrl}${environment.serviceContext.reservation}`;

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  /**
   * Methods pertaining to objects that need to be
   * shared among various components
   */

  /**
   * push a reservation onto the currentReservation subject
   * @param reservation takes in a reservation
   */
  pushNewCurrentReservation(reservation: Reservation) {
    this.currentReservation = reservation;
    this.$currentReservation.next(reservation);
  }

  /**
   * push a reservation array onto the userReservations subject
   * @param reservationList takes an array of reservations
   */
  pushNewUserReservations(reservationList: Reservation[]) {
    this.userReservations = reservationList;
    this.$userReservations.next(reservationList);
  }

  /**
   * Methods Pertianing to HTTP requests to the
   * Reservation service
   */

  /**
   * persist a new reservation in the database
   * @param reservation takes in a reservation
   * @returns an observable that contains JSON data
   */
  createNewReservation(reservation: Reservation) {
    reservation.userId = this.userService.currentUser.id;
    console.log(JSON.stringify(reservation));
    return this.httpClient.post<Reservation>(this.apiUrl, reservation);
  }

  /**
   * get a list of reservations for the user from the database
   * @returns an observable that contains JSON data for the list
   */
  getUserReservations() {
    let url: string;
    if (this.userService.currentUser) {
      url = `${this.apiUrl}/users?id=${this.userService.currentUser.id}`;
    }
    return this.httpClient.get<Reservation[]>(url);
  }

  /**
   * cancel a reservation in the database by the user id
   * @param id the user id
   * @returns an observable that contains JSON data
   */
  cancelReservations(id: number) {
    console.log("ANGULAR CALL");
        
    const url = `${this.apiUrl}/cancel?id=${id}`;
    return this.httpClient.post(url, null);
  }

  updateReservations(reservation: Reservation) {
    reservation.userId = this.userService.currentUser.id;
    return this.httpClient.post<Reservation>(this.apiUrl, reservation);
  }

  getAllReservations() {
     const URL = `${this.apiUrl}`;
     console.log(URL);
     return this.httpClient.get<Reservation[]>(URL);
  }

  getReservationById(reservationId: number) {
    const URL = `${this.apiUrl}/${reservationId}`;
    return this.httpClient.get<Reservation>(URL);
 }

}
