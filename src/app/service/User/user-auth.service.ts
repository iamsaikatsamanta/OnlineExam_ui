import { Injectable } from '@angular/core';
import {UserModel} from '../../model/user-model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private token: string;
  private userData: any = {
    refId: String,
    name: String,
    img_url: String
  };
  constructor(private http: HttpClient, private router: Router) { }
  onUserRegister(userData) {
    this.http.post('http://localhost:3000/api/userAuth/register', userData)
      .subscribe(res => {
        console.log(res);
      });
  }
  onUserLogin(data: UserModel){
    this.http.post<{ token: string }>('http://localhost:3000/api/userAuth/login', data)
      .subscribe(result =>{
        this.token = result.token;
        if (this.token) {
          const expirIn = new JwtHelperService().getTokenExpirationDate(this.token);
          this.getDecodedData(this.token);

          this.router.navigate(['/user/instruction']);
        }
      });
  }
  async getDecodedData(token: string) {
    const data = new JwtHelperService().decodeToken(token);
    this.userData.refId = data.refId;
    this.userData.name = data.name;
    this.userData.img_url = data.img_url;
  }
  getUserData() {
    return this.userData;
  }
}
