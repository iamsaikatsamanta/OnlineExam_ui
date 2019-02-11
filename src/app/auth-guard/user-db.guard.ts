import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../service/User/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserDbGuard implements CanActivate {
  isUserAuth = false;
  constructor(private userAuthService: UserAuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.isUserAuth = this.userAuthService.getAuthStatus();
      if (!this.isUserAuth) {
        this.router.navigate(['/candidate-login']);
      }
      return this.isUserAuth;
  }
}
