import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {
campus;
date;
time1;
  constructor(private resourceServ: ResourceService) { }
  ngOnInit() {
    console.log('start');
    this.resourceServ.queryGetCampusAndBuilding();
    }

submit() {

}
}

