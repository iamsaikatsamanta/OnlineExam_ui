import { HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { AdminAuthService } from './admin-auth.service';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {
    constructor(private adminAuthService: AdminAuthService){}
    intercept(req: HttpRequest<any>, next) {
        const authToken = this.adminAuthService.getToken();
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer '+ authToken)
        });
        return next.handle(authReq);
    }
}