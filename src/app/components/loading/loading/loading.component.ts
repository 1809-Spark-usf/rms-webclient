import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

/**
 * A component that informs the user about the state of the application.
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass'],
})
export class LoadingComponent implements OnInit, OnDestroy {

  code;
  userSubscription: Subscription;
  paramsSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private userService: UserService, 
    public router: Router
  ) { }

  ngOnInit() {
    this.loadValues();
    this.userService.getToken(this.code);
  }

  loadValues() {
    let route = new ActivatedRoute();
    console.log(route);
    this.paramsSub = this.activatedRoute.queryParams.subscribe( (params) => {
      this.code = params['code'];
      console.log(this.code);
    });
    this.userSubscription = this.userService.$currentUser.subscribe( (user) => {
      if (this.userService.canActivate()) {
        this.router.navigate(['home']);
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }
  }

}
