import { Injectable } from '@angular/core';
import {AdminModel} from '../../model/admin-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { async } from 'rxjs/internal/scheduler/async';
import { Subject } from 'rxjs';

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
  constructor(private http: HttpClient, private router: Router) { }
  onLogin(adminData: AdminModel) {
    this.http.post<{adminToken: string}>('http://localhost:3000/api/adminAuth/login', adminData)
      .subscribe(res => {
        const token = res.adminToken;
        this.token = token;
        this.getDecodedData(this.token);
        this.authStatusListner.next(true);
        this.router.navigate(['/admin-dashboard/home']);        
      });
      
  }
  getAdminData(){
    return this.adminData;
  }
  async getDecodedData(token: string){
    const data = new JwtHelperService().decodeToken(token);
    this.adminData.userId = data.userId;
    this.adminData.name = data.name;
    this.adminData.img_url = data.img_url;
    return;
  }
  getToken(){
     return this.token;
  }
  getAuthStatusListner() {
    return this.authStatusListner.asObservable();
  }
  logout(){
    this.token = null;
    this.authStatusListner.next(false);
  }
}
