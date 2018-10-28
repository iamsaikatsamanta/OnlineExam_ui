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
  showError = false;
  errorMessage = '';
  adminForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  });
  constructor(private adminAuthService: AdminAuthService) { }

  ngOnInit() {
  }
  submit() {
    if (this.adminForm.invalid) {
      this.showError = true;
      this.errorMessage = 'Invalid or Missing Details';
      setInterval(() => {
        this.showError = false;
      } , 5000);
    } else {
      this.showError = false;
      const adminData: AdminModel = {
        username: this.adminForm.value.username,
        password: this.adminForm.value.password
      };
      this.adminAuthService.onLogin(adminData);
    }
  }
}
