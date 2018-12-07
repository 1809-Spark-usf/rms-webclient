import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewReservationService {

  constructor(private httpClient: HttpClient) { }

  queryAvailableResources(resObject) {
    // const url = `http...`
    // return this.httpClient.get(url, resObject);
  }
}
