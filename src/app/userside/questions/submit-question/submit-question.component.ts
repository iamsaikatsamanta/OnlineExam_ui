import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-submit-question',
  templateUrl: './submit-question.component.html',
  styleUrls: ['./submit-question.component.css']
})
export class SubmitQuestionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onYes() {
    this.router.navigate(['/user/coding-questions']);
  }
  onNo() {
    this.router.navigate(['/user/questions']);
  }
}
