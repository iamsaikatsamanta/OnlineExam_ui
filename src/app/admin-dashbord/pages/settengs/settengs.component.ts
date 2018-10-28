import { Component, OnInit } from '@angular/core';
import {AdminOtherService} from '../../../service/Admin-Service/admin-other.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-settengs',
  templateUrl: './settengs.component.html',
  styleUrls: ['./settengs.component.css']
})
export class SettengsComponent implements OnInit {
  showError = false;
  errorMessage = 'No Exam is Going now';
  open_reg = false;
  close_reg = false;
  conduct_exam = false;
  end_exam = false;
  pub_result = false;
  edit_exam = false;
  constructor(private adiminOtherService: AdminOtherService,private router: Router) { }

  ngOnInit() {
    console.log(this.adiminOtherService.getExamDetails());
    if (this.adiminOtherService.getExamDetails().exam_start) {
     if (this.adiminOtherService.getExamDetails().reg_started) {
       this.close_reg = true;
     } else {
       this.open_reg = true;
     }
     if (this.adiminOtherService.getExamDetails().exam_started) {
       this.end_exam = true;
     } else {
       this.conduct_exam = true;
     }
     if (!this.adiminOtherService.getExamDetails().result_pub) {
       this.pub_result = true;
     } else {
       this.pub_result = true;
     }
    }
  }
  startExam() {
    if (this.adiminOtherService.getExamDetails().exam_start) {
      this.showError = true;
      this.errorMessage = 'An Exam is Going On You Can\'t Initiate An Other';
      setInterval(() => {
        this.showError = false;
      } , 5000);
    } else {
      this.router.navigate(['/admin-dashboard/start-exam']);
    }
  }
  openReg() {
    this.adiminOtherService.exam.reg_started = true;
    this.open_reg = false;
    this.close_reg = true;
  }
  closeReg() {
    this.adiminOtherService.exam.reg_started = false;
    this.close_reg = false;
    this.open_reg = true;
  }
  conductExam() {
    this.adiminOtherService.exam.exam_started = true ;
    this.conduct_exam = false;
    this.end_exam = true;
  }
  endExam() {
    this.adiminOtherService.exam.exam_started = false ;
    this.conduct_exam = true;
    this.end_exam = false;
  }
  pubResult() {
    this.adiminOtherService.exam.result_pub = true;
  }
}
