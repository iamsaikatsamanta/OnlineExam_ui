import { Injectable } from '@angular/core';
import {QuestionModel} from '../../model/questionModel';
import {CodingQuestionModel} from '../../model/coding-question-model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminQuestionService {
  question: QuestionModel[];
  codingQuestion: CodingQuestionModel[];
  constructor(private http: HttpClient, private adminAuthService: AdminAuthService) {}
  private questionUpdated = new Subject<QuestionModel[]>();
  private coidingQuestionUpdated = new Subject<CodingQuestionModel[]>();
  saveQuestion(question: QuestionModel) {
    this.http.post<{message: string, questionId: string}>('http://localhost:3000/api/admin/savequestion', question)
    .subscribe(res => {
      question.id = res.questionId;
      this.question.push(question);
      this.questionUpdated.next([...this.question]);
      return res.message;
    });
  }
  saveCodingQuestion(codeQuestion: CodingQuestionModel) {
    this.http.post<{message: string, questionId: string}>('http://localhost:3000/api/admin/savecodingquestion', codeQuestion)
    .subscribe(res => {
      codeQuestion.id = res.questionId;
      this.codingQuestion.push(codeQuestion);
      this.coidingQuestionUpdated.next([...this.codingQuestion]);
    });
  }
  getQuestions() {
    this.http.get<{ message: string; questions: any }>('http://localhost:3000/api/admin/getquestion').pipe(map(questionData => {
      return questionData.questions.map(question => {
        return {
          id: question._id,
          question: question.question,
          option: question.option,
          correct: question.correct
        };
      });
    }))
      .subscribe(response => {
        this.question = response;
        this.questionUpdated.next([...this.question]);
    });
  }
  getCodingQuestions() {
    this.http.get<{message: string, codingQuestion: any}> ('http://localhost:3000/api/admin/getcodingquestion')
    .pipe(map(codingQuestionData => {
      return codingQuestionData.codingQuestion.map(codingQuestion => {
        return {
          id: codingQuestion._id,
          question: codingQuestion.question,
          inputtc1: codingQuestion.inputtc1,
          outputtc1: codingQuestion.outputtc1,
          inputtc2: codingQuestion.inputtc2,
          outputtc2: codingQuestion.outputtc2,
        };
      });
    }))
    .subscribe(res => {
      this.codingQuestion = res;
      this.coidingQuestionUpdated.next([...this.codingQuestion]);
    });
  }
  getQuestion(questionId: string) {
    return {...this.question.find(p => p.id === questionId)};
  }
  getCodingQuestion(codeingQuestionId: string) {
    return {...this.codingQuestion.find(qc => qc.id === codeingQuestionId)};
  }
  updateQuestion(question: QuestionModel) {
    console.log(question);
  }
  updateCodingQuestion(codeQuestion: CodingQuestionModel) {
    console.log(codeQuestion);
  }
  getQuestionUpdateListen() {
    return this.questionUpdated.asObservable();
  }
  getCodingQuestionUpdateListner() {
    return this.coidingQuestionUpdated.asObservable();
  }
}
