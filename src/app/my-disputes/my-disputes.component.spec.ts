import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDisputesComponent } from './my-disputes.component';

describe('MyDisputesComponent', () => {
  let component: MyDisputesComponent;
  let fixture: ComponentFixture<MyDisputesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDisputesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
