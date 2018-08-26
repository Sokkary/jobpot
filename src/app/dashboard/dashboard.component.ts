import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tab = 'my-job-posts';

  constructor() { }

  ngOnInit() {
  }

  setActiveTab(view) {
    this.tab = view;
    return false;
  }

}
