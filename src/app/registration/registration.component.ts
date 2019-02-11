import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RgistrationService} from '../service/User/rgistration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regex = /^([a-zA-Z0-9\.\-_]+)@([a-zA-Z0-9-]+)\.([a-z]{2,4})(.[a-z]{2,4})?$/;
  regexpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=\-.,<>?{}[\]"':;`~])[a-zA-Z0-9!@#$%^&*()_+=\-.,<>?{}[\]"':;`~]{8,}/;
  registrationForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
    name: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required, Validators.pattern(this.regexpassword)]),
    confirmPassword: new FormControl(null, Validators.required)
  });
  constructor(private registrationService: RgistrationService) { }

  ngOnInit() {
  }
  onSubmit () {
    if (this.registrationForm.valid) {
      this.registrationService.localRegistration(this.registrationForm.getRawValue());
    }
  }
}
