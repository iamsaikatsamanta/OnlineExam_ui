import { Component, OnInit } from '@angular/core';
import {CodingQuestionModel} from '../../model/coding-question-model';

@Component({
  selector: 'app-coding-questions',
  templateUrl: './coding-questions.component.html',
  styleUrls: ['./coding-questions.component.css']
})
export class CodingQuestionsComponent implements OnInit {
  question: CodingQuestionModel = {question: 'corisiderthe below series:\n' +
      '1, 2, 1, 3, 2, 5, 3, 7, 5, 11, 8, 13, 13, 17,\n' +
      '\n' +
      'This series is a mixture of 2 series —all the odd terms in this\n' +
      'series form a Fibonacci series and all the even terms are the\n' +
      'prime numbers in ascending order.\n' +
      '\n' +
      'write a program to find the Nth term in this series.\n' +
      '\n' +
      'The value N in a positive integer that should be read from\n' +
      '57am. The Nth term that is calculated by the program\n' +
      'should be writterl to STDOUT Other than the value of Nth\n' +
      'term , no other characters / string or message should be\n' +
      'written to STDOUT.\n' +
      '\n' +
      'For example, when N:14, the 14th term in the series is 17.\n' +
      'So only the value 17 should be printed to STDOUT', inputtc1: '14', inputtc2: '0', outputtc1: '17', outputtc2: '0'};

  constructor() { }

  ngOnInit() {
  }

}
