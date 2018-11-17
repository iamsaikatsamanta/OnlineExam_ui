import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/service/Admin-Service/admin-auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  adminImgurl;
  constructor(private adminAuthService: AdminAuthService){}
  ngOnInit() {
    const adminData = this.adminAuthService.getAdminData();
    this.adminImgurl = adminData.img_url;
  }
}
