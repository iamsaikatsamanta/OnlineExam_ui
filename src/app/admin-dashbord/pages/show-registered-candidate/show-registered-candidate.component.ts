import { Component, OnInit } from '@angular/core';
import {CandidateModel} from '../../../model/candidateModel';
import {AdminOtherService} from '../../../service/Admin-Service/admin-other.service';

@Component({
  selector: 'app-show-registered-candidate',
  templateUrl: './show-registered-candidate.component.html',
  styleUrls: ['./show-registered-candidate.component.css']
})
export class ShowRegisteredCandidateComponent implements OnInit {
  candidates: any[];
  constructor(private adminOtherService: AdminOtherService) { }

  ngOnInit() {
    console.log(this.adminOtherService.getRegisteredCandidate());
  }

}
