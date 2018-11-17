import {Component, OnDestroy, OnInit} from '@angular/core';
import {CandidateModel} from '../../../model/candidateModel';
import {AdminOtherService} from '../../../service/Admin-Service/admin-other.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-show-registered-candidate',
  templateUrl: './show-registered-candidate.component.html',
  styleUrls: ['./show-registered-candidate.component.css']
})
export class ShowRegisteredCandidateComponent implements OnInit, OnDestroy {
  candidates: any[];
  private candidateSubs: Subscription;
  constructor(private adminOtherService: AdminOtherService) { }

  ngOnInit() {
    this.adminOtherService.getRegisteredCandidate();
    this.candidateSubs = this.adminOtherService.getCandidateUpdateListner().subscribe((candidate: any[]) => {
      this.candidates = candidate;
      console.log(this.candidates);
    });
  }
  ngOnDestroy() {
    this.candidateSubs.unsubscribe();
  }
  onPdf() {

  }
}
