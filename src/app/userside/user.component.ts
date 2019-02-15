import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserAuthService} from '../service/User/user-auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  userData: any = {
    refId: String,
    name: String,
    img_url: String
  };
  constructor(private route: Router, private userAuthService: UserAuthService) {}
  ngOnInit() {
    const data = this.userAuthService.getUserData();
    this.userData = data;
    this.route.navigate(['/exam/instruction']);
  }
}
