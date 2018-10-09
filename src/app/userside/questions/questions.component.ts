import { Component, OnInit } from '@angular/core';
import {QuestionModel} from '../../model/questionModel';
import {QuestionService} from '../../service/question.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: QuestionModel = {question: 'What do You Do', option: [ 'Programming', 'Playing', 'Watching TV', 'Working'], correct: 'Programming'};
  min;
  sec;
  constructor(private questionService: QuestionService, private router: Router) { }

  ngOnInit() {
    this.startTimer();

  }
  startTimer() {
    let time = this.questionService.getTime();
    this.min = Math.floor(time / 60);
    this.sec = time % 60;
    setInterval( () => {
      time--;
      this.min = Math.floor(time / 60);
      this.sec = time % 60;
      if (time === 0) {
        this.router.navigate(['/user/coding-questions']);
      }
    }, 1000);
  }

}
