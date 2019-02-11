import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAuthService} from '../../service/User/user-auth.service';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css']
})
export class UserResetPasswordComponent implements OnInit {
  regexpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=\-.,<>?{}[\]"':;`~])[a-zA-Z0-9!@#$%^&*()_+=\-.,<>?{}[\]"':;`~]{8,}/;
  passwordResetForm = new FormGroup({
    old: new FormControl(null, Validators.required),
    new: new FormControl(null, [Validators.required, Validators.pattern(this.regexpassword)]),
    cnf: new FormControl(null, Validators.required)
  });
  constructor(private userAuthService: UserAuthService, private toster: ToasterService, private router: Router) { }

  ngOnInit() {
  }
  onChange() {
    if (this.passwordResetForm.valid) {
      const data = {
        old: this.passwordResetForm.get('old').value,
        new: this.passwordResetForm.get('new').value
      };
      this.userAuthService.passwordReset(data)
        .subscribe(resp => {
          if (resp.code === 0) {
            this.toster.pop('success', resp.result);
            this.router.navigate(['user-dashboard/home']);
          } else if (resp.code === 2) {
              this.toster.pop('error', resp.result);
          }
        }, err => {
            this.toster.pop('error', 'Something Went Wrong');
        });
    } else {
      this.toster.pop('error', 'All fields are required');
    }
  }
}
