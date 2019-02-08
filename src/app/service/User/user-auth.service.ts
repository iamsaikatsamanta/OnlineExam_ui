import { Injectable } from '@angular/core';
import {UserModel} from '../../model/user-model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import {RestApi} from '../../model/RestApi';
import {ToasterService} from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  apiUrl = environment.apiUrl;
  private token: string;
  private userData: any = {
    refId: String,
    name: String,
    img_url: String
  };
  userisLogin = false;
  userisExamLogin = false;
  private tokenTimer: any;
  constructor(private http: HttpClient, private router: Router, private toster: ToasterService) { }
  onUserRegister(userData) {
    this.http.post( this.apiUrl + 'user/register', userData)
      .subscribe(res => {
        console.log(res);
      });
  }
  async onUserLogin(data: UserModel) {
    await this.http.post<{ token: string }>( this.apiUrl + 'user/login', data)
      .subscribe(result => {
        this.token = result.token;
        if (this.token) {
          const expirIn = new JwtHelperService().getTokenExpirationDate(this.token);
          const now = new Date();
          const time = (expirIn.getTime() - now.getTime()) / 1000;
          this.setAuthTimer(time);
          console.log(time);
          this.getDecodedData(this.token);
          this.userisLogin = true;
        }
      }, err => {
        this.toster.pop('error', 'Invalid Reference ID or Password');
      }, () => {
        this.router.navigate(['/exam/instruction']);
      });
  }
  
  userExamLogin(data) {
    return this.http.post<RestApi>(this.apiUrl + 'exam-login', data)
      .subscribe(resp => {
        if (resp.code === 0) {
          this.token = resp.result;
          if (this.token) {
            const expirIn = new JwtHelperService().getTokenExpirationDate(this.token);
            const now = new Date();
            const time = (expirIn.getTime() - now.getTime()) / 1000;
            this.setAuthTimer(time);
            console.log(time);
            this.getDecodedData(this.token);
            this.userisExamLogin = true;
            this.router.navigate(['/user/instruction']);
            this.toster.pop('success', 'You Have Login Successfully');
          }
        } else if (resp.code === 20) {
          this.toster.pop('error', resp.message);
        }
      });
  }
  getUser (refid) {
    return this.http.get<RestApi>(this.apiUrl + `user/get-user/${refid}`);
  }
  async getDecodedData(token: string) {
    const data = new JwtHelperService().decodeToken(token);
    this.userData.refId = data.refId;
    this.userData.name = data.name;
    this.userData.img_url = data.img_url;
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  logout() {
    this.token = null;
    this.userisLogin = false;
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }
  getUserData() {
    return this.userData;
  }
  getAuthStatusListner() {
    return this.userisLogin;
  }
  getExamAuthStatusListner() {
    return this.userisExamLogin;
  }
  getToken() {
    return this.token;
  }
}
