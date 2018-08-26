import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-applications-list',
  templateUrl: './job-applications-list.component.html',
  styleUrls: ['./job-applications-list.component.scss']
})
export class JobApplicationsListComponent implements OnInit {

  @Input() apps = [];

  constructor() { }

  ngOnInit() {
  }

}
