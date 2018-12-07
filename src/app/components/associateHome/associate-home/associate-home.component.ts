import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-associate-home',
  templateUrl: './associate-home.component.html',
  styleUrls: ['./associate-home.component.sass']
})
export class AssociateHomeComponent implements OnInit {
  time = { hour: 9, minute: 30 };
  meridian = true;
  constructor() { }

  ngOnInit() {
  }


  toggleMeridian() {
    this.meridian = !this.meridian;
  }

}
