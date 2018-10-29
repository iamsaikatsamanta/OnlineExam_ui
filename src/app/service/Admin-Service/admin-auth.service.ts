import { Injectable } from '@angular/core';
import {AdminModel} from '../../model/admin-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private http: HttpClient) { }
  onLogin(adminData: AdminModel) {
    this.http.post('http://localhost:3000/api/adminAuth/login', adminData)
      .subscribe(res => {
        console.log(res);
      });
  }
}
