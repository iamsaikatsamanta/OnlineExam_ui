import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AnswerService} from '../../../service/User/answer.service';

@Component({
  selector: 'app-submit-question',
  templateUrl: './submit-question.component.html',
  styleUrls: ['./submit-question.component.css']
})
export class SubmitQuestionComponent implements OnInit {

  constructor(private router: Router, private answerService: AnswerService) { }

  ngOnInit() {
  }
  onYes() {
    this.answerService.onSubmitRegular();
    this.router.navigate(['/user/coding-questions']);
  }
  onNo() {
    this.router.navigate(['/user/questions']);
  }
}
