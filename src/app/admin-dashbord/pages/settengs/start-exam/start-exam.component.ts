import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminOtherService} from '../../../../service/Admin-Service/admin-other.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start-exam',
  templateUrl: './start-exam.component.html',
  styleUrls: ['./start-exam.component.css']
})
export class StartExamComponent implements OnInit {
  showError = false;
  ErrorMessage = 'Range of Regular Question is 1-30 & Range of Coding Question is 1-10'
  no_of_round = [1, 2];
  rounds = ['Regular', 'Coding'];
  no_of_r;
  round1;
  round2;
  examForm = new FormGroup({
    no_of_rounds: new FormControl(null, Validators.required),
    round1: new FormControl(null, Validators.required),
    questionr1: new FormControl(null),
    round2: new FormControl(null, Validators.required),
    questionr2: new FormControl(null)
  });
  constructor(private adminOtherService: AdminOtherService, private router: Router) { }

  ngOnInit() {

  }
  onSubmit() {
    if (this.examForm.invalid) {
      this.showError = true;
    } else if (this.round1 === this.round2) {
      this.showError = true;
      this.ErrorMessage = 'Both Round Can\'t Be Same';
    } else {
      const exam = {
        no_of_rounds: this.examForm.get('no_of_rounds').value,
        round1: this.examForm.get('round1').value,
        questionr1: this.examForm.get('questionr1').value,
        round2: this.examForm.get('round2').value,
        questionr2: this.examForm.get('questionr2').value
      };
      this.adminOtherService.setExamDetails(exam);
      this.router.navigate(['/admin-dashboard/settings']);
    }
  }
  getRound() {
    this.no_of_r = this.examForm.get('no_of_rounds').value;
    if (this.no_of_r === '1') {
      this.examForm.controls['round2'].disable();
      this.examForm.controls['questionr2'].disable();
    } else {
      this.examForm.controls['round2'].enable();
      this.examForm.controls['questionr2'].enable();
    }
  }
  onRound1() {
    this.round1 = this.examForm.get('round1').value;
    if (this.round1 === 'Regular') {
      this.examForm.controls['questionr1'].setValidators([ Validators.required, Validators.min(1), Validators.max(30)]);
      this.examForm.controls['questionr1'].updateValueAndValidity();
    } else  {
      this.examForm.controls['questionr1'].setValidators([ Validators.required, Validators.min(1), Validators.max(10)]);
      this.examForm.controls['questionr1'].updateValueAndValidity();
    }
  }
  onRound2() {
    this.round2 = this.examForm.get('round2').value;
    if (this.round2 === 'Regular') {
      this.examForm.controls['questionr2'].setValidators([ Validators.required, Validators.min(1), Validators.max(30)]);
      this.examForm.controls['questionr2'].updateValueAndValidity();
    } else  {
      this.examForm.controls['questionr2'].setValidators([ Validators.required, Validators.min(1), Validators.max(10)]);
      this.examForm.controls['questionr2'].updateValueAndValidity();
    }
  }
}
