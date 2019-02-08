import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userData: any = {
    refId: 'bhjhjhj',
    name: 'bbashbfhabshf asbfjjkas',
    img_url : 'hajsjkasjkfhjk'
  };
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/user-dashboard/home']);
  }

}
