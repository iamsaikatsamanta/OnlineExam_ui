import { Component, OnInit } from '@angular/core';
import {UserInfoService} from '../../service/User/user-info.service';

@Component({
  selector: 'app-view-application-form',
  templateUrl: './view-application-form.component.html',
  styleUrls: ['./view-application-form.component.css']
})
export class ViewApplicationFormComponent implements OnInit {

  user;
  userInfo;
  constructor(private userInfoService: UserInfoService) { }

  ngOnInit() {
    this.userInfoService.getUserInfo().subscribe(resp => {
      this.user = resp.result;
    });
    this.userInfoService.getUserDetails()
      .subscribe(resp => {
        this.userInfo = resp.result;
      });
  }

}
