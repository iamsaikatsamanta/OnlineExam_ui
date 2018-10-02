import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordHomeComponent } from './dashbord-home.component';

describe('DashbordHomeComponent', () => {
  let component: DashbordHomeComponent;
  let fixture: ComponentFixture<DashbordHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbordHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
