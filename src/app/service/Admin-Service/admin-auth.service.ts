import { Injectable } from '@angular/core';
import {AdminModel} from '../../model/admin-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private adminData: any = {
    userId: String,
    name: String,
    img_url: String
  };
  constructor(private http: HttpClient, private router: Router) { }
  onLogin(adminData: AdminModel) {
    this.http.post<{adminToken: string}>('http://localhost:3000/api/adminAuth/login', adminData)
      .subscribe(res => {
        this.getDecodedData(res.adminToken);      
        this.router.navigate(['/admin-dashboard/home']);
      });
  }
  getAdminData(){
    return this.adminData;
  }
  getDecodedData(token: string){
    const data = new JwtHelperService().decodeToken(token);
    this.adminData.userId = data.userId;
    this.adminData.name = data.name;
    this.adminData.img_url = data.img_url;
  }
}
