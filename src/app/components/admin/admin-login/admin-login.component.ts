import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../models/admin';
import { AdminLoginService } from '../../../services/admin/admin-login.service';
import { IsAdminBehaviorSetService } from '../../../services/shared/is-admin-behavior-set.service';
import { TitleBehaviorSetService } from 'src/app/services/shared/title-behavior-set.service';
import { Router } from '@angular/router';

/**
 * Component
 */
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  admin: Admin;
  username: string;
  password: string;
  errorMessage: string;
  justRegistered: boolean;

  constructor(
    private adminLoginService: AdminLoginService,
    private isAdminBehaviorSet: IsAdminBehaviorSetService,
    private titleBehaviorSetService: TitleBehaviorSetService,
    private router: Router,
  ) { }

  /**
   * When user clicks on submit, sends form data to controller
   */
  onSubmitClick() {
    this.admin = new Admin();
    this.admin.firstname = '';
    this.admin.lastname = '';
    this.admin.username = this.username;
    this.admin.password = this.password;

    this.adminLoginService.validateUser(this.admin).subscribe(
      (data) => {
        this.admin = data;
        this.runLoginEvents();
      }, (err) => {
        this.errorMessage = 'Invalid Login';
      });

  }

  /**
   * Runs login updates
   */
  runLoginEvents() {
    this.admin.password = undefined;
    this.isAdminBehaviorSet.changeBoolean(true);
    sessionStorage.setItem('admin', JSON.stringify(this.admin));
    this.titleBehaviorSetService.changeMessage('Admin - Resource Force');
    this.router.navigate(['adminHome']);
  }

  /**
   * On init will set a boolean value if the user has just registered for a
   * new account so a message can be displayed.
   */
  ngOnInit() {

    if (sessionStorage.getItem('justRegistered') === 'yes') {
      this.justRegistered = true;
    } else {
      this.justRegistered = false;
    }

    sessionStorage.setItem('justRegistered', 'no');
  }

}
