import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminAuthService } from '../service/Admin-Service/admin-auth.service';
import { Subscription } from 'rxjs';
import {UserAuthService} from '../service/User/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private userauthStatusSubs: Subscription;
  private adminauthStatusSubs: Subscription;
  adminIsAuth = false;
  userIsAuth = false;
  dropdown = false;
  constructor(private adminAuthService: AdminAuthService, private userAuthService: UserAuthService) { }

  ngOnInit() {
    this.userIsAuth = this.userAuthService.getAuthStatus();
    this.adminIsAuth = this.adminAuthService.getAuthStatus();
    this.adminauthStatusSubs =  this.adminAuthService.getAuthStatusListner()
    .subscribe(isAuth => {
      this.adminIsAuth = isAuth;
    });
    this.userauthStatusSubs =  this.userAuthService.getAuthStatusListner()
      .subscribe(isAuth => {
        this.userIsAuth = isAuth;
      });
  }
  ngOnDestroy() {
    this.adminauthStatusSubs.unsubscribe();
    this.userauthStatusSubs.unsubscribe();
  }
  onLogout() {
    if (this.adminIsAuth) {
      this.adminAuthService.logout();
    } else if (this.userIsAuth) {
      this.userAuthService.logout();
    }
  }
  // showDropdown() {
  //   document.getElementById('top-img-dropdown').classList.toggle('show-dropdown');
  // }
 
}
