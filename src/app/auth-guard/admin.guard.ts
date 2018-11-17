import {Injectable, OnDestroy} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AdminAuthService} from '../service/Admin-Service/admin-auth.service';


@Injectable()
export class AdminGuard implements CanActivate, OnDestroy {
  private authSubs: Subscription;
  private isUserAuth = false;
  constructor(private adminAuthService: AdminAuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.isUserAuth = this.adminAuthService.getAuthStatus();
    this.authSubs = this.adminAuthService.getAuthStatusListner().subscribe(isAuth => {
      this.isUserAuth = isAuth;
    });
    if (!this.isUserAuth) {
      this.router.navigate(['/admin-login']);
    }
    return this.isUserAuth;
  }
  ngOnDestroy(){
    this.authSubs.unsubscribe();
  }
}
