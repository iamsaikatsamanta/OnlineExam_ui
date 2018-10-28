import { Component, OnInit } from '@angular/core';
import {AdminOtherService} from '../../../service/Admin-Service/admin-other.service';

@Component({
  selector: 'app-admin-result',
  templateUrl: './admin-result.component.html',
  styleUrls: ['./admin-result.component.css']
})
export class AdminResultComponent implements OnInit {
  showError = false;
  errorMessage = '';
  constructor(private adminOtherService: AdminOtherService) { }

  ngOnInit() {
    const exam = this.adminOtherService.getExamDetails();
    if (exam.result_pub === null) {
      this.showError = true;
      this.errorMessage = 'There is No Exam Going on Right Now';
    } else if (!exam.result_pub) {
      this.showError = true;
      this.errorMessage = 'Result is Not Ready Yet';
    }
  }

}
