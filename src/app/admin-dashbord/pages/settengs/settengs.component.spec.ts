import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettengsComponent } from './settengs.component';

describe('SettengsComponent', () => {
  let component: SettengsComponent;
  let fixture: ComponentFixture<SettengsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettengsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettengsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
