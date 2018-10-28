import { Injectable } from '@angular/core';

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
  constructor() { }
  getRegisteredCandidate() {
    return [
      {refId: 'AKCSIT01', name: 'Saikat', course: 'MCA', year: '3rd', email: 'Saikat@saikat.com', dob: '30/09/1995', phno: '9038989033', image: ''},
      {refId: 'AKCSIT02', name: 'Dhal', course: 'BTECH', year: '3rd', email: 'dhal@dhal.com', dob: '20/05/1997', phno: '9038989033', image: ''},
      {refId: 'AKCSIT03', name: 'Sourav', course: 'MTECH', year: '3rd', email: 'sourav@sourav.com', dob: '3/09/1995', phno: '9038989033', image: ''},
      {refId: 'AKCSIT04', name: 'Dip', course: 'MCA', year: '3rd', email: 'dip@dip.com', dob: '31/01/1995', phno: '9038989033', image: ''},
      {refId: 'AKCSIT05', name: 'Das', course: 'BTECH', year: '3rd', email: 'das@das.com', dob: '12/08/1995', phno: '9038989033', image: ''},
      {refId: 'AKCSIT06', name: 'Kaka', course: 'MCA', year: '3rd', email: 'kaka@kaka.com', dob: '10/09/1996', phno: '9038989033', image: ''}
    ];
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
}
