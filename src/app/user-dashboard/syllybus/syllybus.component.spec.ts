import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllybusComponent } from './syllybus.component';

describe('SyllybusComponent', () => {
  let component: SyllybusComponent;
  let fixture: ComponentFixture<SyllybusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyllybusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyllybusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
