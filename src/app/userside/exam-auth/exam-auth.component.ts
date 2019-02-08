import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAuthService} from '../../service/User/user-auth.service';

@Component({
  selector: 'app-exam-auth',
  templateUrl: './exam-auth.component.html',
  styleUrls: ['./exam-auth.component.css']
})
export class ExamAuthComponent implements OnInit {
  loginForm = new FormGroup({
    refId: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });
  user: any = {
    refId: String,
    name: String,
    img_url: String
  };
  showUser = false;
  isDisabled = false;
  constructor(private userAuthService: UserAuthService) { }

  ngOnInit() {
  }
  onLogin () {
    const data = {
      refId: this.loginForm.get('refId').value,
      password: this.loginForm.get('password').value
    };
    this.userAuthService.userExamLogin(data);
  }
  disabled() {
    this.loginForm.controls['refId'].disable();
    this.isDisabled = true;
    this.userAuthService.getUser(this.loginForm.get('refId').value)
      .subscribe(resp => {
        this.user = resp.result;
        this.showUser  = true;
      });
  }

}
