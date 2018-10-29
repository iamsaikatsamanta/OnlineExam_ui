import { Injectable } from '@angular/core';
import {UserModel} from '../../model/user-model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient) { }
  onUserLogin(userData: UserModel) {
    this.http.post('http://localhost:3000/api/userAuth/login', userData)
    .subscribe(res => {
      console.log(res);
    });
  }
  onUserRegister(userData) {
    this.http.post('http://localhost:3000/api/userAuth/register', userData)
      .subscribe(res => {
        console.log(res);
      });
  }
}
