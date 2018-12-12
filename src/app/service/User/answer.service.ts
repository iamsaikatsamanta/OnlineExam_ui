import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }
  saveAnswer(option) {
    this.http.post('http://localhost:3000/api/user/saveanswer', option)
      .subscribe(result => {
        console.log(result);
      });
  }
  onCodingCompile(code) {
    this.http.post('http://localhost:3000/api/user/codecompile', code)
      .subscribe(result => {
        console.log(result);
      });
  }
  onCodeRun() {
    this.http.get('http://localhost:3000/api/user/coderun');
  }
}
