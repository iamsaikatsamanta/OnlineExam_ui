import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminAuthService} from '../service/Admin-Service/admin-auth.service';
import {AdminModel} from '../model/admin-model';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {
  inusshow = false;
  regex = /^([a-zA-Z0-9\.\-_]+)@([a-z0-9-]+)\.([a-z]{2,4})(.[a-z]{2,4})?$/;
  adminForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
    password: new FormControl(null, Validators.required)
  });
  constructor(private adminAuthService: AdminAuthService) { }

  ngOnInit() {
  }
  submit() {
    if (this.adminForm.invalid) {
      this.inusshow = true;
    } else {
      this.inusshow = false;
      const adminData: AdminModel = {
        username: this.adminForm.value.username,
        password: this.adminForm.value.password
      };
      this.adminAuthService.onLogin(adminData);
    }
  }
}
