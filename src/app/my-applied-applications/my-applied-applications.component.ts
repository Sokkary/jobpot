import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-applied-applications',
  templateUrl: './my-applied-applications.component.html',
  styleUrls: ['./my-applied-applications.component.scss']
})
export class MyAppliedApplicationsComponent implements OnInit {
  sortTypes = [
    {
      key: 'active',
      label: 'Active'
    },
    {
      key: 'countdown',
      label: 'Countdown'
    },
    {
      key: 'closed',
      label: 'Closed'
    },
    {
      key: 'withdrawn',
      label: 'Withdrawn'
    }
  ];

  apps = [];

  constructor() { }

  ngOnInit() {
  }

}
