import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewReservationService {
reservation;
  constructor(private httpClient: HttpClient) { }

  queryAvailableResources(resObject) {
    // const url = `http...`
   // return this.httpClient.get(url, resObject);
  }

  queryNewReservation(id , resource) {
    this.reservation.id = id;
    this.reservation.resource = resource;
    // const url = `http...`
    // return this.httpclient.post(url, this.reservation)
  }
}
