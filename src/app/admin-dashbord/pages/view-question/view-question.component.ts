import { Component, OnInit } from '@angular/core';
import {QuestionModel} from '../../../model/questionModel';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminQuestionService} from '../../../service/Admin-Service/admin-question.service';
import {CodingQuestionModel} from '../../../model/coding-question-model';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  showRegular = false;
  showCoding = false;
  type;
  question: QuestionModel[];
  codingQuestion: CodingQuestionModel[] = [];
  constructor(private adminQuestionService: AdminQuestionService) { }

  ngOnInit() {
  }
  onGetQuestion() {
    if (this.type) {
      if (this.type === 'Regular') {
        this.question = this.adminQuestionService.getQuestions();
        this.showRegular = true;
        this.showCoding = false;
        console.log(this.question);
      } else {
        this.showCoding = true;
        this.showRegular = false;
        this.codingQuestion = this.adminQuestionService.getCodingQuestions();
        console.log(this.codingQuestion);
      }
    }
  }
  onSelectType(event: Event) {
    this.type = (<HTMLInputElement>event.target).value;
    if (this.type === 'Choose One') {
      this.type = null;
    }
    console.log(this.type);
  }
}
