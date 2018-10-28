import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCodingQuestionComponent } from './review-coding-question.component';

describe('ReviewCodingQuestionComponent', () => {
  let component: ReviewCodingQuestionComponent;
  let fixture: ComponentFixture<ReviewCodingQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewCodingQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCodingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
