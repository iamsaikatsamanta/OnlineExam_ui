import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private time = 10;
  constructor() { }
  getTime() {
    return this.time;
  }
}

