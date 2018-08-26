import { Component, OnInit } from '@angular/core';
import { JobEthService } from '@app/services/job-eth.service';
import { IpfsService } from '@app/services/ipfs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sortTypes = [
    {
      key: 'latest',
      label: 'Latest'
    },
    {
      key: 'prizeAsc',
      label: 'Prize (ASC)'
    },
    {
      key: 'prizeDesc',
      label: 'Prixe (DESC)'
    },
    {
      key: 'typeAsc',
      label: 'Job Type (ASC)'
    },
    {
      key: 'typeDesc',
      label: 'Job Type (DESC)'
    }
  ];

  jobs = [];
  isLoading = false;

  constructor(
    private jobEth: JobEthService,
    private ipfs: IpfsService
  ) {
  }

  ngOnInit() {
    this.getJobs()
      .then(() => setTimeout(() => this.getJobs(), 5000));
  }

  getJobs() {
    this.isLoading = true;
    return this.jobEth.getJobs()
      .then(_jobs => this.jobs = _jobs)
      .then(() => this.isLoading = false);
  }
}
