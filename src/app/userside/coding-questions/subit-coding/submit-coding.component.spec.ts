import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubitCodingComponent } from './submit-coding.component';

describe('SubitCodingComponent', () => {
  let component: SubitCodingComponent;
  let fixture: ComponentFixture<SubitCodingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubitCodingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubitCodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
