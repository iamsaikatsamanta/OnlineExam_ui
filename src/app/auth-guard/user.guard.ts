import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {UserAuthService} from '../service/User/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  private isUserAuth = false;
  constructor(private userAuthService: UserAuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.isUserAuth = this.userAuthService.getExamAuthStatusListner();
    if (!this.isUserAuth) {
      this.router.navigate(['/exam-login']);
    }
    return this.isUserAuth;
  }
}
