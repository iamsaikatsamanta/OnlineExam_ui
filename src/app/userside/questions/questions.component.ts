import { Component, OnInit } from '@angular/core';
import {QuestionModel} from '../../model/questionModel';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: QuestionModel = {question: 'What do You Do', option: [ 'Programming', 'Playing', 'Watching TV', 'Working'], correct: 'Programming'};
  constructor() { }

  ngOnInit() {
  }

}
