import { Component, OnInit } from '@angular/core';
import {AdminAuthService} from '../../service/Admin-Service/admin-auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  username;
  constructor(private adminAuthService: AdminAuthService) { }

  ngOnInit() {
  }
  onForgotPass() {
    console.log(this.username);
    this.adminAuthService.onResetPassword(this.username);
  }
}
