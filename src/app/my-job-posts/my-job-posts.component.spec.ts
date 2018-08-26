import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJobPostsComponent } from './my-job-posts.component';

describe('MyJobPostsComponent', () => {
  let component: MyJobPostsComponent;
  let fixture: ComponentFixture<MyJobPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJobPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJobPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
