import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingQuestionComponent } from './coding-question.component';

describe('CodingQuestionComponent', () => {
  let component: CodingQuestionComponent;
  let fixture: ComponentFixture<CodingQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodingQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
