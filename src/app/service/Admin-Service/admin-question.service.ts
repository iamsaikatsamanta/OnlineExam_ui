import { Injectable } from '@angular/core';
import {QuestionModel} from '../../model/questionModel';
import {CodingQuestionModel} from '../../model/coding-question-model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject, from} from 'rxjs';
import { AdminAuthService } from './admin-auth.service';
import { environment } from 'src/environments/environment';
import { RestApi } from '../../model/RestApi';
import { ToasterService } from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class AdminQuestionService {
  apiUrl = environment.apiUrl;
  question: QuestionModel[];
  codingQuestion: CodingQuestionModel[];
  constructor(private http: HttpClient, private adminAuthService: AdminAuthService, private toasterService: ToasterService) {}
  private questionUpdated = new Subject<QuestionModel[]>();
  private coidingQuestionUpdated = new Subject<CodingQuestionModel[]>();
  saveQuestion(question) {
    this.http.post<RestApi>(this.apiUrl + 'admin/savequestion', question)
    .subscribe(res => {
      if (res.code === 0) {
        question.id = res.result._id;
        this.question.push(question);
        this.questionUpdated.next([...this.question]);
        this.toasterService.pop('success', 'Question Added Successfully');
      }
    });
  }
  saveCodingQuestion(codeQuestion: CodingQuestionModel) {
    this.http.post<RestApi>(this.apiUrl + 'admin/savecodingquestion', codeQuestion)
    .subscribe(res => {
      if (res.code === 0) {
        codeQuestion.id = res.result._id;
        this.codingQuestion.push(codeQuestion);
        this.coidingQuestionUpdated.next([...this.codingQuestion]);
        this.toasterService.pop('success', 'Coding Question Added Successfully');
      }
    });
  }
  getQuestions() {
    this.http.get<RestApi>(this.apiUrl + 'admin/getquestions')
      .subscribe(response => {
        if (response.code === 0) {
          this.question = response.result.map(ele => {
            return {
              id: ele._id,
              question: ele.question,
              option: ele.option,
              correct: ele.correct,
              type: ele.type
            };
          });
        }
        this.questionUpdated.next([...this.question]);
    });
  }
  getCodingQuestions() {
    this.http.get<RestApi> (this.apiUrl + 'admin/getcodingquestions')
    .subscribe(res => {
      if (res.code === 0) {
        this.codingQuestion = res.result.map(ele => {
          return {
            id: ele._id,
            question: ele.question,
            inputtc1: ele.input[0],
            outputtc1: ele.output[0],
            inputtc2: ele.input[1],
            outputtc2: ele.output[1],
          };
        });
      }
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
    this.http.post<RestApi>(this.apiUrl + 'admin/updatequestion/' + question.id, question)
      .subscribe(result => {
        if (result.code === 0) {
          this.toasterService.pop('success', 'Question Updated Successfully');
        }
      });
  }
  updateCodingQuestion(codeQuestion: CodingQuestionModel) {
    this.http.post<RestApi>(this.apiUrl + 'admin/updatecodequestion/' + codeQuestion.id, codeQuestion).pipe()
      .subscribe(result => {
        if (result.code === 0) {
          this.toasterService.pop('success', 'Coding Question Updated Successfully');
        }
      });
  }
  deleteQuestion(id: Object, type: string) {
    if (type === 'Coding') {
      this.http.post(this.apiUrl + 'admin/deletecodingquestion', id)
      .subscribe(response => {
        console.log(response);
      });
    } else if (type === 'Regular') {
      this.http.delete(this.apiUrl + 'admin/deletequestion', id)
      .subscribe(response => {
        console.log(response);
      });
    }
  }
  getQuestionUpdateListen() {
    return this.questionUpdated.asObservable();
  }
  getCodingQuestionUpdateListner() {
    return this.coidingQuestionUpdated.asObservable();
  }
}
