import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionModel} from '../../../model/questionModel';
import {AdminQuestionService} from '../../../service/Admin-Service/admin-question.service';
import {CodingQuestionModel} from '../../../model/coding-question-model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit, OnDestroy {

  showRegular = false;
  showCoding = false;
  type: string;
  question: QuestionModel[];
  codingQuestion: CodingQuestionModel[] = [];
  private questionSub: Subscription;
  private codingQuestionSub: Subscription;
  constructor(private adminQuestionService: AdminQuestionService) { }

  ngOnInit() {
    this.onGetQuestion();
  }
  onGetQuestion() {
    if (this.type) {
      if (this.type === 'Regular') {
        this.adminQuestionService.getQuestions();
        this.questionSub = this.adminQuestionService.getQuestionUpdateListen()
          .subscribe((question: QuestionModel[]) => {
            this.question = question;
            this.showRegular = true;
            this.showCoding = false;
        });
      } else {
        this.adminQuestionService.getCodingQuestions();
        this.codingQuestionSub = this.adminQuestionService.getCodingQuestionUpdateListner()
        .subscribe((codingQuestion: CodingQuestionModel[]) => {
          this.codingQuestion = codingQuestion;
          this.showCoding = true;
          this.showRegular = false;
        });
      }
    }
  }
  onSelectType(event: Event) {
    this.type = (<HTMLInputElement>event.target).value;
    if (this.type === 'Choose One') {
      this.type = null;
    }
  }
  onDelete(id: string) {
    if (this.type === 'Regular') {
      this.adminQuestionService.deleteQuestion({id: id}, this.type);
    }
  }
  ngOnDestroy() {
    if (this.questionSub) {
      this.questionSub.unsubscribe();
    } else if (this.codingQuestionSub) {
      this.codingQuestionSub.unsubscribe();
    }
  }
}
