import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { NewReservationService } from 'src/app/services/reservation/new-reservation.service';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {
campus;
building;
purpose;
date;
time1;
time2;
email;
  constructor(private resourceServ: ResourceService, private newResServ: NewReservationService) { }

submit() {

const start = this.date + ' ' + this.time1 + ':000';
const end = this.date + ' ' + this.time2 + ':000';

const reservation = {
'buildingId': 1,
'start': start,
'end': end,
'resourceId': 0,
'resource': null,
'userEmail': this.email,
'purpose': this.purpose,
'cancelled': false,
'approved': true,
};

this.newResServ.queryAvailableResources(reservation);
this.newResServ.reservation = reservation;

console.log(reservation);
}

ngOnInit() {
  console.log('start');
  this.resourceServ.queryGetCampusAndBuilding();
  }
}

