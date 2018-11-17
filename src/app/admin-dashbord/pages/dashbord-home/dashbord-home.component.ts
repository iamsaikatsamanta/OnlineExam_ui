import { Component, OnInit } from '@angular/core';
import {UserQuestionService} from '../../../service/User/user-question.service';

@Component({
  selector: 'app-dashbord-home',
  templateUrl: './dashbord-home.component.html',
  styleUrls: ['./dashbord-home.component.css']
})
export class DashbordHomeComponent implements OnInit {

  constructor(private userQ: UserQuestionService) { }

  ngOnInit() {
  }

}
