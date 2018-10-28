import { Injectable } from '@angular/core';
import {AdminModel} from '../../model/admin-model';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor() { }
  onLogin(adminData: AdminModel) {
    console.log(adminData);
  }
}
