import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminAuthService } from './admin-auth.service';
import {UserAuthService} from '../User/user-auth.service';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {
    constructor(private adminAuthService: AdminAuthService , private userAuthService: UserAuthService) {}
    intercept(req: HttpRequest<any>, next) {
        const authToken = this.adminAuthService.getToken();
        const userToken = this.userAuthService.getToken();
        let authReq;
        if (req.url.includes('/user')) {
           authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + userToken)
          });
        } else {
           authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
          });
        }
        return next.handle(authReq);
    }
}
