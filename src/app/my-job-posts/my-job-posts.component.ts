import { Component, OnInit } from '@angular/core';
import { JobEthService } from '@app/services/job-eth.service';

@Component({
  selector: 'app-my-job-posts',
  templateUrl: './my-job-posts.component.html',
  styleUrls: ['./my-job-posts.component.scss']
})
export class MyJobPostsComponent implements OnInit {
  sortTypes = [
    {
      key: 'active',
      label: 'Active'
    },
    {
      key: 'cancelled',
      label: 'Cancelled'
    },
    {
      key: 'completed',
      label: 'Completed'
    },
  ];

  isLoading = true;
  jobs = [];

  constructor(
    private jobEth: JobEthService
  ) { }

  ngOnInit() {
    this.jobEth.getMyJobs()
      .then(jobs => this.jobs = jobs)
      .then(() => this.isLoading = false);
  }

}
