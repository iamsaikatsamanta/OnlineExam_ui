import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserAuthService} from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient, private userAuthService: UserAuthService) { }
  saveAnswer(option, questionId) {
    const options = {
      option: option,
      questionId: questionId,
      userId: this.userAuthService.getUserData().refId
    };
    console.log(options);
    this.http.post('http://localhost:3000/api/user/answer/saveanswer', options)
      .subscribe(result => {
        console.log(result);
      });
  }
  onCodingCompile(code, codingQuestionId) {
    const codeData = {
      code: code.code,
      lang: code.lang,
      codingQuestionId: codingQuestionId,
      userId: this.userAuthService.getUserData().refId
    };
    console.log(codeData);
    this.http.post('http://localhost:3000/api/user/answer/codecompile', codeData)
      .subscribe(result => {
        console.log(result);
      });
  }
  onCodeRun(language, codingQuestionId) {
    const codeData: any = {
      lang: language,
      codingQuestionId: codingQuestionId,
      userId: this.userAuthService.getUserData().refId
    };
    this.http.post('http://localhost:3000/api/user/answer/coderun', codeData).subscribe(result => {
      console.log(result);
    });
  }
}
