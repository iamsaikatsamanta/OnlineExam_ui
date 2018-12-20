import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserCodingQuestionModel} from '../../model/user-coding-question-model';
import {UserQuestionService} from '../../service/User/user-question.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AnswerService} from '../../service/User/answer.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-coding-questions',
  templateUrl: './coding-questions.component.html',
  styleUrls: ['./coding-questions.component.css']
})
export class CodingQuestionsComponent implements OnInit, OnDestroy {
  showCompile = false;
  showRun = false;
  compileMessage;
  runStatus ;
  activeQuestion = 0;
  no_q_ans = 0;
  codingQuestions: UserCodingQuestionModel[];
  isLoading = true;
  min;
  sec;
  codingForm = new FormGroup({
    lang: new FormControl(null, Validators.required),
    code: new FormControl(null, Validators.required)
  });

  constructor(private userQuestionService: UserQuestionService, private router: Router, private answerService: AnswerService) { }

  async ngOnInit() {
    await this.userQuestionService.getCodingQuestion()
      .pipe(map(codingData => {
        return codingData.codingQuestions.map(codingQuestion => {
          return {
            id: codingQuestion.id,
            question: codingQuestion.question,
            saved: false
          };
        });
      }))
      .subscribe(response => {
        console.log(response);
        this.codingQuestions = response;
      }, err => {
        console.log(err);
      }, () => {
        this.isLoading = false;
        this.startTimer();
      });
  }
  startTimer() {
    let time = this.userQuestionService.checkCodingTImer();
    this.min = Math.floor(time / 60);
    this.sec = time % 60;
    setInterval( () => {
      time--;
      this.min = Math.floor(time / 60);
      this.sec = time % 60;
      if (time <= 0) {
        this.router.navigate(['/user/feedback']);
      }
    }, 1000);
  }
  onCompile() {
    this.showRun = false;
    const code = { lang: this.codingForm.get('lang').value,
      code: this.codingForm.get('code').value
    };
    this.answerService.onCodingCompile(code, this.codingQuestions[this.activeQuestion].id);
    this.showCompile = true;
  }
  onRun() {
    this.showCompile = false;
    this.codingQuestions[this.activeQuestion].saved = true;
    const code = { lang: this.codingForm.get('lang').value,
      code: this.codingForm.get('code').value
    };
    this.showRun = true;
  }
  onNext() {
    this.showRun = false;
    this.showCompile = false;
    if (this.codingQuestions[this.activeQuestion].saved === true) {
      this.no_q_ans ++;
      if (this.no_q_ans === this.codingQuestions.length) {
        this.submit();
        return;
      }
    }
    this.setActiveQuestion(undefined);
  }
  setActiveQuestion(index) {
    if (index === undefined) {
      let breakOut = false;
      while (!breakOut) {
        this.activeQuestion = this.activeQuestion < this.codingQuestions.length - 1 ? ++this.activeQuestion : 0;
        if (this.codingQuestions[this.activeQuestion].saved === false) {
          breakOut = true;
        }
      }
    } else if (this.codingQuestions[index].saved === true) {
      this.setActiveQuestion(++index);
    } else {
      this.activeQuestion = index;
    }
  }
  submit() {
    this.router.navigate(['/user/submit-coding']);
  }
  ngOnDestroy() {
  }
}
