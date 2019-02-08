import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard-home',
  templateUrl: './user-dashboard-home.component.html',
  styleUrls: ['./user-dashboard-home.component.css']
})
export class UserDashboardHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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
}
