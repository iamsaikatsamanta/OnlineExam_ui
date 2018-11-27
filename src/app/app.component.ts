import {Component, OnInit} from '@angular/core';
import {AdminAuthService} from './service/Admin-Service/admin-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private adminAuthService: AdminAuthService) {}
  ngOnInit() {
    this.adminAuthService.autoAuthUser();
  }
}

