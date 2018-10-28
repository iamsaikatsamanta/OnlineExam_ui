import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CodingQuestionModel} from '../../../model/coding-question-model';
import {AdminQuestionService} from '../../../service/Admin-Service/admin-question.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-coding-question',
  templateUrl: './coding-question.component.html',
  styleUrls: ['./coding-question.component.css']
})
export class CodingQuestionComponent implements OnInit {

  codingQuestion = new FormGroup(
    {
      codeQuestion: new FormControl(null, Validators.required),
      inputtc1: new FormControl(null, Validators.required),
      outputtc1: new FormControl(null, Validators.required),
      inputtc2: new FormControl(null, Validators.required),
      outputtc2: new FormControl(null, Validators.required)
  });
  private mode = 'create';
  private codingQuestionId;
  private codeQuestion;
constructor(private adminQuestionService: AdminQuestionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('cqid')) {
        this.mode = 'edit';
        this.codingQuestionId = paramMap.get('cqid');
        this.codeQuestion = this.adminQuestionService.getCodingQuestion(this.codingQuestionId);
        this.codingQuestion.patchValue({
          codeQuestion: this.codeQuestion.question,
          inputtc1: this.codeQuestion.outputtc1,
          outputtc1: this.codeQuestion.inputtc1,
          inputtc2: this.codeQuestion.inputtc2,
          outputtc2: this.codeQuestion.outputtc2
        });
      } else {
        this.mode = 'create';
        this.codingQuestionId = null;
      }
    });
  }
  onSave() {
    if (this.codingQuestion.valid) {
      const codeQuestion: CodingQuestionModel = {
        id: null,
        question: this.codingQuestion.get('codeQuestion').value,
        inputtc1: this.codingQuestion.get('inputtc1').value,
        outputtc1: this.codingQuestion.get('outputtc1').value,
        inputtc2: this.codingQuestion.get('inputtc2').value,
        outputtc2: this.codingQuestion.get('outputtc2').value
      };
      if (this.mode === 'create') {
        this.adminQuestionService.saveCodingQuestion(codeQuestion);
      } else if (this.mode === 'edit') {
        codeQuestion.id = this.codingQuestionId;
        this.adminQuestionService.updateCodingQuestion(codeQuestion);
      }
    }
    this.onReset();
  }
  onReset() {
    this.codingQuestion.reset();
  }

}
