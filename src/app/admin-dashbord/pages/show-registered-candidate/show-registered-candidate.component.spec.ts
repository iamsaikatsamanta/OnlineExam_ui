import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRegisteredCandidateComponent } from './show-registered-candidate.component';

describe('ShowRegisteredCandidateComponent', () => {
  let component: ShowRegisteredCandidateComponent;
  let fixture: ComponentFixture<ShowRegisteredCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRegisteredCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRegisteredCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
