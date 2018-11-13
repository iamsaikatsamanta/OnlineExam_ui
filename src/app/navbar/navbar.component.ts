import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminAuthService } from '../service/Admin-Service/admin-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authStatusSubs: Subscription;
  userIsAuth = false;
  constructor(private adminAuthService: AdminAuthService) { }

  ngOnInit() {
    this.authStatusSubs =  this.adminAuthService.getAuthStatusListner()
    .subscribe(isAuth => {
      this.userIsAuth = isAuth;
    });
  }
  ngOnDestroy(){
    this.authStatusSubs.unsubscribe();
  }
  onLogout(){
    this.adminAuthService.logout();
  }

}
