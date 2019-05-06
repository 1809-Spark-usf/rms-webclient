import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';

/**
 * login component uses the Slack API for authorization purposes
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  slackUrl =
    `https://slack.com/oauth/authorize\
?scope=identity.basic,identity.email,identity.team\
&client_id=${environment.slackClientId}\
&redirect_uri=${environment.appUrl}loading`;

  currentUserSub: Subscription;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.authConfirmation();
  }

  authConfirmation() {
    // If already logged in, send to associate home.
    if (this.userService.currentUser) {
      this.router.navigate(['home']);
    } else {
      this.currentUserSub = this.userService.$currentUser.subscribe( (user) => {
        if (user) {
          this.router.navigate(['home']);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.currentUserSub) {
      this.currentUserSub.unsubscribe();
    }
  }

}
