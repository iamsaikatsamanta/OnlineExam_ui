import { Injectable } from '@angular/core';
import {UserQuestionModel} from '../../model/user-question-model';
import {UserCodingQuestionModel} from '../../model/user-coding-question-model';
import {HttpClient} from '@angular/common/http';

import {Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {RestApi} from '../../model/RestApi';

@Injectable({
  providedIn: 'root'
})
export class UserQuestionService {
  apiUrl = environment.apiUrl;
  timeQuestion = 1200;
  timeCodingQuestion = 1200;
  codingQuestion:  UserCodingQuestionModel[];
  private updateCodingQuestionListner = new Subject<UserCodingQuestionModel[]>();
  constructor(private http: HttpClient) { }

  getQuestion() {
     return this.http.get<RestApi>(this.apiUrl + 'user/get-question/regular');
  }
  getCodingQuestion() {
    return this.http.get<RestApi>(this.apiUrl + 'user/get-question/coding');
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

