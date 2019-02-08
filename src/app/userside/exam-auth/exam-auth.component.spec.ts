import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAuthComponent } from './exam-auth.component';

describe('ExamAuthComponent', () => {
  let component: ExamAuthComponent;
  let fixture: ComponentFixture<ExamAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
