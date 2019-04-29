import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { SearchDto } from 'src/app/models/search-dto';
import { Reservation } from 'src/app/models/reservation';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { Router } from '@angular/router';
import { Resource } from 'src/app/models/resource';
import { Subscription } from 'rxjs';

/**
 * resource-form component displays the form used for making reservations
 */
@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css'],
})
export class ResourceFormComponent implements OnInit, OnDestroy {
  // Form information
  campuses: any[] = [];
  campusIndex = 0;
  buildingId: number;
  purpose: any;
  date: any;
  time1 = '';
  time2 = '';
  formInput = new SearchDto();
  reminderTime = 1;
  getCampusesSub: Subscription;

  // Fields for error handling in the template.
  loading = false;
  startTimeError = false;
  timeError = false;
  fieldError = false;

  constructor(
    private reservationService: ReservationService,
    private resourceService: ResourceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.resourceService.getCampuses().subscribe( (data) => {
       this.campuses = data;
       console.log(this.campuses);
      }, () => {
        // Error handling, set to empty array
        console.log('went to the error handler');
        this.campuses = [];
    });

  }

  /**
   * Each campus object of the array of campuses has an array of buildings.
   * This sets which campus is selected so that the proper buildings appear.
   */
  setBuildings() {
    this.campusIndex = Number(this.campusIndex);
  }

  /**
   * Converts the timestamp from String to Number
   * Checks to see if your first timestamp(time1) is greater than 9:00 AM
   * and less than the second timestamp(time2)
   * Also checks to see if time2 is greater than time1 and less than 5:00 PM
   */
  timeCheck() {
    const t1 = this.time1.replace(':', '.');
    const t2 = this.time2.replace(':', '.');
    const Num1 = Number(t1);
    const Num2 = Number(t2);

    this.startTimeError = false;
    this.timeError = false;

    if ((9.00 > Num1) || (Num2 > 17.00)) {
      this.timeError = true;
    } else if (Num2 <= Num1) {
      this.startTimeError = true;
    } else {
      this.submit();
    }
  }

  /**
   * Resets the information on the form.
   */
  reset() {
    this.date = '';
    this.time1 = '';
    this.time2 = '';
    this.campusIndex = null;
    this.buildingId = null;
    this.formInput = new SearchDto();
  }

  /**
   * Submits the data to search and saves information in Reservation service
   * to be used to complete the creation of the reservation.
   */
  submit() {
    this.formInput.purpose = this.purpose;
    this.formInput.purpose = this.formInput.purpose.toUpperCase();
    this.formInput.campusId = this.campuses[this.campusIndex].id;
    this.formInput.buildingId = Number(this.buildingId);
    this.formInput.startTime = this.date + 'T' + this.time1 + ':00';
    this.formInput.endTime = this.date + 'T' + this.time2 + ':00';
    this.formInput.reminderTime = this.reminderTime;

    // Checks that all the required fields have input.
    const objectKey = Object.values(this.formInput);
    let success = true;
    for (const key of objectKey) {
      if ((key === undefined) || (key === null)) {
        success = false;
      }
    }

    if (!success) {
      this.fieldError = true;
    } else {
      this.loading = true;
      this.fieldError = false;

      this.resourceService.getAvailableResources(this.formInput).subscribe((data) => {
        this.loading = false;
        const reservation = new Reservation();
        reservation.newReservationObject(this.formInput);
        this.reservationService.pushNewCurrentReservation(reservation);
        this.resourceService.pushNewCurrentResourceList(data);
        if (!this.router.url.includes('search')) {
          this.router.navigate(['search']);
        }
      }, () => {
        this.loading = false;
        alert('A server error has occured! Please try again later.');
      });
    }
  }

  ngOnDestroy() {
    if (this.getCampusesSub) {
      this.getCampusesSub.unsubscribe();
    }
  }

}
