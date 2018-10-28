import { Injectable } from '@angular/core';
import {UserQuestionModel} from '../../model/user-question-model';
import {UserCodingQuestionModel} from '../../model/user-coding-question-model';

@Injectable({
  providedIn: 'root'
})
export class UserQuestionService {
  timeQuestion = 60;
  timeCodingQuestion = 60;
  question:  UserQuestionModel[] = [
    {id: '1345', question: 'what Is in My Hand?', option: ['Toy', 'Mobile', 'Torch', 'Lantan'], selected: null, saved: false},
    {id: '1346', question: 'what Is in My Head?', option: ['Cap', 'Mobile', 'Gloves', 'Lantan'], selected: null, saved: false},
    {id: '1347', question: 'what Is in My Leg?', option: ['Moja', 'Pant', 'Torch', 'Lantan'], selected: null, saved: false},
  ];
  codingQuestion:  UserCodingQuestionModel[] = [
    {
      id: '123',
      question: 'question: \'Consider The following series:\n\' +\n' +
        '      \'1, 2, 1, 3, 2, 5, 3, 7, 5, 11, 8, 13, 13, 17,\\n\' +\n' +
        '      \'\\n\' +\n' +
        '      \'This series is a mixture of 2 series —all the odd terms in this\\n\' +\n' +
        '      \'series form a Fibonacci series and all the even terms are the\\n\' +\n' +
        '      \'prime numbers in ascending order.\\n\' +\n' +
        '      \'\\n\' +\n' +
        '      \'write a program to find the Nth term in this series.\\n\' +\n' +
        '      \'\\n\' +\n' +
        '      \'The value N in a positive integer that should be read from\\n\' +\n' +
        '      \'57am. The Nth term that is calculated by the program\\n\' +\n' +
        '      \'should be writterl to STDOUT Other than the value of Nth\\n\' +\n' +
        '      \'term , no other characters / string or message should be\\n\' +\n' +
        '      \'written to STDOUT.\\n\' +\n' +
        '      \'\\n\' +\n' +
        '      \'For example, when N:14, the 14th term in the series is 17.\\n\' +\n' +
        '      \'So only the value 17 should be printed to STDOUT\'',
      inputtc1: '11',
      outputtc1: '25',
      inputtc2: '11',
      outputtc2: '25',
      saved: false
    },
    {
      id: '123',
      question: 'question: \'Consider The following series:\\n\' +\n' +
        '      \'1, 2, 1, 3, 2, 5, 3, 7, 5, 11, 8, 13, 13, 17,\\n\' +\n' +
        '      \'\\n\' +\n' +
        '      \'This series is a mixture of 2 series —all the odd terms in this\\n\' +\n' +
        '      \'series form a Fibonacci series and all the even terms are the\\n\' +\n' +
        '      \'prime numbers in ascending order.\\n\' +\n' +
        '      \'\\n\' +\n' +
        '      \'write a program to find the Nth term in this series.\\n\' +\n' +
        '      \'\\n\' +\n' +
        '      \'The value N in a positive integer that should be read from\\n\' +\n' +
        '      \'57am. The Nth term that is calculated by the program\\n\' +\n' +
        '      \'should be writterl to STDOUT Other than the value of Nth\\n\' +\n' +
        '      \'term , no other characters / string or message should be\\n\' +\n' +
        '      \'written to STDOUT.\\n\' +\n' +
        '      \'\\n\' +\n' +
        '      \'For example, when N:14, the 14th term in the series is 17.\\n\' +\n' +
        '      \'So only the value 17 should be printed to STDOUT\'', inputtc1: '12', outputtc1: '2', inputtc2: '11', outputtc2: '12', saved: false},
  ];
  constructor() { }
  getQuestion() {
    return this.question;
  }
  getCodingQuestion() {
    return this.codingQuestion;
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

