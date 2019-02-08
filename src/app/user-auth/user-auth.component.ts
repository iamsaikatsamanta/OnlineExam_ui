import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAuthService} from '../service/User/user-auth.service';
import {UserModel} from '../model/user-model';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular-6-social-login';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showError = false;
  errorMessage = '';
  userForm = new FormGroup({
    refId: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });
  constructor(private userAuthService: UserAuthService, private socialAuthService: AuthService) { }

  ngOnInit() {
  }
  onSubmit() {
    if (this.userForm.invalid) {
      this.showError = true;
      this.errorMessage = 'Invalid or Missing Details';
      setInterval(() => {
        this.showError = false;
      } , 5000);
    } else {
      this.showError = false;
      const userData: UserModel = {
        refId: this.userForm.value.refId,
        password: this.userForm.value.password
      };
      this.userAuthService.onUserLogin(userData);
    }
  }
}
