import { Injectable } from '@angular/core';
import {UserQuestionModel} from '../../model/user-question-model';
import {UserCodingQuestionModel} from '../../model/user-coding-question-model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserQuestionService {
  timeQuestion = 60;
  timeCodingQuestion = 1200;
  codingQuestion:  UserCodingQuestionModel[];
  private updateCodingQuestionListner = new Subject<UserCodingQuestionModel[]>();
  constructor(private http: HttpClient) { }

  getQuestion() {
     return this.http.get<{ message: string, questions: any }>('http://localhost:3000/api/user/getquestion/regular');
  }
  getCodingQuestion() {
    return this.http.get<{message: string, codingQuestions: any}>('http://localhost:3000/api/user/getquestion/coding');
  }
  getCodingQuestionUpdateListner() {
    return this.updateCodingQuestionListner.asObservable();
  }
  checkTImer() {
    if (this.timeQuestion === 60) {
      this.startTimer();
      return this.timeQuestion;
    } else {
      return this.timeQuestion;
    }
  }
  startTimer() {
    let min = Math.floor(this.timeQuestion / 60);
    let sec = this.timeQuestion % 60;
    setInterval( () => {
      this.timeQuestion--;
      min = Math.floor(this.timeQuestion / 60);
      sec = this.timeQuestion % 60;
    }, 1000);
  }
  checkCodingTImer() {
    if (this.timeCodingQuestion === 300) {
      this.startCodingTimer();
      return this.timeCodingQuestion;
    } else {
      return this.timeCodingQuestion;
    }
  }
  startCodingTimer() {
    let min = Math.floor(this.timeQuestion / 60);
    let sec = this.timeCodingQuestion % 60;
    setInterval( () => {
      this.timeCodingQuestion--;
      min = Math.floor(this.timeCodingQuestion / 60);
      sec = this.timeCodingQuestion % 60;
    }, 1000);
  }
}

