import {Component, OnInit} from '@angular/core';
import {AdminAuthService} from './service/Admin-Service/admin-auth.service';
import {UserAuthService} from './service/User/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private adminAuthService: AdminAuthService, private userAuthService: UserAuthService) {}
  ngOnInit() {
    if (localStorage.getItem('adminToken') !== null) {
      this.adminAuthService.autoAuthAdmin();
    } else {
      this.userAuthService.autoAuthUser();
    }
  }
}

