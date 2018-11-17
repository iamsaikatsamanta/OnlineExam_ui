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
  timeCodingQuestion = 60;
  questions:  UserQuestionModel[];
  private updateQuestionListner = new Subject<UserQuestionModel[]>();
  codingQuestion:  UserCodingQuestionModel[];
  private updateCodingQuestionListner = new Subject<UserCodingQuestionModel[]>();
  constructor(private http: HttpClient) { }

  getQuestion() {
    this.http.get<{ message: string, questions: any }>('http://localhost:3000/api/user/getquestion/regular')
      .pipe(map(questionData => {
        return questionData.questions.map(question => {
          return {
            id: question.id,
            question: question.question,
            option: question.option,
            selected: null,
            saved: false
          };
        });
      }))
      .subscribe(response => {
        this.questions = response;
        this.updateQuestionListner.next([...this.questions]);
      });
  }
  getQuestionUpdateListner() {
    return this.updateQuestionListner.asObservable();
  }
  getCodingQuestion() {
    this.http.get<{message: string, codingQuestions: any}>('http://localhost:3000/api/user/getquestion/coding')
      .pipe(map(codingData => {
        return codingData.codingQuestions.map(codingQuestion => {
          return {
            id: codingQuestion.id,
            question: codingQuestion.question,
            saved: false
          };
        });
      }))
      .subscribe(response => {
      console.log(response);
      this.codingQuestion = response;
      this.updateCodingQuestionListner.next([...this.codingQuestion]);
    });
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
    if (this.timeCodingQuestion === 60) {
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
  onCodeCompile(code: {lang: string, code: string}) {
    console.log(code);
    return 'Compile Successfully';
  }
  onCodeRun(code: {lang: string, code: string}) {
    console.log(code);
    return [
      { input: '25', status: 'Fail'},
      { input: 'saikat', status: 'Success'}
      ];
  }
}

