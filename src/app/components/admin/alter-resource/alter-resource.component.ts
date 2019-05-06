import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';

@Component({
  selector: 'app-alter-resource',
  templateUrl: './alter-resource.component.html',
  styleUrls: ['./alter-resource.component.css']
})
export class AlterResourceComponent implements OnInit {



@Input() resources : any;

  constructor(private res : ResourceService) { }

  ngOnInit() {
  }

  updateRes(){
     console.log(this.resources);
     this.res.updateResource(this.resources).subscribe(); 
  }
}
