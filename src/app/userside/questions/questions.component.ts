import {Component, OnDestroy, OnInit} from '@angular/core';


import {Router} from '@angular/router';
import {UserQuestionService} from '../../service/User/user-question.service';
import {UserQuestionModel} from '../../model/user-question-model';
import {Subscription} from 'rxjs';
import {AnswerService} from '../../service/User/answer.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  questions: UserQuestionModel [];
  private no_q_ans = 0;
  min;
  sec;
  activeQuestion = 0;
  isLoading = true;
  private questionSub: Subscription;
  constructor(private userQuestionService: UserQuestionService, private router: Router, private answerService: AnswerService) { }

  async ngOnInit() {
    this.questionSub = await this.userQuestionService.getQuestion()
      .pipe(map(questionData => {
          return questionData.result.map(question => {
            return {
              id: question.id,
              question: question.question,
              option: question.option,
              selected: null,
              saved: false
            };
          });
        }))
        .subscribe(response => {
          this.questions = response;
        }, err => {
          console.log(err);
        }, () => {
          this.isLoading = false;
          this.startTimer();
        });
  }
  startTimer() {
    let time = this.userQuestionService.checkTImer();
    this.min = Math.floor(time / 60);
    this.sec = time % 60;
    setInterval( () => {
      time--;
      this.min = Math.floor(time / 60);
      this.sec = time % 60;
      if (time <= 0) {
        this.router.navigate(['/user/coding-questions']);
      }
    }, 1000);
  }
  onNext() {
    if (this.questions[this.activeQuestion].saved === false && this.questions[this.activeQuestion].selected !== null) {
      this.questions[this.activeQuestion].selected = null;
    }
    if (this.questions[this.activeQuestion].selected !== null) {
      this.no_q_ans ++;
      if (this.no_q_ans === this.questions.length) {
        console.log('onNext');
        this.submit();
        return;
      }
    }
    this.setActiveQuestion(undefined);
  }
  onSaveNext() {
    console.log('onSave');
    this.answerService.saveAnswer(this.questions[this.activeQuestion].option[this.questions[this.activeQuestion].selected], this.questions[this.activeQuestion].id);
    this.questions[this.activeQuestion].saved = true;
    this.onNext();
  }
  submit() {
    console.log('on Submit');
    this.router.navigate(['/user/submit-question']);
  }
  setActiveQuestion(index) {
    if (index === undefined) {
      let breakOut = false;
      while (!breakOut) {
        this.activeQuestion = this.activeQuestion < this.questions.length - 1 ? ++this.activeQuestion : 0;
        if (this.questions[this.activeQuestion].selected === null) {
          breakOut = true;
        }
      }
    } else if (this.questions[index].saved === true) {
      this.setActiveQuestion(++index);
    } else {
      this.activeQuestion = index;
    }
  }
  selectAns(i) {
    this.questions[this.activeQuestion].selected = i;
  }
  ngOnDestroy() {
    this.questionSub.unsubscribe();
  }
}
