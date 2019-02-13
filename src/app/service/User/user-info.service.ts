import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RestApi} from '../../model/RestApi';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getCountry() {
    return this.http.get<RestApi>(this.apiUrl + 'get-country');
  }
  getState(id) {
    return this.http.get<RestApi>(this.apiUrl + `get-state/${id}`);
  }
  getCity(id) {
    return this.http.get<RestApi>(this.apiUrl + `get-city/${id}`);
  }
  getCollege() {
    return this.http.get<RestApi>(this.apiUrl + 'get-college');
  }
  fileUpload(file) {
    return this.http.post<RestApi>(this.apiUrl + 'file-upload', file);
  }
  fillForm (data) {
    return this.http.post<RestApi>(this.apiUrl + 'user/fill-form', data);
  }
  getUserInfo() {
    return this.http.get<RestApi>(this.apiUrl + 'user/get-user-info');
  }
  applyForExam () {
    return this.http.get<RestApi>(this.apiUrl + 'user/apply-for-exam');
  }
  getUserDetails () {
    return this.http.get<RestApi>(this.apiUrl + 'user/get-user-details');
  }
  updateDetails(data) {
    return this.http.post<RestApi>(this.apiUrl + 'user/update-user-info' , data);
  }
}
