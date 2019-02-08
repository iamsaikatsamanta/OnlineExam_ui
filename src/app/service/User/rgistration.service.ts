import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {RestApi} from '../../model/RestApi';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RgistrationService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private toster: ToasterService, private router: Router) { }
  localRegistration(registrationData) {
    this.http.post<RestApi>(this.apiUrl + 'user/register', registrationData)
      .subscribe(resp => {
        if (resp.code === 0) {
          this.toster.pop('success', 'You Have Successfully Registered', 'Login To Continue');
        } else if (resp.code === 5) {
          this.toster.pop('error', 'User Already Exists');
        }
      });
  }
  googleRegistration(registrationData) {
    this.http.post<RestApi>(this.apiUrl + 'user/googlergistration', registrationData)
      .subscribe(resp => {
        if (resp.code === 0) {
          this.toster.pop('success', 'You Have Successfully Registered', 'Login To Continue');
          this.router.navigate(['/']);
        } else if (resp.code === 5) {
          this.toster.pop('error', 'User Already Exists');
        }
      });
  }
  facebookRegistration(registrationData) {
    this.http.post<RestApi>(this.apiUrl + 'user/fbrgistration', registrationData)
      .subscribe(resp => {
        if (resp.code === 0) {
          this.toster.pop('success', 'You Have Successfully Registered', 'Login To Continue');
        } else if (resp.code === 5) {
          this.toster.pop('error', 'User Already Exists');
        }
      });
  }
}
