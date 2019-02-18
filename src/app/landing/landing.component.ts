import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  showButton = false;
  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.showButton = true;
    },5000)
  }
}
