import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputesListComponent } from './disputes-list.component';

describe('DisputesListComponent', () => {
  let component: DisputesListComponent;
  let fixture: ComponentFixture<DisputesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisputesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisputesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
