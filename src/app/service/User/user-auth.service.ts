import { Injectable } from '@angular/core';
import {UserModel} from '../../model/user-model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import {RestApi} from '../../model/RestApi';
import {ToasterService} from 'angular2-toaster';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  apiUrl = environment.apiUrl;
  private token: string;
  userData: any = {
    refId: String,
    name: String,
    img_url: String
  };
  private authStatusListner = new Subject<boolean>();
  userisLogin = false;
  userisExamLogin = false;
  private tokenTimer: any;
  constructor(private http: HttpClient, private router: Router, private toster: ToasterService) { }
  onUserRegister(userData) {
    this.http.post<RestApi>( this.apiUrl + 'user/register', userData)
      .subscribe(res => {
        if(res.code === 0){
          this.toster.pop('success', 'Registration Successful', 'Login To Continue');
          this.router.navigate(['/candidate-login']);
        } else if(res.code===5){
          this.toster.pop('error', 'User Already Exists');
        }
      }, err=>{
        this.toster.pop('error', 'Something Wnt Wrong');
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
          this.saveAuthData(this.token, expirIn);
          this.getDecodedData(this.token);
          this.authStatusListner.next(true);
          this.userisLogin = true;
        }
      }, err => {
        this.toster.pop('error', 'Invalid Reference ID or Password');
      }, () => {
        this.router.navigate(['/user-dashboard/home']);
      });
  }
  userExamLogin(data) {
    return this.http.post<RestApi>(this.apiUrl + 'user/exam-login', data)
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
            this.router.navigate(['/exam/instruction']);
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
  async autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expirIn = authInfo.expirIn.getTime() - now.getTime();
    if (expirIn > 0) {
      this.token = authInfo.token;
      this.getDecodedData(this.token);
      this.authStatusListner.next(true);
      this.userisLogin = true;
      this.setAuthTimer(expirIn / 1000);
      this.router.navigate(['/user-dashboard/home']);
    }
  }
  async getDecodedData(token: string) {
    const data = new JwtHelperService().decodeToken(token);
    this.userData.refId = data.refId;
    this.getUser(data.refId)
      .subscribe(resp => {
        this.userData.name = resp.result.name;
        this.userData.img_url = resp.result.img_url;
      });
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  logout() {
    this.token = null;
    this.userisLogin = false;
    this.authStatusListner.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
  getUserData() {
    return this.userData;
  }
  getAuthStatus() {
    return this.userisLogin;
  }
  getAuthStatusListner() {
    return this.authStatusListner.asObservable();
  }
  getExamAuthStatusListner() {
    return this.userisExamLogin;
  }
  getToken() {
    return this.token;
  }
  private async saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userExpiration', expirationDate.toISOString());
  }
  private clearAuthData() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userExpiration');
  }
  private getAuthData() {
    const token = localStorage.getItem('userToken');
    const expirIn = localStorage.getItem('userExpiration');
    if (!token || !expirIn) {
      return;
    }
    return {
      token: token,
      expirIn: new Date(expirIn)
    };
  }
  passwordReset(data) {
    return this.http.post<RestApi>(this.apiUrl + 'user/update-password', data);
  }
}
