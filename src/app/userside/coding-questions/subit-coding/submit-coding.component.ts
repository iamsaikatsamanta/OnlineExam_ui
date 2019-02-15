import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AnswerService} from '../../../service/User/answer.service';

@Component({
  selector: 'app-submit-coding',
  templateUrl: './submit-coding.component.html',
  styleUrls: ['./submit-coding.component.css']
})
export class SubmitCodingComponent implements OnInit {

  constructor(private router: Router, private answerService: AnswerService) { }

  ngOnInit() {
  }
  onYes() {
    this.answerService.onSubmitCoding();
    this.router.navigate(['/exam/feedback']);
  }
  onNo() {
    this.router.navigate(['/exam/coding-questions']);
  }

}
