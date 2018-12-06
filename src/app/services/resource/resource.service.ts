import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private httpClient: HttpClient) { }

queryGetCampusAndBuilding() {
  return console.log('run');
  // let url = `http...`;
  // return this.httpClient.get(url);
}


}
