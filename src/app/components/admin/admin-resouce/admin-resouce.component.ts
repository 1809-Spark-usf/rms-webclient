import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Alert } from 'selenium-webdriver';
import { NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlterResourceComponent } from '../alter-resource/alter-resource.component';

@Component({
  selector: 'app-admin-resouce',
  templateUrl: './admin-resouce.component.html',
  styleUrls: ['./admin-resouce.component.css']
})
export class AdminResouceComponent implements OnInit {

  myResourceArr:any;

  /**
  * Used modalService in alter function. 
  * Injecting ResourceService to bring in that services respective functions.
  */
  constructor(private modalService: NgbModal,
    private res : ResourceService) { }

  ngOnInit() {
    this.getResources();
  }

  /**
  * Utilizes function getAllResources() from resource service
  * saves all resources into myResourceArray
  */
  getResources() {
    this.res.getAllResources().subscribe( 
      data => {
        console.log(data);
        this.myResourceArr = data;},
      error => { alert("FAILUERS");}
    );
  }


  /**
  * Created modealRef to open alter resource
  * @param myAlter Takes in the selected resource. 
  */
  alter(myAlter : any) { 
    const modalRef = this.modalService.open(AlterResourceComponent, { centered: true });
    modalRef.componentInstance.resources= myAlter;
  }

}
