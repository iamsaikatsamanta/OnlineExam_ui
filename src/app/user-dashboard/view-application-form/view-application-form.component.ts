import { Component, OnInit } from '@angular/core';
import {UserInfoService} from '../../service/User/user-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-application-form',
  templateUrl: './view-application-form.component.html',
  styleUrls: ['./view-application-form.component.css']
})
export class ViewApplicationFormComponent implements OnInit {

  user;
  userInfo;
  constructor(private userInfoService: UserInfoService, private router: Router) { }

  ngOnInit() {
    this.userInfoService.getUserInfo().subscribe(resp => {
      this.user = resp.result;
    });
    this.userInfoService.getUserDetails()
      .subscribe(resp => {
        this.userInfo = resp.result;
      });
  }
  onEdit() {
    this.router.navigate(['/user-dashboard/fill-form/edit']);
  }
  onBack() {
    this.router.navigate(['//user-dashboard/home']);
  }
}
