import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  regex = /^$/;
  passwordForm = new FormGroup({
    cnfpassword: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });
  constructor() { }

  ngOnInit() {
  }
  onSetNewPassword() {
    if (this.passwordForm.invalid) {

    } else {
      if (this.passwordForm.value.password === this.passwordForm.value.cnfpassword) {
        const password = {
          password: this.passwordForm.value.password
        };

      }
    }
  }
}
