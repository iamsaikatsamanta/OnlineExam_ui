import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserAuthService} from '../service/User/user-auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userData: any = {
    refId: '',
    name: '',
    img_url : ''
  };
  constructor(private router: Router,private userAuthService: UserAuthService) { }

  ngOnInit() {
    this.userData = this.userAuthService.getUserData()
    this.router.navigate(['/user-dashboard/home']);
  }

}
