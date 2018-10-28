import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-submit-coding',
  templateUrl: './submit-coding.component.html',
  styleUrls: ['./submit-coding.component.css']
})
export class SubmitCodingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onYes() {
    this.router.navigate(['/user/feedback']);
  }
  onNo() {
    this.router.navigate(['/user/coding-questions']);
  }

}
