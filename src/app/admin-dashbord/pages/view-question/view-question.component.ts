import { Component, OnInit } from '@angular/core';
import {QuestionModel} from '../../../model/questionModel';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  private show = false;
  question: QuestionModel[] = [
    {question: 'What do You do', option: ['Programming', 'Paying', 'Singing', 'Social Media'], correct: 'Programming'}
  ];
  constructor() { }

  ngOnInit() {
  }
  onGetQuestion(event: Event) {
    const s = (<HTMLInputElement>event.target).value;
    console.log(s);
    this.show = true;
  }

}
