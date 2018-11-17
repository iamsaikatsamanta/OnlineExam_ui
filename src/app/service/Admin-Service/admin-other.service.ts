import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminOtherService {
   exam = {
    exam_start: false,
    reg_started: null,
    exam_started: null,
    result_pub: null,
    exam_done: null,
    no_of_round: null,
    round_name: [],
    num_of_ques: null,
    num_of_coding_ques: null
  };
  private candidate: any[];
  private candidateUpdated = new Subject<any>();
  constructor(private http: HttpClient) { }
  getRegisteredCandidate() {
    this.http.get<{message: string, candidate: any[]}>('http://localhost:3000/api/admin/registeredCandidate')
    .subscribe(candidateData => {
      this.candidate = candidateData.candidate;
      this.candidateUpdated.next([...this.candidate]);
      console.log(this.candidate);
    });
  }
  getExamDetails() {
    return this.exam;
  }
  setExamDetails(exam) {
    this.exam.exam_start = true;
    this.exam.reg_started = false;
    this.exam.exam_started = false;
    this.exam.exam_done = false;
    this.exam.result_pub = false;
    this.exam.no_of_round = exam.no_of_rounds;
    this.exam.round_name = [exam.round1, exam.round2];
    this.exam.num_of_ques = exam.questionr1;
    this.exam.num_of_coding_ques = exam.questionr2;
    console.log(this.exam);
  }
  getCandidateUpdateListner() {
    return this.candidateUpdated.asObservable();
  }
}
