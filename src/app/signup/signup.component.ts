import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { mimeType } from './mime-type.validator';
import {UserAuthService} from '../service/User/user-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  iserror = false;
  imagePreview: string;
  years = [];
  regex = /^([a-zA-Z0-9\.\-_]+)@([a-zA-Z0-9-]+)\.([a-z]{2,4})(.[a-z]{2,4})?$/;
  regxph = /^[0-9]{8,13}$/;
  signupForm = new FormGroup({
    course: new FormControl(null, Validators.required),
    year: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.pattern(this.regex)]),
    phno: new FormControl(null, [Validators.required, Validators.pattern(this.regxph)]),
    name: new FormControl(null, Validators.required),
    dob: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    image: new FormControl(null,  {validators: [Validators.required],  asyncValidators: [mimeType]})
  });

  constructor(private userAuthService: UserAuthService) { }

  ngOnInit() {
  }
  onSubmit() {
    if (this.signupForm.valid) {
      this.iserror = false;
      const userData = new FormData();
      userData.append('course', this.signupForm.value.course);
      userData.append('year', this.signupForm.value.year);
      userData.append('email', this.signupForm.value.email);
      userData.append('phoneno', this.signupForm.value.phno);
      userData.append('name', this.signupForm.value.name);
      userData.append('password', this.signupForm.value.password);
      userData.append('dob', this.signupForm.value.dob);
      userData.append('image', this.signupForm.value.image, this.signupForm.value.name);
      this.userAuthService.onUserRegister(userData);
    } else {
      this.iserror = true;
    }
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({
      image: file
    });
    this.signupForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  onYear() {
    if (this.signupForm.value.course === 'MCA' || this.signupForm.value.course === 'MTECH EVENING') {
      this.years = ['1st', '2nd', '3rd'];
    } else if (this.signupForm.value.course === 'MTECH') {
      this.years = ['1st', '2nd'];
    } else if (this.signupForm.value.course === 'BTECH') {
      this.years = ['1st', '2nd', '3rd', '4th'];
    }
  }
}
