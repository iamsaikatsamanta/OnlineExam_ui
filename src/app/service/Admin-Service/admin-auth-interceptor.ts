import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminAuthService } from './admin-auth.service';
import {UserAuthService} from '../User/user-auth.service';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {
    constructor(private adminAuthService: AdminAuthService , private userAuthService: UserAuthService) {}
    intercept(req: HttpRequest<any>, next) {
        const authToken = this.adminAuthService.getToken();
        const userAuthToken = this.userAuthService.getToken();
        const authReq = req.clone({
          // setHeaders: {
          //   'Authorization', 'Bearer ' + authToken,
          //   'user_Authorization', 'Bearer ' + userAuthToken
          // }
          headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });
        return next.handle(authReq);
    }
}
