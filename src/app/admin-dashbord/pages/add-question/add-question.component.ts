import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionModel} from '../../../model/questionModel';
import {AdminQuestionService} from '../../../service/Admin-Service/admin-question.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  op1 = true;
  op2 = true;
  op3 = true;
  op4 = true;
  addQusestion;
  type = '';
  private mode = 'create';
  private questionId: string;
  private  question:any;
  constructor(private adminQuestionService: AdminQuestionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('qid')) {
        this.mode = 'edit';
        this.questionId = paramMap.get('qid');
        this.question = this.adminQuestionService.getQuestion(this.questionId);
        this.type =  this.question.type;
        this.selectType();
        if (this.question.type === 'MC') {
        this.addQusestion.patchValue({
          question: this.question.question,
          option1: this.question.option[0],
          option2: this.question.option[1],
          option3: this.question.option[2],
          option4: this.question.option[3],
          correct: this.question.correct
        });
      } else if(this.question.type === 'FUB') {
        this.type = 'FUB';
        this.addQusestion.patchValue({
          question: this.question.question,
          correct: this.question.correct
        });
      }
      } else {
        this.mode = 'create';
        this.questionId = null;
      }
    });
  }
  onOption1() {
    this.op2 = this.op3 = this.op4 = false;
    this.addQusestion.patchValue({
      correct: this.addQusestion.get('option1').value
    });
  }
  onOption2() {
    this.op1 = this.op3 = this.op4 = false;
    this.addQusestion.patchValue({
      correct: this.addQusestion.get('option2').value
    });
  }
  onOption3() {
    this.op1 = this.op2 = this.op4 = false;
    this.addQusestion.patchValue({
      correct: this.addQusestion.get('option3').value
    });
  }
  onOption4() {
    this.op1 = this.op2 = this.op3 = false;
    this.addQusestion.patchValue({
      correct: this.addQusestion.get('option4').value
    });
  }
  onSubmit() {
      if (this.addQusestion.valid)  {
        if(this.type === 'MC') {
        const question = {
          id: null,
          question: this.addQusestion.get('question').value,
          option: [
            this.addQusestion.get('option1').value,
            this.addQusestion.get('option2').value,
            this.addQusestion.get('option3').value,
            this.addQusestion.get('option4').value,
          ],
          correct: this.addQusestion.get('correct').value,
          type: 'MC'
        };
        if (this.mode === 'create') {
          this.adminQuestionService.saveQuestion(question);
        } else if (this.mode === 'edit') {
          question.id = this.questionId;
          this.adminQuestionService.updateQuestion(question);
        }
      } else if(this.type === 'FUB') {
        const question = {
          id: null,
          question: this.addQusestion.get('question').value,
          correct: this.addQusestion.get('correct').value,
          type: 'FUB'
        };
        if (this.mode === 'create') {
          this.adminQuestionService.saveQuestion(question);
        } else if (this.mode === 'edit') {
          question.id = this.questionId;
          this.adminQuestionService.updateQuestion(question);
        }
      } 
    } 
    this.onReset();
  }
  onReset() {
    this.addQusestion.reset();
    this.op1 = this.op2 = this.op3 = this.op4 = true;
  }
  selectType () {
    if (this.type === 'MC') {
      this.addQusestion  = new FormGroup({
        question: new FormControl(null, Validators.required),
        option1: new FormControl(null, Validators.required),
        option2: new FormControl(null, Validators.required),
        option3: new FormControl(null, Validators.required),
        option4: new FormControl(null, Validators.required),
        correct: new FormControl(null, Validators.required)
      });
    } else if(this.type === 'FUB') {
      this.addQusestion = new FormGroup({
        question: new FormControl(null, Validators.required),
        correct: new FormControl(null, Validators.required)
      });
    }
  }
}
