import { Component, OnInit } from '@angular/core';
import {AdminOtherService} from '../../../service/Admin-Service/admin-other.service';

@Component({
  selector: 'app-review-coding-question',
  templateUrl: './review-coding-question.component.html',
  styleUrls: ['./review-coding-question.component.css']
})
export class ReviewCodingQuestionComponent implements OnInit {
  private isCoding;
  showError = false;
  errorMessage = '';
  constructor(private adminOtherService: AdminOtherService) { }

  ngOnInit() {
    const exam = this.adminOtherService.getExamDetails();
    if (exam.exam_done === null) {
      this.showError = true;
      this.errorMessage = 'There is No Exam Going on Right Now';
    } else if (!exam.exam_done) {
      this.showError = true;
      this.errorMessage = 'The Exam is Not Conducted or Completed Yet';
    } else {
      this.isCoding = exam.round_name.find(p => p === 'Coding');
      if (!this.isCoding) {
        this.showError = true;
        this.errorMessage = 'In This Exam There is No Coding Round';
      }
    }

  }

}
