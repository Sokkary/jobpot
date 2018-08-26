import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-posts',
  templateUrl: './job-posts.component.html',
  styleUrls: ['./job-posts.component.scss']
})
export class JobPostsComponent implements OnInit {

  @Input() jobs = [];
  @Input() isLoading = false;

  constructor() { }

  ngOnInit() {
    this.jobs = this.jobs.map(job => {
      job.description = job.description.substring(0, 100) + '...';
      return job;
    });
  }

}
