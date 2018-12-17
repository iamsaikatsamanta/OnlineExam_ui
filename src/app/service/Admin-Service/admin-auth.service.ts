import { Injectable } from '@angular/core';
import {AdminModel} from '../../model/admin-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable, Subject} from 'rxjs';
import {ToasterService} from 'angular2-toaster';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private adminData: any = {
    userId: String,
    name: String,
    img_url: String
  };
  private token: string;
  private authStatusListner = new Subject<boolean>();
  private tokenTimer: any;
  private isAuthenticated = false;
  private resetPasswordState = false;
  constructor(private http: HttpClient, private router: Router, private toasterService: ToasterService) { }
  onLogin(adminData: AdminModel) {
    this.http.post<{adminToken: string}>('http://localhost:3000/api/adminAuth/login', adminData)
      .subscribe(res => {
        const token = res.adminToken;
        this.token = token;
        if (this.token) {
          const expirIn = new JwtHelperService().getTokenExpirationDate(this.token);
          const now = new Date();
          const time = (expirIn.getTime() - now.getTime()) / 1000;
          this.setAuthTimer(time);
          this.saveAuthData(this.token, expirIn);
          this.getDecodedData(this.token);
          this.isAuthenticated = true;
          this.authStatusListner.next(true);
          this.router.navigate(['/admin-dashboard/home']);
          this.toasterService.pop('success', 'You Have Login Successful');
        }
      });
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
      this.isAuthenticated = true;
      this.authStatusListner.next(true);
      this.setAuthTimer(expirIn / 1000);
      this.router.navigate(['/admin-dashboard/home']);
    }
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  getAdminData() {
    return this.adminData;
  }
  async getDecodedData(token: string) {
    const data = new JwtHelperService().decodeToken(token);
    this.adminData.userId = data.userId;
    this.adminData.name = data.name;
    this.adminData.img_url = data.img_url;
    return;
  }
  getToken() {
     return this.token;
  }
  getAuthStatusListner() {
    return this.authStatusListner.asObservable();
  }
  getAuthStatus() {
    return this.isAuthenticated;
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
  private async saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminExpiration', expirationDate.toISOString());
  }
  onResetPassword(username: string) {
    this.http.post<{message: string}>('http://localhost:3000/api/adminAuth/resetpasswordinit', {username: username})
      .subscribe(response => {
        this.toasterService.pop('success', response.message);
      });
  }
  setNewPassword(password) {
    this.http.post('http://localhost:3000/api/adminAuth/setnewpassword', password)
      .subscribe(response => {
        console.log(response);
      });
  }
  private clearAuthData() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminExpiration');
  }
  private getAuthData() {
    const token = localStorage.getItem('adminToken');
    const expirIn = localStorage.getItem('adminExpiration');
    if (!token || !expirIn) {
      return;
    }
    return {
      token: token,
      expirIn: new Date(expirIn)
    };
  }
}
