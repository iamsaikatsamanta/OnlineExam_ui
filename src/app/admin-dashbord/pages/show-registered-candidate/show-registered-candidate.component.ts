import { Component, OnInit } from '@angular/core';
import {CandidateModel} from '../../../model/candidateModel';

const Data: CandidateModel[] = [
  {refId: 'AKCSIT01', name: 'Saikat', course: 'MCA', year: '3rd', email: 'Saikat@saikat.com', dob: '30/09/1995'},
  {refId: 'AKCSIT02', name: 'Dhal', course: 'BTECH', year: '3rd', email: 'dhal@dhal.com', dob: '20/05/1997'},
  {refId: 'AKCSIT03', name: 'Sourav', course: 'MTECH', year: '3rd', email: 'sourav@sourav.com', dob: '3/09/1995'},
  {refId: 'AKCSIT04', name: 'Dip', course: 'MCA', year: '3rd', email: 'dip@dip.com', dob: '31/01/1995'},
  {refId: 'AKCSIT05', name: 'Das', course: 'BTECH', year: '3rd', email: 'das@das.com', dob: '12/08/1995'},
  {refId: 'AKCSIT06', name: 'Kaka', course: 'MCA', year: '3rd', email: 'kaka@kaka.com', dob: '10/09/1996'}
  ];
@Component({
  selector: 'app-show-registered-candidate',
  templateUrl: './show-registered-candidate.component.html',
  styleUrls: ['./show-registered-candidate.component.css']
})
export class ShowRegisteredCandidateComponent implements OnInit {
  dataSource = Data;
  constructor() { }

  ngOnInit() {
  }

}
