import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserInfoService} from '../../service/User/user-info.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-user-dashboard-home',
  templateUrl: './user-dashboard-home.component.html',
  styleUrls: ['./user-dashboard-home.component.css']
})
export class UserDashboardHomeComponent implements OnInit {

  constructor(private router: Router, private userInfoService: UserInfoService, private toster: ToasterService) { }
  user: any;
  ngOnInit() {
    this.userInfoService.getUserInfo()
      .subscribe(resp => {
        console.log(resp);
        this.user = resp.result;
        console.log(this.user);
      });
  }
  fillForm() {
    this.router.navigate(['/user-dashboard/fill-form']);
  }
  editForm() {
    this.router.navigate(['/user-dashboard/fill-form/edit']);
  }
  viewResult() {
    this.router.navigate(['/user-dashboard/view-result']);
  }
  viewSyllabus() {
    this.router.navigate(['/user-dashboard/syllabus']);
  }
  viewInstruction() {
    this.router.navigate(['/user-dashboard/view-instruction']);
  }
  changePassword() {
    this.router.navigate(['/user-dashboard/reset-password']);
  }
  viewForm() {
    this.router.navigate(['/user-dashboard/view-form']);
  }
  applyForExam () {
    this.userInfoService.applyForExam()
      .subscribe(resp => {
        if (resp.code === 0) {
           this.user.appliedforexam = true;
          this.toster.pop('success', 'You Have Successfully Applied For The Exam');
        }
      });
  }
}
