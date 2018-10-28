import { Injectable } from '@angular/core';
import {QuestionModel} from '../../model/questionModel';
import {CodingQuestionModel} from '../../model/coding-question-model';

@Injectable({
  providedIn: 'root'
})
export class AdminQuestionService {
  question: QuestionModel[] = [
    {id: '1345', question: 'what Is in My Hand?', option: ['Toy', 'Mobile', 'Torch', 'Lantan'], correct: 'Toy'},
    {id: '1346', question: 'what Is in My Head?', option: ['Cap', 'Mobile', 'Gloves', 'Lantan'], correct: 'Cap'},
    {id: '1347', question: 'what Is in My Leg?', option: ['Moja', 'Pant', 'Torch', 'Lantan'], correct: 'Moja'},
  ];
  codingQuestion: CodingQuestionModel[] = [
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
        '      \'So only the value 17 should be printed to STDOUT\'', inputtc1: '11', outputtc1: '25', inputtc2: '11', outputtc2: '25'},
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
        '      \'So only the value 17 should be printed to STDOUT\'', inputtc1: '12', outputtc1: '2', inputtc2: '11', outputtc2: '12'},
  ];
  constructor() { }
  saveQuestion(question: QuestionModel) {
    console.log(question);
  }
  saveCodingQuestion(codeQuestion: CodingQuestionModel) {
    console.log(codeQuestion);
  }
  getQuestions() {
    return this.question;
  }
  getCodingQuestions() {
    return this.codingQuestion;
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
}
