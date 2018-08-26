import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppliedApplicationsComponent } from './my-applied-applications.component';

describe('MyAppliedApplicationsComponent', () => {
  let component: MyAppliedApplicationsComponent;
  let fixture: ComponentFixture<MyAppliedApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAppliedApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppliedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
